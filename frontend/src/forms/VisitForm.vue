<template>
  <div class="form_modal fade_in">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="container">
          <Form
            @submit="$store.dispatch('handleVisitSubmit')"
            v-slot="{ errors }"
          >
            <div class="col-md-12 bg-white p-4">
              <div class="row dashboard-form">
                <h2 class="text-primary weight400 fs-2 mb-2">
                  {{ visit.id ? "Edit Visit" : "Register A Visitor" }}
                </h2>
                <div class="row mb-2">
                  <label class="form-label">Location for visit</label>
                  <div class="d-flex justify-content-around">
                    <div class="col me-md-3">
                      <SelectField
                        class="me-2"
                        name="visitLocation"
                        :model="visit.location"
                        :error="errors.visitLocation"
                        @event="visit.location = $event"
                        :disabled="visit.visitStatus != 1"
                        placeholder="Please choose a location"
                        :options="$store.getters.visitLocations"
                      />
                    </div>
                    <div class="col ms-md-3 lh-sm small text-danger">
                      <p v-if="invalidVisit" class="border border-danger p-1">
                        Please enter a valid 'To time' that is later than 'From
                        time'.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="row mb-2">
                  <label class="form-label">Date and Time of Visit</label>
                  <div class="d-flex justify-content-between">
                    <DateTimePicker
                      :model="dateFrom"
                      placeholder="From"
                      :minDate="new Date()"
                      @event="dateFrom = $event"
                      v-bind:minuteIncrement="1"
                      :isDateInvalid="invalidVisit"
                      :dateMask="visit.location.dateFormat"
                      :is24hr="visit.location.timeFormat == 24"
                    />
                    <label class="form-label col ms-3 me-3 mt-2">to</label>
                    <DateTimePicker
                      :model="dateTo"
                      placeholder="To"
                      :minDate="new Date()"
                      @event="dateTo = $event"
                      v-bind:minuteIncrement="1"
                      :isDateInvalid="invalidVisit"
                      :dateMask="visit.location.dateFormat"
                      :is24hr="visit.location.timeFormat == 24"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-check form-switch mb-2 mt-2">
                      <label class="form-label"
                        >Is this visit recurring?
                      </label>
                      <input
                        type="checkbox"
                        onclick="return false;"
                        onkeydown="return false;"
                        class="form-check-input"
                        v-model="visit.recurring"
                      />
                    </div>
                    <div class="form-check form-switch mb-2">
                      <label class="form-label"
                        >Are they visiting someone?
                      </label>
                      <input
                        checked
                        type="checkbox"
                        onclick="return false;"
                        onkeydown="return false;"
                        class="form-check-input"
                      />
                    </div>
                    <div class="mb-2 me-2">
                      <label class="form-label">Host</label>
                      <SelectField
                        name="selectedHost"
                        :model="visit.host"
                        :error="errors.selectedHost"
                        @event="visit.host = $event"
                        :placeholder="
                          visit.location.id
                            ? 'Please select a host'
                            : 'Please select a location first'
                        "
                        :options="
                          $store.getters.hostDropdown(visit.location.id)
                        "
                        :disabled="visit.visitStatus != 1 || !visit.location.id"
                      />
                    </div>
                    <div class="mb-2 me-2">
                      <label class="form-label">Reason for visit</label>
                      <TextareaField
                        name="reason"
                        :model="visit.reason"
                        :error="errors.reason"
                        @event="visit.reason = $event"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <p class="text-primary lead mb-2 mt-2 ms-2">
                      Visitor Information
                    </p>
                    <div class="row mb-2">
                      <div class="col ms-1">
                        <label class="form-label">First Name</label>
                        <InputField
                          name="firstName"
                          placeholder="First Name"
                          :error="errors.firstName"
                          :model="visit.visitor.firstName"
                          @event="visit.visitor.firstName = $event"
                        />
                      </div>
                      <div class="col ms-1">
                        <label class="form-label">Last Name</label>
                        <InputField
                          name="lastName"
                          placeholder="Last Name"
                          :error="errors.lastName"
                          :model="visit.visitor.lastName"
                          @event="visit.visitor.lastName = $event"
                        />
                      </div>
                    </div>
                    <div class="mb-2 ms-2">
                      <label class="form-label">Email</label>
                      <InputField
                        rules="email"
                        name="visitorEmail"
                        :error="errors.visitorEmail"
                        :model="visit.visitor.email"
                        placeholder="username@domain.com"
                        :disabled="visit.visitStatus != 1"
                        @event="visit.visitor.email = $event"
                      />
                    </div>
                    <div class="mb-2 ms-2">
                      <label class="form-label">Company</label>
                      <InputField
                        name="company"
                        :model="company"
                        :error="errors.company"
                        @event="company = $event"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                  <div class="d-md-flex justify-content-md-end">
                    <button
                      class="btn btn-danger col-12 col-md-2 mt-2"
                      type="button"
                      @click="$store.dispatch('visitFormCancel')"
                    >
                      Cancel
                    </button>
                    <button
                      class="btn btn-primary ms-md-2 col-12 col-md-2 mt-2"
                      :disabled="invalidVisit"
                      type="submit"
                    >
                      {{ visit.id ? "Submit" : "Register" }}
                    </button>
                  </div>
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
import DateTimePicker from "../components/common/DateTimePicker.vue";
import TextareaField from "../components/common/TextareaField.vue";
import SelectField from "../components/common/SelectField.vue";
import InputField from "../components/common/InputField.vue";

import { Form } from "vee-validate";

export default {
  components: { DateTimePicker, TextareaField, SelectField, InputField, Form },
  computed: {
    visit() {
      return this.$store.getters.visit;
    },
    dateFrom: {
      get() {
        return this.visit.dateFrom;
      },
      set(value) {
        this.visit.dateFrom = value;
        let visitSlot = {
          to: new Date(this.dateTo),
          from: new Date(this.dateFrom),
        };
        visitSlot.to.setDate(visitSlot.from.getDate());
        visitSlot.to.setMonth(visitSlot.from.getMonth());
        visitSlot.to.setFullYear(visitSlot.from.getFullYear());

        this.dateTo = visitSlot.to;
      },
    },
    dateTo: {
      get() {
        return this.visit.dateTo;
      },
      set(value) {
        this.visit.dateTo = value;
        let visitSlot = {
          to: new Date(this.dateTo),
          from: new Date(this.dateFrom),
        };
        if (visitSlot.from.toDateString() != visitSlot.to.toDateString()) {
          visitSlot.from.setFullYear(visitSlot.to.getFullYear());
          visitSlot.from.setMonth(visitSlot.to.getMonth());
          visitSlot.from.setDate(visitSlot.to.getDate());
          this.dateFrom = visitSlot.from;
        }
      },
    },

    company: {
      get() {
        return this.visit.visitor.company;
      },
      set(value) {
        this.visit.visitor.company = value.toUpperCase();
      },
    },
    invalidVisit() {
      if (!this.dateFrom) return;
      let sheduledFrom = new Date(this.dateFrom).getTime();
      let sheduledTo = new Date(this.dateTo).getTime();

      return sheduledFrom >= sheduledTo;
    },
  },
};
</script>
