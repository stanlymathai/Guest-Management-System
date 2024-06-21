<template>
  <span>
    <div>
      <!-- to optimize grid column space, image icon is coupled with last name -->

      {{ this.params.data.lastName }}

      <button
        type="button"
        class="camera-icon p-0"
        title="Display Image"
        @click="btnClickedHandler()"
      >
        <svg
          width="16"
          height="16"
          fill="#0d6efd"
          v-if="this.params.data.image !== null"
        >
          <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
          <path
            d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
          />
        </svg>
        <svg v-else width="16" height="16">
          <path
            fill="#0d6efd"
            d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"
          />
          <path
            fill="#0d6efd"
            d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
          />
        </svg>
      </button>
    </div>
  </span>
</template>
<script>
export default {
  methods: {
    btnClickedHandler() {
      if (this.params.data.image == null) {
        swal("No image uploaded");
        return;
      }
      swal(`${this.params.data.firstName} ${this.params.data.lastName}`, {
        icon: `${this.params.data.image}`,
      });
    },
  },
};
</script>
