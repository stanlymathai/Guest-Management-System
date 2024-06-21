<template>
  <div>
    <section class="bg-primary h-vh-20"></section>
    <section class="bg-login position-relative min-vh-80">
      <div class="container">
        <div class="row justify-content-center position-relative">
          <div class="col-md-12 position-relative top-50n">
            <div class="row justify-content-center fade_in">
              <div class="col-lg-7 position-relative rounded bg-body p-5">
                <div class="row ms-5">
                  <img class="w-75" src="../../assets/images/my_tag-logo.png" />
                </div>
                <hr />
                <div class="text-dark-blue text-center">
                  <h5 v-if="visitStatus == 'denied'">
                    Thank you for your response.
                  </h5>
                  <h5 v-else-if="visitStatus == 'deniedByAdmin'">
                    Your Appointment has been denied.
                  </h5>
                  <h5 v-if="visitStatus == 'visitExpired'">
                    This visit has expired.
                  </h5>
                  <h5 v-if="visitStatus == 'alreadyResponded'">
                    You have already responded to this visit.
                  </h5>
                  <p>
                    If you wish to rebook an appointment, please contact your
                    host.
                  </p>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    visitStatus: {
      type: String,
      required: true,
    },
  },
};
</script>
