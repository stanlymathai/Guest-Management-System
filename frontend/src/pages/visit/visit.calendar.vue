<template>
  <section class="pt-80">
    <div class="container-fluid">
      <div class="col-md-12 bg-white rounded-20 has-db-shadow p-4 mb-4">
        <div class="row fade_in">
          <SelectField
            label="title"
            v-bind:multi="true"
            :optionsMaxLimit="6"
            class="col-7 mx-auto"
            name="selectedResources"
            v-bind:allowEmpty="false"
            v-bind:closeOnSelect="true"
            v-bind:preserveSearch="true"
            :options="calendarLocations"
            :model="calendarObjects.resources"
            @event="selectedResources = $event"
          />
          <FullCalendar :options="calendarOptions" />
          <VisitForm v-if="showVisitForm" />
        </div>
        <div class="d-flex justify-content-start lh-1 mt-2 gap-1 small">
          <i class="bx bx-square-rounded text-success bg-success" />
          <small class="text-dark">SLOT CONFIRMED</small>
          <i class="bx bx-square-rounded text-primary bg-primary" />
          <small class="text-dark">SLOT YET TO BE CONFIRMED</small>
          <i class="bx bx-square-rounded text-danger bg-danger" />
          <small class="text-dark">SLOT DENIED / DELETED</small>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

import SelectField from "../../components/common/SelectField.vue";
import VisitForm from "../../forms/VisitForm.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    FullCalendar,
    SelectField,
    VisitForm,
  },

  computed: {
    calendarOptions() {
      return {
        ...this.handlers,
        ...this.preferences,
        ...this.calendarObjects,
      };
    },
    ...mapGetters([
      "headers",
      "showVisitForm",
      "calendarEvents",
      "calendarLocations",
      "initialCalendarLocations",
    ]),

    preferences() {
      return {
        headerToolbar: {
          left: "title",
          right: "today prev,next",
        },
        buttonText: {
          today: "Today",
          prev: "<<",
          next: ">>",
        },
        timeZone: "UTC",
        editable: false,
        selectable: true,
        allDaySlot: false,
        buttonIcons: false,
        selectMirror: true,
        stickyFooterScrollbar: true,
        scrollTime: new Date().getTime(),
        initialView: "resourceTimeGridDay",
      };
    },

    calendarObjects() {
      return {
        events: this.calendarEvents,
        schedulerLicenseKey: "0490419671-fcs-1654165679",
        plugins: [resourceTimeGridPlugin, interactionPlugin],
        resources: this.selectedResources ?? this.initialCalendarLocations,
      };
    },
    handlers() {
      return {
        datesSet: this.handleDateSet,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
      };
    },
  },

  data() {
    return {
      lastFetched: "",
      selectedResources: null,
    };
  },
  methods: {
    handleDateSet: function (payload) {
      let lastFetched = new Date(this.lastFetched).toDateString();
      let payloadStart = new Date(payload.startStr).toDateString();

      if (lastFetched != payloadStart) {
        this.lastFetched = payload.startStr;
        this.$store.dispatch("fetchCalendarEvents", {
          from: payload.startStr,
          to: payload.endStr,
        });
      }
    },

    handleEventClick(e) {
      let content = document.createElement("div");
      content.innerHTML = this.eventContent(e).html;
      let className = this.eventContent(e).eventClass;
      let visitStatus = e.event._def.extendedProps.visitStatus;
      let isPastTime = this.isTimePassed(e.event._instance.range.end);
      swal({
        content,
        className,
        buttons: {
          cancel: "Close",
          ...(!isPastTime &&
            visitStatus <= 3 && {
              catch: {
                text: "Delete",
                value: "catch",
              },
              defeat: "Edit",
            }),
        },
      }).then((value) => {
        let visitId = Number(e.event._def.publicId);
        switch (value) {
          case "defeat":
            this.$store.dispatch("handleEditVisit", visitId);
            break;
          case "catch":
            swal("Are you sure you want to delete this visit?", {
              buttons: ["Cancel", "Delete"],
              dangerMode: true,
            }).then((isConfirm) => {
              if (isConfirm) {
                e.event.remove();
                this.$store.dispatch("removeVisit", visitId);
              }
            });
            break;
          default:
            return;
        }
      });
    },
    handleDateSelect(e) {
      if (this.isTimePassed(e.end))
        return swal("Date or time should not be in past");

      swal(
        `Create a visit in ${e.resource._resource.title} from ${this.timeIn12Hr(
          e.start
        )} to ${this.timeIn12Hr(e.end)}?`,
        {
          buttons: true,
        }
      ).then((isConfirm) => {
        if (isConfirm) {
          let formData = {
            date: {
              from: e.startStr.slice(0, 16),
              to: e.endStr.slice(0, 16),
            },
            location: {
              id: e.resource._resource.id,
              name: e.resource._resource.title,
              timeFormat: e.resource._resource.extendedProps.timeFormat,
              dateFormat: e.resource._resource.extendedProps.dateFormat,
            },
          };
          this.$store.dispatch("handleAddEvent", formData);
        }
      });
    },

    eventContent(e) {
      let props = e.event._def.extendedProps;
      let visitStatus = props.visitStatus;
      let eventClass = "bg-primary";
      if (visitStatus == 0) {
        eventClass = "bg-danger";
      } else if (visitStatus >= 2) eventClass = "bg-success";

      let timeSlot =
        this.timeIn12Hr(e.event.start) + " ⇔ " + this.timeIn12Hr(e.event.end);
      return {
        html: `
        <div class="text-break ${eventClass} bg-gradient lh-base">
          <p class="fw-bolder text-light mt-2">${timeSlot}</p>

            <b class="text-light">${props.visitorName ?? ""}</b>
            <span class="text-body">
              ${props.companyName ? " (" + props.companyName + ") " : ""}
            </span><br/>

          <span class="text-black fw-bold">${props.hostName ?? ""}</span></br/>
          <span class="text-white-50">${props.reason ?? ""}</span>
        </div>`,
        eventClass,
      };
    },
    timeIn12Hr(value) {
      let time = new Date(value).toISOString().slice(11, 16);
      let hour = Number(time.slice(0, 2));
      if (hour > 12) hour -= 12;

      return Number(time.slice(0, 2)) > 11
        ? hour + time.slice(2, 5) + " pm"
        : time + " am";
    },
    isTimePassed(value) {
      let dateValue = new Date(value);
      dateValue.setDate(dateValue.getUTCDate());
      dateValue.setHours(dateValue.getUTCHours());
      dateValue.setMinutes(dateValue.getUTCMinutes());
      dateValue.setSeconds(dateValue.getUTCSeconds());
      return this.preferences.scrollTime > dateValue.getTime();
    },
  },
};
</script>
