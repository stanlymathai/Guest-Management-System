<template>
  <section class="pt-80">
    <div class="container-fluid">
      <div class="col-md-12 bg-white rounded-20 has-db-shadow mb-4 p-4">
        <div class="row fade_in">
          <div class="col-md-2 lh-1">
            <blockquote class="blockquote">
              <p class="text-dark lead">Upcoming Visits</p>
              <footer class="blockquote-footer text-nowrap">
                <p>{{ $store.getters.upcomingVisitTitle }}</p>
              </footer>
            </blockquote>
          </div>
          <div class="col-md-4">
            <div class="row">
              <button
                type="button"
                @click="$router.replace('active-visits')"
                class="btn btn-sm btn-primary col my-1"
              >
                Visitors Overview
              </button>
              <button
                type="button"
                @click="$store.dispatch('showPincodeModal')"
                class="btn btn-sm btn-primary col my-1 ms-2"
              >
                Check-in Guest
              </button>
            </div>
          </div>
          <div class="col-md-6">
            <DateContext />
          </div>

          <grid-field
            height="36.13vh"
            :columnDefs="columnDefsToday"
            :rowData="$store.getters.visitsToday"
            v-if="$store.getters.visitsTodayVisible"
          />
          <span
            class="text-dark lh-1 mt-1 mb-1"
            v-if="$store.getters.visitsTodayVisible"
          >
            This Week
          </span>
          <grid-field
            :columnDefs="columnDefsUpComing"
            :rowData="$store.getters.upcomingVisits"
            :height="$store.getters.visitsTodayVisible ? '30.8vh' : '62.93vh'"
          />

          <VisitForm v-if="$store.getters.showVisitForm" />
          <PinCodeCheckIn v-if="$store.getters.showPinCodeCheckIn" />

          <div class="d-flex justify-content-start lh-1 mt-2 gap-1 small">
            <i class="bx bx-square-rounded text-success bg-success" />
            <small class="text-dark">SLOT CONFIRMED</small>
            <i class="bx bx-square-rounded text-warning bg-warning" />
            <small class="text-dark">SLOT YET TO BE CONFIRMED</small>
            <i class="bx bx-square-rounded text-danger bg-danger" />
            <small class="text-dark">SLOT DENIED BY GUEST</small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import CheckInButton from "../../components/grid/CheckInButton";
import ImageButton from "../../components/grid/ImageButton";

import PinCodeCheckIn from "../../components/visit/PinCodeCheckIn";
import DateContext from "../../components/visit/DateContext";

import VisitForm from "../../forms/VisitForm";
import { EditIcon } from "../../assets/Icons";

export default {
  components: {
    PinCodeCheckIn,
    CheckInButton,
    ImageButton,
    DateContext,
    VisitForm,
    EditIcon,
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
          cellRenderer: "ImageButton",
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
          minWidth: 130,
          resizable: true,
        },
        {
          headerName: "Email",
          field: "email",
          minWidth: 200,
          resizable: true,
        },
        {
          headerName: "Arrival Slot",
          field: "appointmentTime",
          minWidth: 190,
          cellClass: (e) => {
            let visitStatus = e.data.visitStatus;
            let cellClass = "color: black";
            if (visitStatus > 2) {
              cellClass = "text-black";
            } else if (visitStatus == 2) {
              cellClass = "text-success";
            } else if (visitStatus == 1) {
              cellClass = "text-warning";
            } else if (visitStatus == 0) {
              cellClass = "text-danger";
            }
            return cellClass;
          },
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
          minWidth: 146,
          resizable: true,
        },
        {
          headerName: "Required Work",
          cellRenderer: () => "N/A",
          minWidth: 109,
        },
      ];
    },

    columnDefsToday() {
      return [
        ...this.columnDefs,
        {
          headerName: "Action",
          cellRenderer: "CheckInButton",
          minWidth: 96,
        },
      ];
    },
    columnDefsUpComing() {
      return [
        ...this.columnDefs,
        {
          headerName: "Edit",
          headerClass: "ms-1",
          cellRenderer: "EditIcon",
          onCellClicked: (e) =>
            this.$store.dispatch("handleEditVisit", e.data.id),
          minWidth: 96,
        },
      ];
    },
  },
};
</script>
