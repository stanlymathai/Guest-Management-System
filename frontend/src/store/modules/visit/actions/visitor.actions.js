import * as visitorTypes from "../mutationTypes/visitor.mutationTypes";
import { HTTP } from "../../../../../config/axios";
import moment from "moment";

export default {
  handleCheckIn: (context, payload) =>
    HTTP.post(
      "/api/visit/check-in-visitor/",
      {
        visitId: payload.id,
        notifyHost: payload.notifyHost,
        checkInDateTime: moment().format("YYYY-MM-DD HH:mm:00"),
      },
      {
        headers: context.getters.headers,
      }
    ).then((res) => {
      if (res.data.error || res.data.id != payload.id)
        return context.dispatch("handleError", res.data.error);

      swal(
        `${payload.visitorName} checked-in ${
          payload.notifyHost ? `and notified ${payload.hostName}` : ""
        }`
      );
      context.commit(visitorTypes.CHECK_IN_VISIT, payload.id);
      if (payload.notifyHost)
        context.commit(visitorTypes.NOTIFIED_HOST, payload.id);
    }),

  selfRegister: (context, payload) =>
    HTTP.post("/api/visit/self-register", payload, {
      headers: context.getters.headers,
    })
      .then((response) => {
        if (response.data.errors || response.data.error || !response.data.id) {
          context.dispatch(
            "handleError",
            response.data.error
              ? response.data.error
              : response.data.errors[0].message
          );
        }
        swal(
          `Notified ${payload.host_name}, they will be with you shortly.
              \nFor assistance, please speak to the receptionist.`
        );
        let visitData = (({
          check_in_date_time,
          schedule_time_from,
          schedule_time_to,
          organization,
          first_name,
          last_name,
          host_name,
          host_id,
          email,
        }) => ({
          scheduleTimeFrom: moment(schedule_time_from).format(),
          scheduleTimeTo: moment(schedule_time_to).format(),
          checkInDateTime: check_in_date_time,
          firstName: first_name,
          lastName: last_name,
          locationId: location,
          hostCollectedAt: null,
          hostName: host_name,
          hostId: host_id,
          notifyHost: null,
          boloStatus: null,
          visitStatus: 3,
          image: null,
          organization,
          email,
          id: response.data.id,
        }))(payload);

        context.commit(visitorTypes.ADD_TO_VISITS, visitData);
      })
      .catch((err) => console.log("selfRegister", err)),

  submitVisitAction: (context, payload) =>
    HTTP.post(
      `/api/visit/${payload.endPoint}`,
      {
        visitId: payload.visitId,
        timeStamp: moment().format("YYYY-MM-DD HH:mm:00"),
      },
      {
        headers: context.getters.headers,
      }
    )
      .then((response) => {
        if (response.data.error || response.data.id != payload.visitId) {
          context.dispatch("handleError", response.data.error);
        } else context.commit(payload.type, payload.visitId);
      })
      .catch((err) => console.log(err, "submitVisitAction")),

  handleCollect: (context, visitId) =>
    context.dispatch("submitVisitAction", {
      type: visitorTypes.MARK_COLLECTED,
      endPoint: "collect-visitor",
      visitId,
    }),

  notifyHost: (context, visitId) =>
    context.dispatch("submitVisitAction", {
      type: visitorTypes.NOTIFIED_HOST,
      endPoint: "notify-host",
      visitId,
    }),

  boloPass: (context, visitId) =>
    context.dispatch("submitVisitAction", {
      type: visitorTypes.BOLO_STATUS_PASSED,
      endPoint: "bolo-passed",
      visitId,
    }),

  boloFail: (context, visitId) =>
    context.dispatch("submitVisitAction", {
      type: visitorTypes.BOLO_STATUS_FAILED,
      endPoint: "bolo-failed",
      visitId,
    }),

  checkOut: (context, visitId) =>
    context.dispatch("submitVisitAction", {
      type: visitorTypes.MARK_AS_LEFT,
      endPoint: "check-out-visitor",
      visitId,
    }),

  removeVisit: (context, visitId) =>
    context.dispatch("submitVisitAction", {
      type: visitorTypes.REMOVE_VISIT,
      endPoint: "remove-visit",
      visitId,
    }),
};
