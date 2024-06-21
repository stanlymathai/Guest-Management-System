<template>
  <div class="bg-secondary">
    <Loader v-if="loading" class="min-vh-100" />
    <div v-else class="fade_in">
      <VisitConfirmation
        :visit="visit"
        @deny="denyVisit"
        @confirm="confirmVisit"
        v-if="visitStatus == 'pending'"
        @image="selectedImage = $event"
      />
      <VisitConfirmed v-else-if="visitStatus == 'confirmed'" :visit="visit" />
      <VisitResponseStatus v-else :visitStatus="visitStatus" />
    </div>
  </div>
</template>
<script>
import VisitResponseStatus from "../../components/visit/VisitResponseStatus.vue";
import VisitConfirmation from "../../components/visit/VisitConfirmation.vue";
import VisitConfirmed from "../../components/visit/VisitConfirmed.vue";
import Loader from "../../components/layout/Loader";
import { HTTP } from "../../../config/axios.js";
import moment from "moment";

export default {
  created() {
    this.getVisit();
  },
  components: {
    VisitResponseStatus,
    VisitConfirmation,
    VisitConfirmed,
    Loader,
  },
  data() {
    return {
      visit: {
        token: this.$route.query.visit.trim(),
        physicalAddress: "",
        organization: "",
        visitorName: "",
        hostName: "",
        location: "",
        visitDate: "",
        time: {
          from: "",
          to: "",
        },
      },
      loading: true,
      visitStatus: "",
      selectedImage: null,
    };
  },
  methods: {
    getVisit() {
      HTTP.post("/api/visit/visit-by-token/", { token: this.visit.token }).then(
        (response) => {
          this.loading = false;
          let responseData = response.data;

          if (responseData.error)
            return swal("", responseData.error, "error").then(() =>
              window.close()
            );
          
          let slotEnd = new Date(responseData.scheduleTimeTo);
          slotEnd.setDate(slotEnd.getUTCDate());
          slotEnd.setHours(slotEnd.getUTCHours());
          slotEnd.setMinutes(slotEnd.getUTCMinutes());
          slotEnd.setSeconds(slotEnd.getUTCSeconds());
          if (slotEnd.getTime() < new Date().getTime())
            return (this.visitStatus = "visitExpired");

          this.visit.organization = responseData.hostOrganization;
          this.visit.physicalAddress = responseData.location.physicalAddress;

          this.visit.visitorName = `${responseData.firstName} ${responseData.lastName}`;
          this.visit.location = responseData.location.name;
          this.visit.hostName = responseData.hostName;
          let timeFormat = responseData.location.timeFormat;

          this.visit.time.from = moment(responseData.scheduleTimeFrom)
            .utc()
            .format(timeFormat == 24 ? "HH:mm" : "hh:mm a");
          this.visit.time.to = moment(responseData.scheduleTimeTo)
            .utc()
            .format(timeFormat == 24 ? "HH:mm" : "hh:mm a");

          this.visit.visitDate = moment(responseData.scheduleTimeFrom)
            .utc()
            .format(responseData.location.dateFormat);

          if (responseData.visitStatus == 0) {
            if (responseData.updatedBy) {
              this.visitStatus = "deniedByAdmin";
            } else this.visitStatus = "denied";
          } else if (responseData.visitStatus == 1) {
            this.visitStatus = "pending";
          } else if (responseData.visitStatus == 2) {
            this.visitStatus = "confirmed";
          } else if (responseData.visitStatus > 2) {
            this.visitStatus = "alreadyResponded";
          }
        }
      );
    },
    denyVisit() {
      swal("Are you sure you want to deny this visit?", {
        buttons: ["Cancel", "Deny"],
        dangerMode: true,
      }).then((isConfirm) => {
        if (isConfirm) {
          this.loading = true;
          HTTP.post("/api/visit/deny-visit/", { visit: this.visit.token }).then(
            (response) => {
              this.loading = false;
              if (response.data.id) this.visitStatus = "denied";
            }
          );
        }
      });
    },
    confirmVisit() {
      this.loading = true;
      HTTP.post("/api/visit/confirm-visit/", {
        visit: this.visit.token,
        ...(this.selectedImage && { visitorImage: this.selectedImage }),
      })
        .then((response) => {
          this.loading = false;
          if (response.data.id) this.visitStatus = "confirmed";
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
