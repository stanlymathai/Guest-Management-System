<template>
  <div class="form_modal fade_in">
    <div class="modal-dialog modal-dialog-centered modal">
      <div class="modal-content">
        <div class="container">
          <form @submit.prevent="onSubmit">
            <div class="col-md-12 bg-white p-4">
              <Loader v-if="loading" />
              <div v-else class="row dashboard-form">
                <h2 class="fs-2 text-primary weight400">Change Password</h2>
                <div class="mb-3 text-start">
                  <input
                    required
                    type="password"
                    class="form-control"
                    placeholder="Type your current password"
                    v-model="currentPassword"
                    @change="checkPassword"
                  />
                  <small
                    class="text-danger"
                    v-if="incorrectPassword && currentPassword != ''"
                  >
                    Incorrect Password.</small
                  >
                </div>
                <div class="mb-2 text-start">
                  <input
                    required
                    type="password"
                    placeholder="Type your new password"
                    v-model="password"
                    autocomplete="new-password"
                    class="form-control"
                    @change="invalidPasswordMessage = ''"
                  />
                  <p v-if="invalidPasswordMessage != ''">
                    <small class="text-danger">
                      {{ invalidPasswordMessage }}</small
                    >
                  </p>
                  <div v-else class="p-1">
                    <PasswordBar :password="password" v-if="password != ''" />
                  </div>
                </div>
                <div v-if="!loading" class="d-md-flex justify-content-md-end">
                  <button
                    class="btn btn-sm btn-danger col-12 col-md-2 mt-2"
                    type="button"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-sm btn-primary ms-md-2 ms-0 col-12 col-md-2 mt-2"
                    type="submit"
                    :disabled="isDisabled"
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
</template>
<script>
import PasswordBar from "../components/common/PasswordBar.vue";
import Loader from "../components/layout/Loader";
import { HTTP } from "../../config/axios.js";

export default {
  components: { PasswordBar, Loader },

  props: {
    userEmail: String,
  },
  data() {
    return {
      headers: this.$store.getters.headers,
      currentPassword: "",
      incorrectPassword: false,
      password: "",
      invalidPasswordMessage: "",
      loading: false,
      isDisabled: false,
    };
  },
  methods: {
    checkPassword() {
      this.isDisabled = true;
      this.$store
        .dispatch("checkPassword", {
          email: this.userEmail,
          password: this.currentPassword,
        })
        .then(() => (this.incorrectPassword = false))
        .catch(() => (this.incorrectPassword = true));
      this.isDisabled = false;
    },
    onSubmit() {
      this.checkPassword();
      if (this.incorrectPassword) return;
      if (this.currentPassword == this.password) {
        this.invalidPasswordMessage =
          "Your new password must be different from your previous password.";
        return;
      }
      let passwordCheck =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (this.password !== "" && !passwordCheck.test(this.password)) {
        this.invalidPasswordMessage =
          "Please choose a stronger password. Try a mix of letters, numbers and symbols.";
        return;
      }
      this.changePassword();
    },
    changePassword() {
      this.loading = true;
      HTTP.put(
        "/api/user/edit-user-password",
        { password: this.password },
        {
          headers: this.headers,
        }
      ).then((response) => {
        this.loading = false;
        if (response.data) {
          swal("Password changed successfully").then(() => this.closeModal());
        }
      });
    },

    closeModal() {
      this.loading = false;
      this.isDisabled = false;
      this.incorrectPassword = false;
      this.password = "";
      this.currentPassword = "";
      this.invalidPasswordMessage = "";
      this.$emit("close");
    },
  },
};
</script>
