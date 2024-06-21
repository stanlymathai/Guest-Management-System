<template>
  <div>
    <VueMultiselect
      :label="label"
      track-by="id"
      v-model="model"
      :multiple="multi"
      :options="options"
      :limit="selectLimit"
      :disabled="disabled"
      :show-labels="false"
      :hide-selected="true"
      :max="optionsMaxLimit"
      :allow-empty="allowEmpty"
      :options-limit="optionsLimit"
      :open-direction="openDirection"
      :close-on-select="closeOnSelect"
      :clear-on-select="clearOnSelect"
      :preserve-search="preserveSearch"
      :class="{ 'select-invalid': error }"
      :placeholder="
        error
          ? holderName
            ? holderName + ' (Required)'
            : error
          : holderName ?? placeholder
      "
    />
    <Validator
      :name="name"
      v-show="false"
      v-model="model"
      rules="multiSelect"
    />
  </div>
</template>
<script>
import { Field as Validator } from "vee-validate";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

export default {
  components: {
    VueMultiselect,
    Validator,
  },
  props: {
    model: {
      type: [String, Object],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "name",
    },
    options: {
      type: Array,
      required: true,
    },
    selectLimit: {
      type: Number,
      default: 10,
    },
    optionsLimit: {
      type: Number,
      default: 5,
    },
    optionsMaxLimit: {
      type: Number,
      default: undefined,
    },
    multi: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    allowEmpty: {
      type: Boolean,
      default: true,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    clearOnSelect: {
      type: Boolean,
      default: true,
    },
    preserveSearch: {
      type: Boolean,
      default: false,
    },
    error: {
      default: undefined,
    },
    placeholder: {
      type: String,
    },
    holderName: {
      type: String,
    },
    openDirection: {
      type: String,
      default: "bottom",
    },
  },

  watch: {
    model: function () {
      this.$emit("event", this.model);
    },
  },
};
</script>
