<template>
  <section class="pt-80">
    <div class="container-fluid">
      <div class="col-md-12 bg-white rounded-20 has-db-shadow p-4 mb-4">
        <div class="row dashboard-form fade_in">
          <h2 class="fs-2 text-primary weight400 mb-0">User Management</h2>
          <div class="container">
            <div class="row mb-3">
              <div class="col">
                <span class="lead primary-heading"> Users </span>
                <grid-field
                  height="60vh"
                  :columnDefs="columnDefs"
                  :rowData="$store.getters.users"
                />
              </div>
              <div class="col">
                <span class="lead primary-heading"> Hosts </span>
                <grid-field
                  height="60vh"
                  :columnDefs="columnDefs"
                  :rowData="$store.getters.hosts"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <button
                type="button"
                class="btn btn-sm btn-primary mb-2 col-12"
                @click="$store.dispatch('handleAddUser', (roleId = 1))"
              >
                Add User
              </button>
            </div>
            <UserForm v-if="$store.getters.showUserForm" />
            <UploadForm v-if="$store.getters.showUploadForm" />
            <div class="col-md-6 offset-md-4">
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="button"
                  class="btn btn-primary col-md-4 btn-sm"
                  @click="$store.dispatch('handleAddUser', (roleId = 3))"
                >
                  Add Host
                </button>
                <button
                  type="button"
                  class="btn btn-primary col-md-4 btn-sm"
                  @click="$store.dispatch('handleHostUpload')"
                >
                  Add Multiple Hosts
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
import { EditIcon, DeleteIcon } from "../../assets/Icons.vue";

import UploadForm from "../../forms/BulkUploadForm.vue";
import UserForm from "../../forms/UserForm.vue";

export default {
  components: {
    UploadForm,
    DeleteIcon,
    EditIcon,
    UserForm,
  },
  computed: {
    columnDefs() {
      return [
        {
          headerName: "Name",
          field: "name",
          filter: "agTextColumnFilter",
          cellClass: "text-capitalize",
          resizable: true,
        },
        {
          headerName: "Locations",
          field: "locations",
          filter: "agTextColumnFilter",
          cellClass: "text-capitalize font-monospace small",
          resizable: true,
        },
        {
          headerName: "Edit",
          headerClass: "ms-1",
          cellRenderer: "EditIcon",
          onCellClicked: (e) =>
            this.$store.dispatch("handleEditUser", e.data.id),
          maxWidth: 100,
        },
        {
          headerName: "Delete",
          headerClass: "ms-1",
          cellClass: "ms-1",
          cellRenderer: "DeleteIcon",
          onCellClicked: (e) => {
            swal("Are you sure?", {
              buttons: ["Cancel", "Delete"],
              dangerMode: true,
            }).then((isConfirm) => {
              if (isConfirm)
                this.$store.dispatch("handleDeleteUser", e.data.id);
            });
          },
          maxWidth: 105,
        },
      ];
    },
  },
};
</script>
