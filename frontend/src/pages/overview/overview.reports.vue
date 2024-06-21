<template>
  <section class="pt-80">
    <div class="container-fluid">
      <div class="col-md-12 bg-white rounded-20 has-db-shadow p-4 mb-4">
        <Loader v-if="loading" />
        <div v-else class="row dashboard-form fade_in">
          <div class="row">
            <div class="col-md-2">
              <blockquote class="blockquote">
                <h2 class="fs-2 text-primary">Reports</h2>
              </blockquote>
            </div>
            <div class="col-md-10">
              <div class="d-flex justify-content-end gap-2">
                <p v-if="invalidRange" class="text-danger small p-2">
                  {{ invalidRange }}
                </p>
                <DatePicker
                  class="col-md-3"
                  v-model="dateFrom"
                  :max-date="new Date()"
                  :model-config="{
                    type: 'string',
                    mask: 'YYYY/MM/DD',
                  }"
                  :masks="{ L: 'DD/MM/YYYY' }"
                >
                  <template v-slot="{ inputValue, togglePopover }">
                    <div
                      @click="togglePopover()"
                      class="d-flex flex-row form-floating small"
                    >
                      <input
                        id="date-from"
                        :value="inputValue"
                        class="form-control"
                        placeholder="From Date"
                        style="padding-left: 25px"
                        :class="{ 'border-danger text-danger': invalidRange }"
                      />
                      <label
                        for="date-from"
                        style="
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        "
                        :class="{ 'text-danger small': invalidRange }"
                        ><p><i class="bx lead bx-calendar" />Date From</p>
                      </label>
                    </div>
                  </template>
                </DatePicker>
                <span class="lead" :class="{ 'text-danger': invalidRange }"
                  >⇔</span
                >
                <DatePicker
                  class="col-md-3"
                  v-model="dateTo"
                  :max-date="new Date()"
                  :model-config="{
                    type: 'string',
                    mask: 'YYYY/MM/DD',
                  }"
                  :masks="{ L: 'DD/MM/YYYY' }"
                >
                  <template v-slot="{ inputValue, togglePopover }">
                    <div
                      @click="togglePopover()"
                      class="d-flex flex-row form-floating small"
                    >
                      <input
                        id="date-to"
                        :value="inputValue"
                        class="form-control"
                        placeholder="To Date"
                        style="padding-left: 25px"
                        :class="{ 'border-danger text-danger': invalidRange }"
                      />
                      <label
                        for="date-to"
                        style="
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        "
                        :class="{ 'text-danger small': invalidRange }"
                        ><p><i class="bx lead bx-calendar" />Date To</p>
                      </label>
                    </div>
                  </template>
                </DatePicker>

                <button
                  class="btn btn-primary col-md-2"
                  v-if="!invalidRange"
                  @click="getReport"
                >
                  Set date
                </button>
              </div>
            </div>
          </div>
          <grid-field
            height="62.93vh"
            :rowData="visits"
            :columnDefs="columnDefs"
          />

          <button
            title="Download Report"
            @click="generateCSVReport"
            v-show="Object.keys(visits).length"
            class="btn btn-outline-primary col-md-1"
          >
            <i class="lead bx bx-download" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Loader from "../../components/layout/Loader";
import { HTTP } from "../../../config/axios.js";
import { DatePicker } from "v-calendar";

import moment from "moment";
let timeInUTC = (value) => {
  return value
    ? moment(value).utc().format("h:mm a")
    : moment().format("h:mm a");
};

