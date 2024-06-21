<template>
  <div class="form_modal fade_in">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="container">
          <Form
            @submit="$store.dispatch('handleUserSubmit')"
            v-slot="{ errors }"
          >
            <div class="col-md-12 bg-white p-4">
              <div class="row dashboard-form">
                <h2 class="fs-2 text-primary weight400">
                  {{ user.id ? "Edit" : "Add" }}
                  {{ user.role == 1 ? "User" : "Host" }}
                </h2>
                <div class="col-md-6">
                  <div class="mb-2">
                    <label class="form-label">Name*</label>
                    <InputField
                      name="userName"
                      :model="userName"
                      placeholder="Name"
                      :error="errors.userName"
                      @event="userName = $event"
                    />
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Location Access*</label>
                    <SelectField
                      v-bind:multi="true"
                      name="userLocations"
                      v-bind:preserveSearch="true"
                      v-bind:closeOnSelect="false"
                      v-bind:clearOnSelect="false"
                      :model="user.userLocations"
                      :error="errors.userLocations"
                      @event="user.userLocations = $event"
                      placeholder="Type to search Locations"
                      :options="$store.getters.locationDropdowns"
                    />
                  </div>
                  <div class="mb-2" v-if="!user.id">
                    <label class="form-label">Email*</label>
                    <InputField
                      rules="email"
                      name="userEmail"
                      :model="user.email"
                      :error="errors.userEmail"
                      @event="user.email = $event"
                      placeholder="username@domain.com"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-2" v-if="!user.id">
                    <label class="form-label">Password*</label>
                    <InputField
                      type="password"
                      name="password"
                      :model="user.password"
                      placeholder="Password"
                      :error="errors.password"
                      @event="user.password = $event"
                    />
                  </div>
                  <div class="mb-2" v-if="!user.id">
                    <label class="form-label">Confirm Password*</label>
                    <InputField
                      type="password"
                      name="passwordConfirm"
                      :model="user.passwordConfirm"
                      placeholder="Confirm Password"
                      :error="errors.passwordConfirm"
                      rules="required|confirmed:password"
                      @event="user.passwordConfirm = $event"
                    />
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Phone Number*</label>
                    <InputField
                      rules="phone"
                      name="userPhone"
                      :model="user.phone"
                      :error="errors.userPhone"
                      placeholder="Phone Number"
                      @event="user.phone = $event"
                    />
                  </div>
                  <!-- to optimize rendering and responsiveness -->
                  <div class="mb-2" v-if="user.id">
                    <label class="form-label">Email*</label>
                    <InputField
                      rules="email"
                      name="userEmail"
                      :model="user.email"
                      :error="errors.userEmail"
                      @event="user.email = $event"
                      placeholder="username@domain.com"
                    />
                  </div>
                </div>
                <div class="d-md-flex justify-content-md-end">
                  <button
                    class="btn btn-danger col-12 col-md-2 mt-2"
                    type="button"
                    @click="$store.dispatch('handleUserCancel')"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-primary ms-md-2 col-12 col-md-2 mt-2"
                    type="submit"
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
import { Form } from "vee-validate";

export default {
  components: { SelectField, InputField, Form },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    userName: {
      get() {
        return `${this.user.firstName} ${this.user.lastName}`.trim();
      },
      set(name) {
        let parts = name.split(" ");
        this.user.firstName = parts
          .shift()
          .toLowerCase()
          .replace(/\b\w/g, (s) => s.toUpperCase());
        this.user.lastName = parts
          .join(" ")
          .toLowerCase()
          .replace(/\b\w/g, (s) => s.toUpperCase());
      },
    },
  },
};
</script>
