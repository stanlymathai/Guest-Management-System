<template>
  <div class="form_modal fade_in">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="container">
          <Form @submit="handleUploadSubmit" v-slot="{ errors }">
            <div class="col-md-12 bg-white p-4">
              <Loader v-if="loading" />
              <div v-else class="row dashboard-form">
                <h2 class="fs-3 text-primary" :class="{ lead: uploadMessage }">
                  {{ uploadMessage ?? "Bulk Upload Hosts" }}
                </h2>
                <div v-if="failedUploads">
                  <label class="text-dark lead mb-0"
                    >Failed Upload Lists:</label
                  >
                  <grid-field
                    height="50vh"
                    :columnDefs="columnDefs"
                    :rowData="failedUploads"
                  />
                </div>
                <div v-else>
                  <div class="mb-3">
                    <label class="col-form-label">Hosts:</label>
                    <input
                      required
                      type="file"
                      class="form-control"
                      v-on:change="pickFile"
                      :class="{ 'border-danger': errors.selectedFile }"
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <small class="text-danger" v-if="errors.selectedFile">
                      Please upload a spreadsheet to continue.
                    </small>
                    <Field
                      v-show="false"
                      name="selectedFile"
                      v-model="selectedFileName"
                      rules="required"
                    />
                    <p class="text-muted">
                      Only excel files are allowed.
                      <a
                        v-show="false"
                        target="_blank"
                        id="download-spreadsheet"
                        v-bind:href="spreadSheetUrl"
                      />
                      <a
                        @click="downloadSpreadsheet"
                        class="text-decoration-none cursor_pointer"
                        >Click here to download the spreadsheet.
                      </a>
                    </p>
                  </div>
                  <div class="mb-3">
                    <label class="col-form-label">Location Access:</label>
                    <SelectField
                      v-bind:multi="true"
                      name="selectedLocations"
                      :model="selectedLocations"
                      v-bind:preserveSearch="true"
                      v-bind:closeOnSelect="false"
                      v-bind:clearOnSelect="false"
                      :error="errors.selectedLocations"
                      @event="selectedLocations = $event"
                      placeholder="Type to search Locations"
                      :options="$store.getters.locationDropdowns"
                    />
                    <small class="text-danger" v-if="errors.selectedLocations">
                      Please select at least one location.
                    </small>
                  </div>
                </div>
                <div class="d-md-flex justify-content-md-end">
                  <button
                    :class="failedUploads ? 'btn-primary' : 'btn-danger'"
                    class="btn mt-3"
                    type="button"
                    @click="$store.dispatch('handleUploadCancel')"
                  >
                    {{ failedUploads ? "Ok" : "Cancel" }}
                  </button>
                  <button
                    v-if="!failedUploads"
                    class="btn btn-primary ms-md-2 mt-3"
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SelectField from "../components/common/SelectField.vue";
import Loader from "../components/layout/Loader";
import { Form, Field } from "vee-validate";
import { HTTP } from "../../config/axios";

export default {
  components: { SelectField, Loader, Form, Field },

  data() {
    return {
      selectedLocations: "",
      selectedFileName: "",
      spreadSheetUrl: "",
      selectedFile: "",
      columnDefs: [
        {
          field: "firstName",
          maxWidth: 120,
          filter: "agTextColumnFilter",
          filterParams: {
            debounceMs: 200,
            resizable: true,
            filterOptions: ["contains"],
            suppressAndOrCondition: true,
          },
        },
        {
          field: "lastName",
          maxWidth: 120,
          filter: "agTextColumnFilter",
          filterParams: {
            resizable: true,
            debounceMs: 200,
            filterOptions: ["contains"],
            suppressAndOrCondition: true,
          },
        },
        { field: "email", resizable: true, maxWidth: 140 },
        { field: "phone", maxWidth: 120 },
        { field: "reason" },
      ],
      failedUploads: null,
      uploadMessage: null,
      loading: false,
    };
  },
  methods: {
    handleUploadSubmit() {
      this.loading = true;

      let payload = new FormData();
      payload.append("role", 3);
      payload.append("country", 1);
      payload.append("bulkUploadFile", this.selectedFile);
      payload.append(
        "locations",
        this.selectedLocations.map((location) => location.id)
      );
      payload.append("organization", this.$store.getters.User.organization);

      HTTP.post("/api/user/add-hosts", payload, {
        headers: this.$store.getters.headers,
      }).then((response) => {
        this.loading = false;
        if (response.data.error)
          return (this.uploadMessage = response.data.error);
        let uploadSucceeded = response.data.uploadSucceeded;
        let failedUploads = response.data.failedUploads;
        let totalCount = response.data.totalCount;
        if (uploadSucceeded || totalCount) {
          this.$store.dispatch("fetchUsers");
          this.uploadMessage = `${uploadSucceeded} out of ${totalCount} uploaded`;
        } else
          return (this.uploadMessage =
            "The data/file format is invalid, please ensure that the uploaded file is correct");

        if (!Object.keys(failedUploads).length) {
          return swal(this.uploadMessage).then(() =>
            this.$store.dispatch("handleUploadCancel")
          );
        }
        this.failedUploads = failedUploads.map((data) => ({
          firstName: data[0],
          lastName: data[1],
          email: data[2],
          phone: data[3],
          reason: data[4],
        }));
      });
    },
    downloadSpreadsheet() {
      if (this.spreadSheetUrl)
        return document.getElementById("download-spreadsheet").click();

      this.loading = true;
      HTTP.get("/api/user/get-upload-sheet-url/", {
        headers: this.$store.getters.headers,
      })
        .then((response) => {
          this.loading = false;
          this.spreadSheetUrl = response.data;
          let anchorElement = document.createElement("a");
          document.body.appendChild(anchorElement);
          anchorElement.href = response.data;
          anchorElement.target = "_blank";
          anchorElement.click();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err, "downloadSpreadsheetError");
        });
    },
    pickFile(e) {
      let input = e.target.files[0];
      if (!input.type.match(/.sheet*/) && !input.type.match(/.ms-excel*/))
        return swal(
          "",
          "The selected input is not an acceptable format",
          "error"
        );

      this.selectedFile = input;
      this.selectedFileName = input.name; // to help with validation
    },
  },
};
</script>
