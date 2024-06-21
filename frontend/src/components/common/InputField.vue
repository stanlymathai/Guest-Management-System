<template>
  <div class="text-dark" :class="{ 'form-floating small': error || label }">
    <input
      :id="name"
      :type="type"
      v-model="model"
      class="form-control"
      :disabled="disabled"
      autocomplete="new-password"
      :class="{ 'is-invalid': error }"
      :placeholder="label ?? placeholder"
    />
    <label
      :for="name"
      v-if="error || label"
      :class="{ 'text-danger small': error }"
      style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
      ><p>
        {{ label ?? error }} <i v-if="label && error">({{ error }})</i>
      </p>
    </label>
    <Validator :rules="rules" v-model="model" :name="name" v-show="false" />
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
      type: [String, Boolean],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    rules: {
      type: String,
      default: "required",
    },
    error: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },

  watch: {
    model: function () {
      this.$emit("event", this.model);
    },
  },
};
</script>
