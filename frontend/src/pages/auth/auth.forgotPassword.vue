<template>
  <div>
    <section class="bg-primary h-vh-20" />
    <section class="bg-login position-relative min-vh-80">
      <div class="container">
        <div class="row justify-content-center position-relative">
          <div class="col-md-12 position-relative top-50n">
            <div class="row justify-content-center fade_in">
              <div class="col-lg-7 position-relative rounded bg-white p-5">
                <div class="row">
                  <img
                    src="../../assets/images/my_tag-logo.png"
                    class="w-50 mx-auto"
                  />
                </div>
                <Loader v-if="loading" />

                <div v-else class="form-group mx-auto mb-2 mt-4">
                  <form @submit.prevent="submitEmail" v-if="mode == 'email'">
                    <div class="row fade_in">
                      <label class="form-label">Enter email address</label>
                      <input
                        required
                        type="email"
                        v-model="email"
                        class="form-control"
                        @change="invalidEmail = false"
                        placeholder="username@domain.com"
                        oninput="this.setCustomValidity('')"
                        :class="{ 'is-invalid': invalidEmail }"
                        oninvalid="this.setCustomValidity('This field must be a valid email')"
                      />
                      <span class="text-danger small" v-if="invalidEmail">
                        Couldn't find your MyGuest Account.
                      </span>
                    </div>
                    <div class="row mb-2 mt-2 text-start">
                      <button class="btn btn-primary" type="submit">
                        Request Reset Link
                      </button>
                    </div>
                  </form>
                  <form @submit.prevent="submitOTP" v-else-if="mode == 'otp'">
                    <div class="col-md-8 mx-auto fade_in">
                      <label class="form-label"
                        >Enter the 6 digit code we sent you via email.</label
                      >

                      <div class="row input-group mb-2">
                        <input
                          required
                          v-model="otp"
                          minlength="6"
                          pattern="[0-9]+"
                          autocomplete="off"
                          placeholder="_ _ _ _ _ _"
                          @change="invalidOTP = true"
                          title="Format: Numeric values only"
                          oninput="this.setCustomValidity('')"
                          :class="{ 'is-invalid': invalidOTP }"
                          class="form-control text-center mb-2 p-2"
                          oninvalid="this.setCustomValidity('Invalid OTP')"
                        />
                        <div class="row mb-2 mt-2 text-start">
                          <button class="btn btn-primary" type="submit">
                            Submit Passcode
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="row text-center mt-3">
                  <router-link to="/login" class="text-decoration-none"
                    >Back To Login
                  </router-link>
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
import Loader from '../../components/layout/Loader';
import { HTTP } from '../../../config/axios.js';

export default {
  components: { Loader },

  data() {
    return {
      otp: '',
      email: '',
      mode: 'email',
      invalidOTP: '',
      invalidEmail: false,
      loading: false,
    };
  },

  methods: {
    submitEmail() {
      this.loading = true;
      HTTP.post('/api/forgot-password', { email: this.email })
        .then((response) => {
          this.loading = false;
          if (response.data.error) {
            this.invalidOTP = true;
            this.$store.dispatch('handleError', response.data.error);
          } else {
            if (response.data.message) {
              swal(response.data.message);
              this.mode = 'otp';
            }
          }
        })
        .catch((e) => console.log(e));
    },
    submitOTP() {
      this.loading = true;
      HTTP.post('/api/verify-otp', { email: this.email, otp: this.otp })
        .then((response) => {
          this.loading = false;
          if (response.data.error) {
            this.invalidOTP = true;
            this.$store.dispatch('handleError', response.data.error);
          } else {
            if (response.data.token)
              this.$router.replace(
                `/reset-password?token=${response.data.token}`
              );
          }
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
