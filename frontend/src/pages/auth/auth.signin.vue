<template>
  <div>
    <section class="bg-primary h-vh-20"></section>
    <section class="bg-login position-relative min-vh-80">
      <div class="container">
        <div class="row justify-content-md-cente position-relative">
          <div class="col-md-12 position-absolute top-50n">
            <div class="row">
              <div class="col-md-5 col-lg-6 my-4 text-center pt-md-5 pt-0">
                <img
                  class="w-75 mt-5 mb-2"
                  src="../../assets/images/my_tag-logo.png"
                  alt=""
                />
              </div>
              <div class="col-md-7 col-lg-6 px-4 justify-content-center">
                <div class="row fade_in">
                  <Form @submit="onSubmit" v-slot="{ errors }">
                    <div class="card login-form w-100">
                      <div class="card-body">
                        <div class="mb-2">
                          <label class="form-label">Email Address</label>
                          <InputField
                            name="email"
                            rules="email"
                            :model="email"
                            @event="email = $event"
                            placeholder="mail@domain.com"
                            @change="invalidMessage.email = ''"
                            :error="errors.email || invalidMessage.email"
                          />
                        </div>
                        <div class="mb-2">
                          <label class="form-label">Password</label>
                          <InputField
                            name="password"
                            type="password"
                            :model="password"
                            @event="password = $event"
                            placeholder="****************"
                            @change="invalidMessage.password = ''"
                            :error="errors.password || invalidMessage.password"
                          />
                        </div>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" />
                          <label class="form-check-label"> Remember me </label>
                        </div>
                        <div class="d-md-flex justify-content-md-end">
                          <button
                            class="btn btn-primary btn-sm col-12 col-md-6"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </div>
                      <div class="card-footer bg-transparent">
                        <router-link to="/signup" class="fs-13"
                          >New around here? Sign Up</router-link
                        >
                        <div class="row mt-md-3 mt-sm-2 mt-2 mb-3">
                          <div class="col-md-4 col-lg-4 col-12 mb-2 pe-0">
                            <router-link class="fs-13" to="/forgot_password"
                              >Forgot Password</router-link
                            >
                          </div>
                          <div
                            class="col-md-8 col-lg-8 col-12 d-md-flex justify-content-md-end"
                          >
                            <a
                              class="btn btn-secondary fs-13 w-100"
                              href="mailto:help@backoffice.io"
                              >Need a hand? Contact us at help@backoffice.io</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
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
import InputField from '../../components/common/InputField.vue';
import { Form } from 'vee-validate';

export default {
  components: { InputField, Form },

  data() {
    return {
      email: '',
      password: '',
      invalidMessage: {
        email: '',
        password: '',
      },
    };
  },
  created() {
    this.$store.dispatch('logout');
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch('login', {
          email: formData.email,
          password: formData.password,
        })
        .then(() => this.$router.push('/'))
        .catch((err) => (this.invalidMessage = err));
    },
  },
};
</script>
