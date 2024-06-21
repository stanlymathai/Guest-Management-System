<template>
  <div>
    <DatePicker
      :mode="mode"
      v-model="model"
      :is24hr="is24hr"
      :min-date="minDate"
      :max-date="maxDate"
      :model-config="{
        type: 'string',
        mask: 'YYYY/MM/DD hh:mm a',
      }"
      :masks="{ L: dateMask }"
      :minute-increment="minuteIncrement"
    >
      <template v-slot="{ inputValue, togglePopover }">
        <div class="d-flex align-items-center" @click="togglePopover()">
          <CalendarIcon />
          <input
            :value="inputValue"
            class="form-control"
            style="padding-left: 25px"
            :placeholder="placeholder"
            :class="isDateInvalid ? 'border-danger' : 'border-start-0'"
          />
        </div>
      </template>
    </DatePicker>
  </div>
</template>

<script>
import { CalendarIcon } from "../../assets/Icons.vue";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

export default {
  props: {
    model: {
      type: [String, Date],
    },
    minDate: {
      type: [String, Date],
    },
    maxDate: {
      type: [String, Date],
    },
    minuteIncrement: {
      type: Number,
      default: 10,
    },
    dateMask: {
      type: String,
      default: "DD/MM/YYYY",
    },
    mode: {
      type: String,
      default: "dateTime", // other modes {time, date}
    },
    isDateInvalid: {
      type: Boolean,
      default: false,
    },
    is24hr: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "dd/mm/yyyy hh:mm",
    },
  },
  components: {
    CalendarIcon,
    DatePicker,
  },
  watch: {
    model: function () {
      this.$emit("event", this.model);
    },
  },
};
</script>
