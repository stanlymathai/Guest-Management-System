<template>
  <section class="pt-80">
    <div class="container-fluid">
      <div class="col-md-12 bg-white rounded-20 has-db-shadow p-4 mb-4">
        <loader v-if="loading" />

        <div v-else class="row fade_in">
          <div class="col-md-12">
            <figure>
              <blockquote class="blockquote">
                <h2 class="fs-2 text-primary">Evacuation</h2>
              </blockquote>
              <p class="text-dark">
                By beginning evacuation you will be able to download a PDF roll
                call list of all people currently on your premises. This will
                also notify all the hosts and guests of the evacuation taking
                place and ask them to leave the premises immediately. All
                upcoming guests for the next hour will be notified of the
                evacuation.
              </p>
            </figure>
          </div>
          <div class="row">
            <div class="col-md-5">
              <button
                class="btn col-md-12 btn-primary rounded-20 mb-2 btn-lg"
                @click="showEvacConfirm = true"
              >
                SEND EVAC NOTIFICATION
              </button>
            </div>
            <div class="col-md-5">
              <button
                class="btn col-12 btn-outline-dark rounded-20 mb-2 btn-lg"
                @click="downloadRollCallList"
              >
                DOWNLOAD ROLL CALL LIST
              </button>
            </div>
          </div>
          <div class="col-md-10 mt-3">
            <label class="text-dark fs-6 mb-1"
              >Custom evacuation notification:</label
            >
            <textarea
              rows="5"
              type="text"
              v-model="evacMessage"
              style="resize: none"
              placeholder="Please type here."
              class="form-control rounded-20"
            />
            <ul class="list-unstyled mt-2 text-dark">
              <li class="text-dark fw-light fs-6">
                If left blank evacuation notice will read:
                <ul>
                  <li>
                    <strong>ALERT! </strong>[YOUR BUILDING NAME] IS IN
                    EVACUATION.
                  </li>
                  <li>
                    <strong>PLEASE LEAVE THE PREMISES IMMEDIATELY </strong>VIA
                    YOUR NEAREST EXIT DO NOT USE A LIFT.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-show="showEvacConfirm" class="form_modal fade_in">
        <div class="modal-dialog modal-dialog-centered modal">
          <div class="modal-content p-4">
            <div class="container">
              <button
                type="button"
                class="btn-close modal-close-btn"
                @click="resetNotificationHandlers"
              />
              <div
                v-if="evacConfirm == 'YES' && allLocations"
                class="text-center"
              >
                <button @click="sendEvacMessage" class="btn btn-danger">
                  Send Evacuation
                </button>
                <div class="mt-3 me-2">
                  <input
                    type="checkbox"
                    v-model="allLocations"
                    class="form-check-input"
                  />
                  <small class="text-dark ms-1"
                    >All locations, uncheck to select locations</small
                  >
                </div>
              </div>
              <div :style="evacConfirm == 'YES' ? { display: 'none' } : ''">
                <p class="fw-bold">ALERT, Please read carefully:</p>
                <p>
                  By typing <em class="me-1">"YES"</em> I understand that
                  <u>
                    all hosts and guests onsite will receive a notification to
                    evacuate the building immediately,</u
                  >
                  this action cannot be undone.
                </p>
                <form
                  id="evac-confirm"
                  class="mx-auto col-6 mb-3"
                  @submit.prevent="handleEvac"
                >
                  <input
                    required
                    pattern="/YES/"
                    v-model="evacConfirm"
                    placeholder="Type here"
                    style="text-align: center"
                    class="form-control fw-bolder"
                    oninput="this.setCustomValidity('')"
                    onkeydown="return /[a-z]/i.test(event.key)"
                    oninvalid="this.setCustomValidity(`Type 'YES' to continue`)"
                  />
                </form>
              </div>
              <div v-if="!allLocations" class="row text-center fade_in">
                <h2 class="fs-2 text-primary weight400">Locations</h2>

                <grid-field
                  height="40vh"
                  :columnDefs="columnDefs"
                  :rowData="$store.getters.locations"
                  @select="(e) => (selectedLocations = e.map(({ id }) => id))"
                />
                <button class="btn btn-danger" @click="sendEvacMessage">
                  Send Evacuation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import SelectField from "../../components/common/SelectField.vue";
import Loader from "../../components/layout/Loader";
import { HTTP } from "../../../config/axios";

export default {
  components: { SelectField, Loader },
  data() {
    return {
      columnDefs: [
        {
          headerName: "Location Name",
          field: "name",

          filter: "agTextColumnFilter",
          cellClass: "text-capitalize",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: true,
        },
        {
          headerName: "Current No. Visitors",
          field: "visitCount",
          sortable: true,
          unSortIcon: true,
        },
        {
          headerName: "Location Manager",
          field: "primaryFunction",
          filter: "agTextColumnFilter",
          resizable: true,
        },
      ],
      loading: false,
      evacConfirm: "",
      evacMessage: "",
      allLocations: true,
      showEvacConfirm: false,
      selectedLocations: null,
    };
  },
  methods: {
    sendEvacMessage() {
      if (!this.allLocations && !this.selectedLocations)
        return swal("", "Select at least one location to continue.", "error");
      this.loading = true;
      this.showEvacConfirm = false;

      HTTP.post(
        `/api/user/send-evac-notice?date=${new Date()}`,
        {
          locations: this.selectedLocations,
          message: this.evacMessage,
        },
        { headers: this.$store.getters.headers }
      )

        .then((res) => {
          this.evacMessage = "";
          this.resetNotificationHandlers();
          if (!res.data.message || res.data.error)
            return this.$store.dispatch("handleError", res.data.error);

          swal("", `${res.data.message}`, "info");
        })
        .catch((e) => this.$store.dispatch("handleError", e));
    },

    downloadRollCallList() {
      this.loading = true;
      HTTP.get(`/api/visit/roll-call-list/?date=${new Date()}`, {
        headers: this.$store.getters.headers,
      })
        .then((res) => {
          this.loading = false;
          let anchorElement = document.createElement("a");
          document.body.appendChild(anchorElement);
          anchorElement.href =
            "data:text/csv;charset=utf-8," + encodeURIComponent(res.data);
          anchorElement.download = "roll_call_list.csv";
          anchorElement.target = "_blank";
          anchorElement.click();
        })
        .catch((err) => this.$store.dispatch("handleError", err));
    },

    resetNotificationHandlers() {
      this.evacConfirm = "";
      this.loading = false;
      this.allLocations = true;
      this.showEvacConfirm = false;
      this.selectedLocations = null;
      document.getElementById("evac-confirm").reset();
    },
  },
};
</script>
