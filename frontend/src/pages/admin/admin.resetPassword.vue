<template>
  <div>
    <section class="bg-primary h-vh-20" />
    <section class="bg-login position-relative min-vh-80">
      <div class="container">
        <div class="row justify-content-md-cente position-relative">
          <div class="col-md-12 position-absolute top-50n">
            <Loader class="pt-80" v-if="loading" />

            <div v-else class="row">
              <div class="col-md-5 col-lg-6 my-4 text-center pt-md-5 pt-0">
                <img
                  class="w-75 mt-5 mb-2"
                  src="../../assets/images/my_tag-logo.png"
                  alt="logo"
                />
              </div>
              <div class="col-md-7 col-lg-6 px-4 justify-content-center">
                <div class="row fade_in">
                  <form @submit.prevent="onSubmit">
                    <div class="card p-3">
                      <div class="card-header border-0 bg-transparent">
                        <span class="lead ms-3 text-primary"
                          >Set Your Password</span
                        >
                        <label class="small text-dark ms-3">
                          Strong passwords include numbers, letters/special
                          characters.
                        </label>
                      </div>

                      <div class="card-body" style="margin-top: -10px">
                        <div class="me-3 ms-3 mb-3">
                          <label class="form-label mb-0">Password</label>

                          <input
                            required
                            type="password"
                            v-model="password"
                            class="form-control"
                            autocomplete="new-password"
                            placeholder="Enter password"
                            :class="{
                              ' border-danger':
                                message.password && password == confirmPassword,
                            }"
                          />
                          <PasswordBar
                            class="p-1"
                            :password="password"
                            v-if="password"
                          />
                          <p v-if="password == confirmPassword">
                            <small class="text-danger">
                              {{ message.password }}</small
                            >
                          </p>
                        </div>
                        <div class="ms-3 me-3 mb-3">
                          <label class="form-label">Confirm Password</label>
                          <input
                            required
                            type="password"
                            v-model="confirmPassword"
                            class="form-control"
                            placeholder="**********************"
                            :class="{
                              'border-danger': message.confirmPassword,
                            }"
                          />
                          <p v-if="message.confirmPassword">
                            <small class="text-danger">
                              {{ message.confirmPassword }}</small
                            >
                          </p>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                          <button
                            class="btn btn-primary col-md-6"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
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
import PasswordBar from "../../components/common/PasswordBar.vue";
import Loader from "../../components/layout/Loader";

import { HTTP } from "../../../config/axios.js";
export default {
  components: {
    PasswordBar,
    Loader,
  },
  created() {
    this.verifyToken();
  },
  computed: {
    message() {
      let passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return {
        ...(this.password &&
          !passwordRegex.test(this.password) && {
            password:
              "Please choose a strong password. Try a mix of letters, numbers and symbols.",
          }),
        ...(this.password &&
          this.confirmPassword &&
          this.password != this.confirmPassword && {
            confirmPassword: "The passcode must match.",
          }),
      };
    },
  },
  data() {
    return {
      loading: false,
      password: "",
      confirmPassword: "",
      token: this.$route.query.token,
    };
  },
  methods: {
    onSubmit() {
      if (this.message.password || this.message.confirmPassword) return;

      this.loading = true;

      HTTP.post("/api/reset-password", {
        token: this.token,
        password: this.password,
      })
        .then((response) => {
          this.loading = false;

          if (response.data.error) {
            this.$store.dispatch("handleError", response.data.error);
          } else if (response.data.message) {
            swal(response.data.message).then(() =>
              this.$router.replace("Login")
            );
          }
        })
        .catch((err) => this.$store.dispatch("handleError", err));
    },
    verifyToken() {
      this.loading = true;
      HTTP.post("/api/verify-token", { token: this.token })
        .then((response) => {
          this.loading = false;

          if (!response.data.id)
            swal("", "Invalid Token.", "error").then(() =>
              this.$router.replace("Login")
            );
        })
        .catch(() =>
          swal(
            "",
            "This password reset token has expired or is invalid.",
            "error"
          ).then(() => this.$router.replace("Login"))
        );
    },
  },
};
</script>
