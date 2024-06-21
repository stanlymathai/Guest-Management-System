<template>
  <div>
    <Loader v-if="loading" />
    <Form v-else @submit="submit" v-slot="{ errors }">
      <div class="row fade_in dashboard-form lh-lg p-4">
        <h2 class="fs-4 text-primary weight400 mb-2">Your First Location</h2>
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
            <label class="form-label">Primary Function</label>
            <input class="form-control" placeholder="Primary Function" />
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
          </div>
          <div class="form-check form-switch">
            <label class="form-label mt-1"
              >Security Check
              <sup title="Security check">?</sup>
            </label>
            <input
              class="form-check-input"
              type="checkbox"
              :checked="location.boloCheck"
            />
          </div>
        </div>
        <div class="text-end">
          <button class="btn btn-sm btn-primary" type="submit">
            Add Location
          </button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import InputField from "../components/common/InputField";
import Loader from "../components/layout/Loader";
import { HTTP } from "../../config/axios.js";
import { Form, Field } from "vee-validate";

export default {
  components: { InputField, Loader, Field, Form },
  data() {
    return {
      location: {
        name: "",
        postCode: "",
        timeZone: "",
        dateFormat: "",
        timeFormat: "",
        phone: "",
        description: "",
        boloCheck: true,
        physicalAddress: "",
      },
      loading: false,
    };
  },
  methods: {
    submit() {
      this.loading = true;
      HTTP.post(
        "/api/location/add-location",
        {
          primaryFunction: this.$store.getters.User.name,
          ...this.location,
        },
        {
          headers: this.$store.getters.headers,
        }
      ).then((response) => {
        this.loading = false;
        if (response.data.error || !response.data.id) {
          this.$store.dispatch("handleError", response.data.error);
        } else {
          this.$router.replace("/");
          this.$store.commit("ADD_LOCATION", response.data);
        }
      });
    },
  },
};
</script>
