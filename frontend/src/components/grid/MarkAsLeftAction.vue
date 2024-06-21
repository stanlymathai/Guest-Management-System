<template>
  <div>
    <button
      type="button"
      class="btn btn-link btn-sm ms-3"
      title="Mark Left"
      @click="btnClickedHandler"
    >
      <svg width="16" height="16" fill="#0d6efd">
        <path
          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
        />
        <path
          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
        />
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    btnClickedHandler() {
      if (!this.params.data.id) return;
      swal(
        `Mark ${this.params.data.firstName} ${this.params.data.lastName} as Left?`,
        {
          buttons: ["Cancel", "Ok"],
        }
      ).then((isConfirm) => {
        if (isConfirm) this.$store.dispatch("checkOut", this.params.data.id);
      });
    },
  },
};
</script>
