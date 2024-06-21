<template>
  <div>
    <section class="bg-secondary min-vh-100">
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
                  />
                  <div class="text-dark-blue">
                    <h3 class=" ">One easy to use system!</h3>
                    <ul class="fs-6">
                      <span
                        v-for="(item, index) in [
                          'Track who is coming in and out of your site',
                          'Invite guests via email with a few clicks!',
                          'Schedule appointments',
                          'Paperless logging',
                          'Ensure risk assessments have been completed before visits',
                          'Full dashboard overview of upcoming visits',
                        ]"
                        :key="index"
                      >
                        <li class="mb-2">{{ item }}</li>
                      </span>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-7 col-lg-6 px-4 justify-content-center">
                <div class="row fade_in my-4">
                  <div class="card login-form w-100 rounded-20">
                    <Form @submit="onSubmit" v-slot="{ errors }">
                      <div class="card-body">
                        <h4 class="h4 mb-3 text-dark-blue">Sign Up</h4>
                        <InputField
                          class="mb-3"
                          name="name"
                          rules="name"
                          :error="errors.name"
                          :model="username"
                          label="First and Last Name"
                          @event="username = $event"
                        />
                        <InputField
                          class="mb-3"
                          name="organization"
                          :model="user.organization"
                          :error="errors.organization"
                          label="Organisation Name"
                          @event="user.organization = $event"
                        />
                        <InputField
                          class="mb-3"
                          name="email"
                          rules="email"
                          :model="user.email"
                          :error="errors.email"
                          label="Work Email"
                          @event="user.email = $event"
                        />
                        <InputField
                          class="mb-3"
                          name="phone"
                          rules="phone"
                          :model="user.phone"
                          :error="errors.phone"
                          @event="user.phone = $event"
                          label="Mobile Phone Number"
                        />
                        <input
                          readonly
                          type="text"
                          value="United Kingdom"
                          class="form-control bg-white mb-3"
                        />
                        <div class="row">
                          <div class="col-md-6 mb-3">
                            <InputField
                              type="password"
                              name="password"
                              :model="user.password"
                              label="Password"
                              :error="errors.password"
                              @event="user.password = $event"
                            />
                          </div>
                          <div class="col-md-6 mb-3">
                            <InputField
                              type="password"
                              name="passwordConfirm"
                              :model="confirmPassword"
                              placeholder="Confirm Password"
                              :error="errors.passwordConfirm"
                              @event="confirmPassword = $event"
                              rules="required|confirmed:password"
                            />
                          </div>
                        </div>
                        <InputField
                          class="mb-3"
                          name="registrationCode"
                          :model="user.registrationCode"
                          :error="errors.registrationCode"
                          label="Registration Code"
                          @event="user.registrationCode = $event"
                        />
                        <div class="form-check mb-3">
                          <Field
                            name="terms"
                            :value="true"
                            type="checkbox"
                            v-model="terms"
                            rules="checkBox"
                            class="form-check-input"
                            :unchecked-value="false"
                            :class="{ 'is-invalid': errors.terms && !terms }"
                          />
                          <label class="form-check-label fs-13 font-green">
                            By Signing up to backoffice MyGuest you agree to our
                            <a
                              class="link"
                              target="_blank"
                              href="https://s3-eu-west-1.amazonaws.com/static.backoffice.io/backoffice/legal/backoffice_Terms_of_Use_current.pdf"
                              >terms of service</a
                            >
                          </label>
                        </div>
                        <div class="d-md-flex justify-content-md-center mb-3">
                          <a
                            class="btn btn-secondary fs-13 col-12 col-md-10"
                            href="mailto:help@backoffice.io?subject=Can I have a MyGuest account"
                          >
                            Need a hand? Contact us at help@backoffice.io
                          </a>
                        </div>
                        <div class="d-md-flex justify-content-md-center mb-3">
                          <button
                            type="submit"
                            :disabled="loading"
                            class="btn btn-primary btn-sm col-12 col-md-6"
                          >
                            Create Account
                          </button>
                        </div>
                        <h6 class="text-center">
                          Already have an account?
                          <a class="" href="/login">Sign In</a>
                        </h6>
                      </div>
                    </Form>
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
import InputField from '../../components/common/InputField.vue';
import { Form, Field } from 'vee-validate';

export default {
  components: { InputField, Field, Form },

  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        roleId: 1,
        countryId: 1,
        password: '',
        organization: '',
        registrationCode: '',
      },
      username: '',
      confirmPassword: '',
      loading: false,
      terms: false,
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;

      let name = this.username;
      let parts = name.split(' ');
      this.user.firstName = parts.shift();
      this.user.lastName = parts.join(' ');

      this.$store
        .dispatch('signup', { ...this.user })
        .then((res) => {
          if (res.error) {
            swal(res.error);
            this.loading = false;
            return;
          }
          this.$router.push({
            name: 'SignupComplete',
            params: { email: this.user.email },
          });
        })
        .catch((e) => {
          if (e) {
            swal('', e[0].message, 'error');
            this.loading = false;
          }
        });
    },
  },
};
</script>
