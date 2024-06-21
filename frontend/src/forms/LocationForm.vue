<template>
  <div class="form_modal fade_in">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="container">
          <Form
            @submit="$store.dispatch('handleLocationSubmit')"
            v-slot="{ errors }"
          >
            <div class="col-md-12 bg-white p-4">
              <div class="row dashboard-form">
                <h2 class="fs-2 text-primary weight400">
                  {{ location.id ? "Edit" : "Add" }} Location
                </h2>
                <div class="col-md-4">
                  <div class="mb-2">
                    <label class="form-label">Location Name*</label>
                    <InputField
                      name="locationName"
                      :model="location.name"
                      placeholder="Location Name"
                      :error="errors.locationName"
                      @event="location.name = $event"
                    />
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Country*</label>
                    <input
                      readonly
                      type="text"
                      value="United Kingdom"
                      class="form-control bg-white"
                    />
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Physical Address*</label>
                    <InputField
                      name="physicalAddress"
                      placeholder="Physical Address"
                      :error="errors.physicalAddress"
                      :model="location.physicalAddress"
                      @event="location.physicalAddress = $event"
                    />
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Post/ZIP code*</label>
                    <InputField
                      name="postCode"
                      placeholder="Post code"
                      :error="errors.postCode"
                      :model="location.postCode"
                      @event="location.postCode = $event"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-2">
                    <label class="form-label">Time Zone*</label>
                    <Field
                      as="select"
                      name="timeZone"
                      rules="required"
                      class="form-select"
                      v-model="location.timeZone"
                      :class="{ 'is-invalid': errors.timeZone }"
                    >
                      <option value="">
                        <label>Select</label>
                      </option>
                      <option value="GMT">GMT</option>
                    </Field>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Date Format*</label>
                    <Field
                      as="select"
                      name="dateFormat"
                      rules="required"
                      class="form-select"
                      v-model="location.dateFormat"
                      :class="{ 'is-invalid': errors.dateFormat }"
                    >
                      <option value="">
                        <label>Select</label>
                      </option>
                      <option value="DD/MM/YYYY">dd/mm/yyyy</option>
                      <option value="MM/DD/YYYY">mm/dd/yyyy</option>
                    </Field>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Time Format*</label>
                    <Field
                      as="select"
                      name="timeFormat"
                      rules="required"
                      class="form-select"
                      v-model="location.timeFormat"
                      :class="{ 'is-invalid': errors.timeFormat }"
                    >
                      <option value="">
                        <label>Select</label>
                      </option>
                      <option value="24">24hrs</option>
                      <option value="12">12hrs</option>
                    </Field>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-2">
                    <label class="form-label">Location Manager*</label>
                    <SelectField
                      :model="primaryFn"
                      name="primaryFunction"
                      @event="primaryFn = $event"
                      :error="errors.primaryFunction"
                      placeholder=" -- Choose a manager -- "
                      :options="$store.getters.locationManagers"
                    />
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Phone Number*</label>
                    <InputField
                      name="phone"
                      rules="phone"
                      :error="errors.phone"
                      :model="location.phone"
                      placeholder="Phone Number"
                      @event="location.phone = $event"
                    />
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Location Description</label>
                    <input
                      type="text"
                      name="description"
                      class="form-control"
                      placeholder="Type Here..."
                      autocomplete="new-password"
                      v-model="location.description"
                    />
                    <div class="form-check form-switch mt-3">
                      <label class="form-label">Security Check </label>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="boloCheck"
                      />
                    </div>
                  </div>
                </div>
                <div class="d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    @click="$store.dispatch('handleLocationCancel')"
                    class="btn btn-danger col-12 col-md-2 mt-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary ms-md-2 col-12 col-md-2 mt-2"
                  >
                    Submit
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
import InputField from "../components/common/InputField.vue";
import { Form, Field } from "vee-validate";

export default {
  components: { SelectField, InputField, Form, Field },

  computed: {
    location() {
      return this.$store.getters.location;
    },
    primaryFn: {
      get() {
        if (this.location.primaryFunction) {
          return { name: this.location.primaryFunction };
        } else return "";
      },
      set(value) {
        this.location.primaryFunction = value.name;
      },
    },
    boloCheck: {
      get() {
        return !!this.location.boloCheck;
      },
      set(value) {
        this.location.boloCheck = value >>> 0;
      },
    },
  },
};
</script>