export default {
  components: { Loader, DatePicker },
  computed: {
    invalidRange() {
      let sheduledFrom = new Date(this.dateFrom).getTime();
      let sheduledTo = new Date(this.dateTo).getTime();

      if (sheduledFrom > sheduledTo) {
        return "Please enter a 'To date' that is equal to or later than 'From date'.";
      }
    },
  },
  created() {
    this.getReport();
  },
  data() {
    return {
      loading: false,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      dateFrom: new Date(),
      dateTo: new Date(),
      defaultColDef: {},
      columnDefs: [
        {
          headerName: "Visitor Name",
          field: "visitorName",
          filter: "agTextColumnFilter",
          filterParams: {
            debounceMs: 200,
            filterOptions: ["contains"],
            suppressAndOrCondition: true,
          },
          minWidth: 130,
          resizable: true,
        },
        {
          headerName: "Email",
          field: "email",
          filter: "agTextColumnFilter",
          filterParams: {
            debounceMs: 200,
            filterOptions: ["contains"],
            suppressAndOrCondition: true,
          },
          minWidth: 120,
          resizable: true,
        },
        {
          headerName: "Company",
          field: "organization",
          filter: "agTextColumnFilter",
          filterParams: {
            debounceMs: 200,
            filterOptions: ["contains"],
            suppressAndOrCondition: true,
          },
          minWidth: 120,
          resizable: true,
        },
        {
          headerName: "Appointment Time",
          field: "arrivalSlot",
          minWidth: 190,
          resizable: true,
        },
        {
          headerName: "Checked In",
          field: "checkedInSlot",
          minWidth: 120,
          resizable: true,
        },
        {
          headerName: "Collected At",
          field: "collectedAtSlot",
          minWidth: 120,
          resizable: true,
        },
        {
          headerName: "Checked Out",
          field: "checkedOutSlot",
          minWidth: 120,
          resizable: true,
        },
        {
          headerName: "Host Name",
          field: "hostName",
          filter: "agTextColumnFilter",
          filterParams: {
            debounceMs: 200,
            filterOptions: ["contains"],
            suppressAndOrCondition: true,
          },
          minWidth: 126,
          resizable: true,
        },
        {
          headerName: "Security Status",
          field: "boloStatus",
          minWidth: 86,
          resizable: true,
        },
      ],
      visits: [],
    };
  },
  methods: {
    getReport() {
      this.loading = true;
      HTTP.get(
        `/api/visit/visit-report/?from=${this.dateFrom}&to=${this.dateTo}`,
        { headers: this.$store.getters.headers }
      )
        .then((response) => {
          this.loading = false;

          if (!Object.keys(response).length) return swal("no data found");

          this.visits = response.data.map((v) => {
            return {
              visitorName: `${v.firstName} ${v.lastName}`,
              email: v.email,
              hostName: v.hostName,
              organization: v.organization,
              boloStatus:
                v.boloStatus == 1
                  ? "Passed"
                  : v.boloStatus == 0
                  ? "Failed"
                  : "unavailable",
              arrivalSlot:
                timeInUTC(v.scheduleTimeFrom) +
                " ⇔ " +
                timeInUTC(v.scheduleTimeTo) +
                " / " +
                moment(v.scheduleTimeFrom).utc().format("MMM D"),

              checkedInSlot: timeInUTC(v.checkInDateTime),

              collectedAtSlot: v.hostCollectedAt
                ? timeInUTC(v.hostCollectedAt)
                : "unavailable",
              checkedOutSlot: v.checkOutDateTime
                ? timeInUTC(v.checkOutDateTime)
                : "unavailable",
            };
          });
        })
        .catch((err) => this.$store.dispatch("handleError", err));
    },
    generateCSVReport() {
      this.loading = true;
      HTTP.get(
        `/api/visit/csv-report/?from=${this.dateFrom}&to=${this.dateTo}`,
        { headers: this.$store.getters.headers }
      )
        .then((res) => {
          this.loading = false;
          let anchorElement = document.createElement("a");
          document.body.appendChild(anchorElement);
          anchorElement.href =
            "data:text/csv;charset=utf-8," + encodeURIComponent(res.data);
          anchorElement.download = "report.csv";
          anchorElement.target = "_blank";
          anchorElement.click();
        })
        .catch((err) => this.$store.dispatch("handleError", err));
    },
  },
};
</script>
