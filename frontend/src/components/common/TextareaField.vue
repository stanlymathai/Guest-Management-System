<template>
  <div :class="{ 'form-floating text-danger small': error }">
    <textarea
      :id="name"
      v-model="model"
      class="form-control"
      :maxlength="maxlength"
      :placeholder="placeholder"
      autocomplete="new-password"
      :class="{ 'is-invalid': error }"
      :style="`height: ${height}px;resize: none`"
    />
    <label class="small" v-if="error" :for="name">{{ error }}</label>
    <Validator :rules="rules" v-show="false" v-model="model" :name="name" />
  </div>
</template>
<script>
import { Field as Validator } from "vee-validate";

export default {
  components: {
    Validator,
  },
  props: {
    model: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    height: {
      // do not use the rows attribute. Instead, set an explicit height
      type: String,
      default: "70",
    },
    rules: {
      type: String,
      default: "required",
    },
    maxlength: {
      type: Number,
      default: 255,
    },
    error: {
      required: true,
    },
    placeholder: {
      type: String,
      default: "Type here... Maximum length 255 characters",
    },
  },

  watch: {
    model: function () {
      this.$emit("event", this.model);
    },
  },
};
</script>
