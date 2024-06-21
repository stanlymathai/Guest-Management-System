<template>
  <div class="container-fluid">
    <div class="row fade_in bg-secondary bg-gradient">
      <section class="h-vh-20"></section>
      <div class="h-vh-60 bg-gradient">
        <div class="position-relative top-50n">
          <div class="row justify-content-center">
            <div
              class="row justify-content-center bg-white rounded-20 has-db-shadow col-md-5 p-5"
              :class="{ 'col-md-6 ': !scanning }"
            >
              <h2 class="text-primary fw-normal text-wrap mb-0">
                Welcome to {{ $store.getters.User.organization }}!
              </h2>

              <div v-if="qrChecking" class="d-flex justify-content-center p-5">
                <div class="spinner-border text-success p-3" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div v-show="!qrChecking" class="row">
                <div v-show="scanning" class="row fade_in">
                  <h2 class="fs-6 text-primary mb-2">QR Code Scanner</h2>
                  <div class="anim_box mb-2">
                    <div id="scanner" class="scanner"></div>
                    <canvas id="qr-canvas" class="canvas_qr" />
                  </div>
                  <button
                    class="btn btn-outline-primary btn-lg lh-sm row"
                    @click="cancelScan"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
                <Form
                  v-show="!scanning"
                  id="register-form"
                  v-slot="{ errors }"
                  @submit="registerVisit"
                >
                  <h2 class="fs-6 text-primary mb-2">Please Sign in.</h2>

                  <div class="row mb-2">
                    <SelectField
                      class="col-md-6"
                      name="selectedLocation"
                      :model="visit.location"
                      holderName="Visit Location"
                      :error="errors.selectedLocation"
                      @event="visit.location = $event"
                      :options="$store.getters.visitLocations"
                    />
                    <SelectField
                      class="col-md-6"
                      name="selectedHost"
                      :model="visit.host"
                      :disabled="!visit.location.id"
                      holderName="Host Name"
                      :error="errors.selectedHost"
                      @event="visit.host = $event"
                      :options="$store.getters.hostDropdown(visit.location.id)"
                    />
                  </div>

                  <div class="row mb-1">
                    <div class="col-md-6 mb-2">
                      <InputField
                        name="firstName"
                        label="First Name"
                        :error="errors.firstName"
                        :model="visit.visitor.firstName"
                        @event="visit.visitor.firstName = $event"
                      />
                    </div>
                    <div class="col-md-6 mb-2">
                      <InputField
                        name="lastName"
                        label="Last Name"
                        :error="errors.lastName"
                        :model="visit.visitor.lastName"
                        @event="visit.visitor.lastName = $event"
                      />
                    </div>
                  </div>

                  <div class="row mb-1">
                    <div class="col-md-6 mb-2">
                      <InputField
                        name="email"
                        rules="email"
                        label="Email Address"
                        :error="errors.email"
                        :model="visit.visitor.email"
                        @event="visit.visitor.email = $event"
                      />
                    </div>

                    <div class="col-md-6 mb-2">
                      <InputField
                        name="phone"
                        rules="phone"
                        label="Phone Number"
                        :error="errors.phone"
                        :model="visit.visitor.phone"
                        @event="visit.visitor.phone = $event"
                      />
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-5">
                      <InputField
                        name="company"
                        label="Company"
                        :error="errors.company"
                        :model="visit.visitor.company"
                        @event="visit.visitor.company = $event"
                      />
                    </div>

                    <div class="col-md-2 text-end small lh-1 mt-2">
                      <label class="text-dark ms-2"> Visit up to </label>
                    </div>
                    <DateTimePicker
                      mode="Time"
                      class="col-md-5"
                      :model="visit.dateTo"
                      placeholder="Visit up to"
                      v-bind:minuteIncrement="1"
                      :isDateInvalid="!isValidTime()"
                      @event="visit.dateTo = $event"
                      :is24hr="visit.location.timeFormat == 24"
                    />
                  </div>

                  <p class="fs-6 text-primary">-OR-</p>

                  <div class="d-md-flex justify-content-between">
                    <a
                      type="button"
                      @click="startScanner"
                      class="text-decoration-none fw-normal lead"
                    >
                      Scan QR code in email invitation
                    </a>
                    <p
                      v-if="!isValidTime()"
                      class="text-danger border border-danger small p-2"
                    >
                      Invalid visit time
                    </p>
                    <button v-else type="submit" class="btn btn-primary">
                      Check In
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-vh-20 d-flex flex-row-reverse">
        <div class="col-md-3 me-3">
          <img
            src="../../assets/images/my_tag-logo.png"
            class="navbar-brand w-100"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DateTimePicker from "../../../src/components/common/DateTimePicker";
