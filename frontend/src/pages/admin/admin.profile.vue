<template>
  <section class="pt-80">
    <div class="container-fluid">
      <div
        class="col-md-12 bg-white rounded-20 has-db-shadow p-4 mb-4 min-vh-75"
      >
        <div class="pt-5 fade_in">
          <div class="d-flex justify-content-center">
            <div class="col-xl-6 col-md-7">
              <div class="card user-card-full">
                <div class="row">
                  <div class="col-sm-4 bg-login">
                    <div class="text-center text-white p-3">
                      <div class="mb-3 mt-3">
                        <svg
                          width="75px"
                          height="75px"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                            stroke="#36454F"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"
                            stroke="#36454F"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                            stroke="#36454F"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <h6 class="weight600 text-white">
                        {{ user.name }}
                      </h6>
                      <p>{{ user.organization }}</p>
                      <div class="row">
                        <button
                          type="button"
                          @click="showPasswordForm = true"
                          class="btn btn-sm btn-info rounded-20 mt-2"
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="p-4">
                      <div class="row">
                        <div class="mb-2">
                          <p class="weight600">Email</p>
                          <h6 class="text-muted weight400">
                            {{ user.email }}
                          </h6>
                        </div>
                        <div class="mb-2">
                          <p class="weight600">Phone</p>
                          <h6 class="text-muted weight400">
                            {{ user.phone }}
                          </h6>
                        </div>

                        <div class="mb-2">
                          <p class="weight600">Role</p>
                          <h6 class="text-muted weight400">
                            {{ user.role == 1 ? "User" : "Host" }}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PasswordForm
              v-if="showPasswordForm"
              :userEmail="user.email"
              @close="showPasswordForm = false"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import PasswordForm from "../../forms/PasswordForm.vue";

export default {
  components: { PasswordForm },
  computed: {
    user() {
      return this.$store.getters.User;
    },
  },
  data() {
    return {
      showPasswordForm: false,
    };
  },
};
</script>
