<template>
  <section class="pt-80">
    <div class="container-fluid">
      <div class="col-md-12 bg-white rounded-20 has-db-shadow p-4 mb-4">
        <div class="row fade_in">
          <div class="col-md-3 mb-2">
            <div class="bg-info p-2 rounded">
              <span class="lead fs-6 ms-2">Account Setup Steps</span>
              <ol class="small text-dark">
                <small
                  v-for="(item, index) in [
                    'Add your first location',
                    'Customise your invitations',
                    'Set your notification preferences',
                  ]"
                  :key="index"
                >
                  <li
                    :class="{
                      'text-decoration-line-through':
                        (index == 0 && Module == 'Location') ||
                        (index <= 1 && Module == 'Invitation') ||
                        (index <= 2 && Module == 'Notification'),
                    }"
                  >
                    {{ item }}.
                  </li>
                </small>
              </ol>
            </div>
          </div>

          <div class="col-md-9">
            <div class="d-md-flex justify-content-md-end mb-3">
              <div class="bg-info bg-gradient rounded p-2">
                <span class="fs-6 text-dark me-2">
                  {{
                    Module != 'Notification'
                      ? 'Lets get started! Complete the following steps to set up your account'
                      : 'Nearly done! Complete this last step to set up your account.'
                  }}
                </span>
              </div>
            </div>
            <div class="col-md-12 bg-gradient rounded-20 has-db-shadow lh-1">
              <FirstLocationForm v-if="Module == 'Location'" />
              <NotificationForm v-if="Module == 'Notification'" />
              <InvitationForm v-if="Module == 'Invitation'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import FirstLocationForm from '../../forms/FirstLocationForm';
import NotificationForm from '../../forms/NotificationForm';
import InvitationForm from '../../forms/InvitationForm';

export default {
  components: {
    FirstLocationForm,
    NotificationForm,
    InvitationForm,
  },
  computed: {
    Module() {
      if (!this.$store.getters.locations.length) {
        return 'Location';
        // } else if (!this.$store.getters.User.hasEntryInInvitations) { //Hide temporary still live release. GMS1-7
        //   return "Invitation";
        // } else if (!this.$store.getters.User.hasEntryInNotifications) {
        //   return "Notification";
      } else this.$router.replace('/');
    },
  },
};
</script>