import SelectField from "../../components/common/SelectField.vue";
import InputField from "../../components/common/InputField.vue";

import { qrcode } from "../../assets/libraries/qrcode.js";
import { HTTP } from "../../../config/axios.js";
import { Form } from "vee-validate";
import moment from "moment";

export default {
  components: { DateTimePicker, SelectField, InputField, Form },
  data() {
    return {
      visit: {
        host: "",
        location: "",
        visitor: {
          company: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
        dateTo: new Date(new Date().getTime() + 1800000), // + 30 mins
      },
      qrChecking: false,
      scanning: false,
      canvasElement: "",
      canvas: "",
      video: "",
    };
  },
  mounted() {
    this.canvasElement = document.getElementById("qr-canvas");
    this.canvas = this.canvasElement.getContext("2d");
    this.video = document.createElement("video");
  },
  methods: {
    startScanner() {
      this.scanning = true;
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "user" } }) // to open front-camera
        .then((stream) => {
          this.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
          this.video.srcObject = stream;
          this.video.play();
          this.startTicking();
          this.initiateScan();
        });
    },
    startTicking() {
      this.canvasElement.height = this.video.videoHeight;
      this.canvasElement.width = this.video.videoWidth;
      this.canvas.drawImage(
        this.video,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      requestAnimationFrame(this.startTicking); // requestAnimationFrame() is 1 shot
    },
    initiateScan() {
      qrcode.callback = (res) => {
        if (res) {
          this.getVisitByQR(res);
          this.scanning = false;
          this.video.srcObject.getTracks().forEach((track) => track.stop());
        }
      };
      try {
        qrcode.decode();
      } catch (e) {
        setTimeout(this.initiateScan, 300);
      }
    },

    getVisitByQR(token) {
      this.qrChecking = true;
      HTTP.post("/api/visit/visit-by-token/", { token })
        .then((response) => {
          this.qrChecking = false;
          let responseData = response.data;
          if (responseData.error) return swal("", responseData.error, "error");
          if (!responseData || !Object.keys(responseData).length) {
            return swal("", "No visit information found", "error");
          } else if (responseData.visitStatus > 2) {
            return swal("", "This code is already used", "error");
          } else if (responseData.visitStatus == 0) {
            return swal("", "Visit has been denied", "error");
          }

          let visitSlotEnd = moment(responseData.scheduleTimeTo);
          let visitorName =
            `${responseData.firstName} ${responseData.lastName}`.trim();

          if (visitSlotEnd.isBefore()) {
            swal("", "This visit has expired", "error");
          } else if (
            new Date().getDate() !=
            new Date(responseData.scheduleTimeTo).getUTCDate()
          ) {
            swal("", "This visit is not for today", "error");
          } else {
            swal({
              text: `${visitorName} to meet ${responseData.hostName} \nin ${
                responseData.location.name
              } at ${moment(responseData.scheduleTimeFrom)
                .utc()
                .format("h:mm a")}`,
              ...(responseData.image && { icon: `${responseData.image}` }),
              buttons: ["Cancel", "Confirm"],
            }).then((isConfirm) => {
              if (isConfirm) {
                responseData.visitStatus = 3;
                this.$store.dispatch("handleCheckIn", {
                  checkInDateTime: moment(new Date()).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                  checkOutDateTime: null,
                  hostCollectedAt: null,
                  boloStatus: null,
                  notifyHost: 1,
                  visitorName,
                  ...responseData,
                });
              }
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    registerVisit() {
      let toTittleCase = (name) =>
        name.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

      let formData = (({ host, visitor, location, dateTo }) => ({
        check_in_date_time: moment().format("YYYY-MM-DD HH:mm:00"),
        schedule_time_from: moment().format("YYYY-MM-DD HH:mm:00"),
        schedule_time_to: moment(dateTo).format("YYYY-MM-DD HH:mm:00"),
        organization: toTittleCase(visitor.company),
        first_name: toTittleCase(visitor.firstName),
        last_name: toTittleCase(visitor.lastName),
        email: `${visitor.email}`.toLowerCase(),
        host_name: toTittleCase(host.name),
        location: location.id,
        host_id: host.id,
        reason: "",
      }))(this.visit);

      this.$store.dispatch("selfRegister", formData);
      this.resetPage();
    },

    cancelScan() {
      this.scanning = false;
      this.video.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    },

    isValidTime() {
      let sheduledFrom = new Date().getTime();
      let sheduledTo = new Date(this.visit.dateTo).getTime();

      return sheduledFrom <= sheduledTo;
    },

    resetPage() {
      this.qrChecking = false;
      this.visit = {
        host: "",
        location: "",
        visitor: {
          company: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
        dateTo: new Date(new Date().getTime() + 1800000),
      };
      document.getElementById("register-form").reset();
    },
  },
};
</script>
