<template>
  <div class="d-flex justify-content-center">
    <button
      v-if="
        (visit.notifyHost == 0 || visit.notifyHost == null) &&
        (visit.boloStatus == 1 || visit.boloStatus == null)
      "
      type="button"
      class="waiting-room-action"
      title="Notify Host"
      @click="notifyHost"
    >
      <svg width="16" height="16" fill="#0d6efd">
        <path
          d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
        />
      </svg>
    </button>
    <button
      v-if="visit.notifyHost == 1 && visit.boloStatus !== 0"
      type="button"
      class="waiting-room-action"
      title="Mark Collected"
      @click="markCollected"
    >
      <svg width="16" height="16" fill="#0d6efd">
        <path
          d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"
        />
      </svg>
    </button>
    <button
      v-if="visit.boloStatus == 0"
      type="button"
      class="waiting-room-action"
      @click="unableToNotify"
    >
      <svg width="16" height="16">
        <path
          d="M5.164 14H15c-1.5-1-2-5.902-2-7 0-.264-.02-.523-.06-.776L5.164 14zm6.288-10.617A4.988 4.988 0 0 0 8.995 2.1a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 7c0 .898-.335 4.342-1.278 6.113l9.73-9.73zM10 15a2 2 0 1 1-4 0h4zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75L.625 15.625z"
        />
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visit: this.params.data,
    };
  },
  methods: {
    unableToNotify: () => swal("Unable to Notify, Entry Requirements not met."),

    notifyHost() {
      swal(`Notify ${this.visit.hostName}?`, {
        buttons: ["Cancel", "Yes"],
      }).then((isConfirm) => {
        if (isConfirm) this.$store.dispatch("notifyHost", this.visit.id);
      });
    },

    markCollected() {
      swal(
        `Mark ${this.visit.firstName} ${this.visit.lastName} as Collected?`,
        {
          buttons: ["Cancel", "Ok"],
        }
      ).then((isConfirm) => {
        if (isConfirm) this.$store.dispatch("handleCollect", this.visit.id);
      });
    },
  },
};
</script>
