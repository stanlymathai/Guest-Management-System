<template>
  <div class="form_modal fade_in">
    <div class="modal-dialog modal-dialog-centered modal">
      <div class="modal-content">
        <div class="container">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5
                  class="center_horizontally fs-5 text-primary weight400"
                  :class="{ 'text-danger': invalidDate }"
                >
                  {{
                    invalidDate
                      ? "Please enter a 'To date' that is equal to or later than 'From date'."
                      : "Choose Date Range"
                  }}
                </h5>
                <button
                  type="button"
                  class="btn-close modal-close-btn"
                  @click="$emit('close')"
                />
              </div>
              <div class="modal-body">
                <div class="row dashboard-form">
                  <div class="col-md-6">
                    <label class="fs-6 form-label"> From: </label>
                    <DatePicker
                      v-model="dateFrom"
                      :min-date="minDate"
                      :model-config="{
                        type: 'string',
                        mask: 'YYYY/MM/DD',
                      }"
                      :masks="{ L: 'DD/MM/YYYY' }"
                    >
                      <template v-slot="{ inputValue, togglePopover }">
                        <div
                          class="d-flex align-items-center small"
                          @click="togglePopover()"
                        >
                          <CalendarIcon />
                          <input
                            :value="inputValue"
                            class="form-control"
                            placeholder="dd/mm/yyyy"
                            style="padding-left: 25px"
                            :class="
                              invalidDate ? 'border-danger' : 'border-start-0'
                            "
                          />
                        </div>
                      </template>
                    </DatePicker>
                  </div>

                  <div class="col-md-6">
                    <label class="fs-6 form-label"> To: </label>

                    <DatePicker
                      v-model="dateTo"
                      :min-date="minDate"
                      :model-config="{
                        type: 'string',
                        mask: 'YYYY/MM/DD',
                      }"
                      :masks="{ L: 'DD/MM/YYYY' }"
                    >
                      <template v-slot="{ inputValue, togglePopover }">
                        <div
                          class="d-flex align-items-center small"
                          @click="togglePopover()"
                        >
                          <CalendarIcon />
                          <input
                            :value="inputValue"
                            class="form-control"
                            placeholder="dd/mm/yyyy"
                            style="padding-left: 25px"
                            :class="
                              invalidDate ? 'border-danger' : 'border-start-0'
                            "
                          />
                        </div>
                      </template>
                    </DatePicker>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  data-bs-dismiss="modal"
                  type="button"
                  @click="
                    {
                      $emit('submit');
                      $emit('close');
                    }
                  "
                  class="btn btn-primary btn-sm"
                  :disabled="invalidDate || !dateFrom || !dateTo"
                >
                  Set date
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CalendarIcon } from "../../assets/Icons.vue";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

export default {
  components: {
    CalendarIcon,
    DatePicker,
  },
  computed: {
    invalidDate() {
      let sheduledFrom = new Date(this.dateFrom).getTime();
      let sheduledTo = new Date(this.dateTo).getTime();
      return sheduledTo < sheduledFrom;
    },
  },
  props: {
    dateFrom: {
      type: [String, Date],
      default: new Date(),
    },
    dateTo: {
      type: [String, Date],
      default: new Date(),
    },
    minDate: {
      type: [String, Date],
      default: new Date(),
    },
  },
  watch: {
    dateFrom: function () {
      this.$emit("dateFrom", this.dateFrom);
    },
    dateTo: function () {
      this.$emit("dateTo", this.dateTo);
    },
  },
};
</script>
