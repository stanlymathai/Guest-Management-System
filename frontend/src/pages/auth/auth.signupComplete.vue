<template>
  <div>
    <section class="bg-secondary pt-10 min-vh-100">
      <div class="container">
        <div class="row justify-content-md-center min-vh-100">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-5 col-lg-6">
                <div class="reg-form-left">
                  <img
                    class="mt-0 mt-md-4 w-75 mb-3"
                    src="../../assets/images/my_tag-logo.png"
                    alt=""
                    width="80%"
                  />
                  <div class="text-dark-blue">
                    <h3 class=" ">One easy to use system!</h3>
                    <ul class="fs-6">
                      <li class="mb-2">
                        Track who is coming in and out of your site
                      </li>
                      <li class="mb-2">
                        Invite guests via email with a few clicks!
                      </li>
                      <li class="mb-2">Schedule appointments</li>
                      <li class="mb-2">Paperless logging</li>
                      <li class="mb-2">
                        Ensure risk assessments have been completed before
                        visits
                      </li>
                      <li class="mb-2">
                        Full dashboard overview of upcoming visits
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-7 col-lg-6 px-4 justify-content-center">
                <div class="w-100">
                  <div class="row my-4">
                    <div class="card login-form w-100 rounded-20">
                      <div class="card-body text-dark-blue">
                        <h4 class="h4 mb-3">
                          Thank you for creating an account
                        </h4>
                        <p v-if="email != null">
                          Shortly you will receive an email confirmation to
                          <strong>{{ this.email }}</strong>
                        </p>
                        <h4 class="h4 mb-3">Didn't receive an email?</h4>
                        <p>Let's Check a few things.</p>
                        <ol>
                          <li>
                            Is your email address correct?
                            <i
                              ><b>{{ this.email }}</b></i
                            >. If not, please sign up again to get started.
                          </li>
                          <li>
                            Check your spam! Sometimes email get lost along the
                            way, be sure to check "not spam" so we can contact
                            you in the future.
                          </li>
                        </ol>
                        <div class="mb-3">
                          <a
                            class="btn btn-info fs-13"
                            href="mailto:help@backoffice.io"
                            ><b> Still no email?</b> Contact us at
                            help@backoffice.io and we'll be happy to help!</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
  data() {
    return {
      email: this.$route.params.email,
    };
  },
};
</script>
