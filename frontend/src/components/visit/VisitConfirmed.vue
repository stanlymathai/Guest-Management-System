<template>
  <section class="bg-secondary min-vh-100">
    <div class="container">
      <div class="row fade_in">
        <div class="col-md-3 py-3 px-0">
          <img src="../../assets/images/my_tag-logo.png" alt="" class="w-100" />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-md-12 p-1 bg-white rounded-20 has-db-shadow p-3 text-center text-dark-blue"
        >
          <img src="../../assets/images/my_tag-logo-icon_mail.png" alt="" />
          <h1 class="fs-2 mt-4 weight600">
            Your appointment at {{ visit.organization }} has been confirmed!
          </h1>
          <h4 class="fs-3 mb-1">
            {{ visit.visitorName }} to meet {{ visit.hostName }} at
            {{ visit.time.from }} on {{ visit.visitDate }}
          </h4>
          <span class="fs-5"
            >{{ visit.location }}, {{ visit.physicalAddress }}</span
          >
          <p class="fs-5 mt-2">
            Your appointment details and QR code pass will arrive via email
            shortly
          </p>
          <h4 class="fs-5"><strong>See you Soon!</strong></h4>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    visit: {
      type: Object,
      required: true,
      default: {},
    },
  },
};
</script>
