<template>
  <div class="form_modal fade_in">
    <div class="modal-dialog modal-dialog-centered modal">
      <div class="modal-content">
        <div class="container">
          <div class="col-md-12 bg-white p-4">
            <div class="row dashboard-form">
              <div class="lead">
                <div class="primary-heading text-center lh-sm">
                  <h5 class="text-primary weight400 mb-0">
                    {{
                      showCheckIn
                        ? "Check-In Guest"
                        : `Pin Code Check${pinCodeChecking ? "ing ..." : " In"}`
                    }}
                  </h5>
                  <small class="fw-normal fs-6">
                    {{
                      showCheckIn
                        ? "Please Select an Option"
                        : pinCodeChecking
                        ? ""
                        : "Please ask Guest to provide pin code from their invitation email"
                    }}
                  </small>
                </div>
                <button
                  type="button"
                  class="btn-close btn-sm modal-close-btn"
                  @click="$store.dispatch('pinCodeCheckCancel')"
                />
              </div>
              <div class="container mb-4 mt-2">
                <div class="row gy-3" v-if="showCheckIn">
                  <div class="col-sm">
                    <div class="card rounded shadow">
                      <a
                        class="card btn btn-primary bg-gradient is-tile"
                        role="button"
                        @click="
                          () => {
                            $store
                              .dispatch('pinCodeCheckCancel')
                              .then(() =>
                                $store.dispatch('handleVisitFormAdd')
                              );
                          }
                        "
                      >
                        <h1 class="lead">
                          Register
                          <br />
                          New
                          <br />
                          Guest
                        </h1>
                      </a>
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="card rounded shadow">
                      <a
                        class="card btn btn-primary bg-gradient is-tile"
                        type="button"
                        @click="showCheckIn = false"
                      >
                        <h1 class="lead">
                          Use
                          <br />
                          Pin
                          <br />
                          Code
                        </h1>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="form-row" v-else>
                  <div
                    v-if="pinCodeChecking"
                    class="d-flex justify-content-center align-items-center"
                  >
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <form v-else @submit.prevent="getVisitByRegistrationCode">
                    <div class="form-group col-md-6 mx-auto">
                      <div class="input-group row">
                        <input
                          required
                          minlength="5"
                          pattern="[0-9]+"
                          autocomplete="off"
                          placeholder="Enter here"
                          v-model="registrationCode"
                          style="text-align: center"
                          class="form-control fw-bolder"
                          title="Format: Numeric values only"
                          oninput="this.setCustomValidity('')"
                          @change="invalidRegistrationCode = false"
                          :class="{ 'is-invalid': invalidRegistrationCode }"
                          oninvalid="this.setCustomValidity('Invalid PIN Code')"
                        />
                        <small
                          v-show="invalidRegistrationCode"
                          class="invalid-feedback text-center"
                        >
                          {{ invalidRegistrationCode }}
                        </small>
                        <div class="text-center mt-3">
                          <button class="btn btn-primary btn-sm">
                            Check-in Guest
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../../../config/axios.js";
import moment from "moment";

export default {
  data() {
    return {
      registrationCode: "",
      invalidRegistrationCode: false,
      loading: true,
      pinCodeChecking: false,
      showCheckIn: true,
    };
  },
  methods: {
    getVisitByRegistrationCode() {
      this.pinCodeChecking = true;
      HTTP.get(
        `/api/visit/visit-by-registration-code/?code=${this.registrationCode}`,
        {
          headers: this.$store.getters.headers,
        }
      )
        .then((response) => {
          let responseData = response.data;
          this.pinCodeChecking = false;

          if (!Object.keys(responseData).length || responseData.message)
            return (this.invalidRegistrationCode = responseData.message);

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
                responseData.locationName
              } at ${moment(responseData.scheduleTimeFrom)
                .utc()
                .format("h:mm a")}`,
              ...(responseData.image && { icon: `${responseData.image}` }),
              buttons: ["Cancel", "Confirm"],
            }).then((isConfirm) => {
              if (isConfirm) {
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
                this.$store.dispatch("pinCodeCheckCancel");
              } else this.pinCodeChecking = false;
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
