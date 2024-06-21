<template>
  <div class="btn-group-toggle">
    <button
      class="btn btn-sm btn-outline-primary lh-1"
      :disabled="!params.data.visitStatus"
      @click="btnClickedHandler"
    >
      Check-in
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    btnClickedHandler() {
      let visitData = this.params.data;
      let payload = {
        notifyHost: "",
        id: visitData.id,
        hostName: visitData.hostName,
        visitorName: `${visitData.firstName} ${visitData.lastName}`.trim(),
      };
      swal(`${payload.visitorName} Arrived? Notify ${payload.hostName}?`, {
        buttons: {
          cancel: "",
          catch: {
            text: `Notify`,
            value: "catch",
          },
          defeat: `Notify Later`,
        },
      }).then((value) => {
        switch (value) {
          case "defeat":
            payload.notifyHost = 0;
            break;
          case "catch":
            payload.notifyHost = 1;
            break;

          default:
            return;
        }

        this.$store.dispatch("handleCheckIn", payload);
      });
    },
  },
};
</script>
