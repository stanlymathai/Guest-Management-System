<template>
  <section class="pt-80">
    <div class="container-fluid">
      <div class="col-md-12 bg-white rounded-20 has-db-shadow mb-4 p-4">
        <div class="row fade_in">
          <div class="col-md-2">
            <blockquote class="blockquote">
              <p class="text-dark lead">Visitors Overview</p>
            </blockquote>
          </div>
          <div class="col-md-4">
            <div class="row">
              <button
                type="button"
                class="btn btn-sm btn-primary col my-1"
                @click="$router.replace('upcoming-visits')"
              >
                Upcoming Visits
              </button>
              <button
                type="button"
                class="btn btn-sm btn-primary col my-1 ms-2"
                @click="$store.dispatch('handleVisitFormAdd')"
              >
                Add Visitor
              </button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex flex-row justify-content-end mt-3">
              <span class="text-dark small lh-1 mt-1 me-1"
                >Only show visitors who have passed security check and are
                awaiting host</span
              >
              <div class="form-check form-switch ms-1">
                <input
                  role="switch"
                  type="checkbox"
                  class="form-check-input"
                  v-bind="$store.getters.showAwaitingOnly"
                  @change="$store.dispatch('toggleAwaiting')"
                />
              </div>
            </div>
          </div>

          <grid-field
            height="36vh"
            :columnDefs="columnDefsCheckIn"
            :rowData="$store.getters.visitorsCheckedIn"
          />
          <span class="text-dark mt-2"> Visitors with Host </span>
          <grid-field
            height="30vh"
            :columnDefs="columnDefsCollected"
            :rowData="$store.getters.visitorsWithHost"
          />
          <VisitForm v-if="$store.getters.showVisitForm" />

          <div class="d-flex justify-content-start lh-1 mt-2 gap-1 small">
            <i class="bx bx-bell" />
            <small class="text-dark"> Click to Notify Host</small>

            <i class="bx bx-hourglass" />
            <small class="text-dark">
              Currently Awaiting Host, Click to Mark as Collected</small
            >

            <i class="bx bx-bell-off" />
            <small class="text-dark">
              Unable to Notify, Entry Requirements not met</small
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import SecurityCheckAction from "../../components/grid/SecurityCheckAction.vue";
import WaitingRoomAction from "../../components/grid/WaitingRoomAction.vue";
import MarkAsLeftAction from "../../components/grid/MarkAsLeftAction";

import ImageButton from "../../components/grid/ImageButton.vue";

import VisitForm from "../../forms/VisitForm.vue";

export default {
  components: {
    SecurityCheckAction,
    WaitingRoomAction,
    MarkAsLeftAction,
    ImageButton,
    VisitForm,
  },
  computed: {
    columnDefs() {
      return [
        {
          headerName: "First Name",
          field: "firstName",
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
          headerName: "Last Name",
          field: "lastName",
          cellRenderer: "ImageButton", // contain image and last name
          filter: "agTextColumnFilter",
          filterParams: {
            debounceMs: 200,
            filterOptions: ["contains"],
            suppressAndOrCondition: true,
          },
          minWidth: 132,
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
          minWidth: 110,
          resizable: true,
        },
        {
          headerName: "Email",
          field: "email",
          minWidth: 200,
          resizable: true,
        },
        {
          headerName: "Appointment Time",
          field: "appointmentTime",
          minWidth: 160,
        },
        {
          headerName: "Checked in",
          field: "checkedIn",
          minWidth: 90,
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
      ];
    },
    columnDefsCheckIn() {
      return [
        ...this.columnDefs,
        {
          headerName: "Waiting Room Action",
          cellRenderer: "WaitingRoomAction",
          cellClass: "ag-align-center",
          minWidth: 150,
        },
        {
          headerName: "Security check",
          cellRenderer: "SecurityCheckAction",
          cellClass: "ag-align-center",
          minWidth: 80,
        },
      ];
    },
    columnDefsCollected() {
      return [
        ...this.columnDefs,
        {
          headerName: "Collected at",
          field: "collectedAt",
          minWidth: 105,
        },
        {
          headerName: "Mark as left",
          cellRenderer: "MarkAsLeftAction",
          minWidth: 100,
        },
      ];
    },
  },
  mounted() {
    setTimeout(() => this.$store.dispatch("fetchVisitsToday"), 1024);
  },
};
</script>
