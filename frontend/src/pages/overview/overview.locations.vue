<template>
  <section class="pt-80">
    <div class="container-fluid">
      <div class="col-md-12 bg-white rounded-20 has-db-shadow p-4 mb-4">
        <div class="row fade_in">
          <h2 class="fs-2 text-primary weight400">Locations</h2>
          <grid-field
            height="60vh"
            :columnDefs="columnDefs"
            :rowData="$store.getters.locations"
          />
        </div>
        <div v-if="$store.getters.isLocationManager">
          <button
            type="button"
            class="btn btn-primary col-md-2 mt-3"
            @click="$store.dispatch('handleAddLocation')"
          >
            Add Location
          </button>
          <LocationForm v-if="$store.getters.showLocationForm" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { EditIcon, DeleteIcon } from "../../assets/Icons.vue";
import LocationForm from "../../forms/LocationForm.vue";

export default {
  components: { LocationForm, EditIcon, DeleteIcon },
  data() {
    return {
      columnDefs: [
        {
          headerName: "Location Name",
          field: "name",
          filter: "agTextColumnFilter",
          cellClass: "text-capitalize",
          resizable: true,
        },
        {
          headerName: "Current No. Visitors",
          field: "visitCount",
          cellClass: "ms-5",
          sortable: true,
          unSortIcon: true,
        },
        {
          headerName: "Location Manager",
          cellClass: "ms-2",
          field: "primaryFunction",
          filter: "agTextColumnFilter",
          resizable: true,
        },
        {
          headerName: "Edit",
          headerClass: "ms-1",
          cellRenderer: "EditIcon",
          onCellClicked: (e) =>
            this.$store.dispatch("handleEditLocation", e.data.id),
          hide: !this.$store.getters.isLocationManager,
        },
        {
          headerName: "Delete",
          headerClass: "ms-1",
          cellClass: "ms-1",
          cellRenderer: "DeleteIcon",
          onCellClicked: (e) => {
            if (e.data.visitCount != 0) {
              swal("Visitors are in this location and cannot be deleted");
              return;
            }
            swal("Are you sure?", {
              buttons: ["Cancel", "Delete"],
              dangerMode: true,
            }).then((isConfirm) => {
              if (isConfirm)
                this.$store.dispatch("handleLocationDelete", e.data.id);
            });
          },
          hide: !this.$store.getters.isLocationManager,
        },
      ],
    };
  },
};
</script>
