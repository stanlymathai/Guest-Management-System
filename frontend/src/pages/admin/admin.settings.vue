<template>
  <section class="pt-80">
    <div class="container-fluid">
      <div class="col-md-12 bg-white rounded-20 has-db-shadow min-vh-75 p-4">
        <div class="row fade_in">
          <div class="col-md-2">
            <ul class="p-4 mt-4">
              <nav class="nav">
                <div class="nav_list">
                  <span v-for="(module, value) in modules" :key="value">
                    <button
                      @click="selectedModule = value"
                      :class="{ active: value == selectedModule }"
                      style="grid-template-columns: max-content max-content"
                      class="d-grid gap-2 btn btn-primary mt-4 p-2 w-100 align-items-center"
                    >
                      <i :class="`fs-5 bx bx-${module.icon}`"></i>
                      <span class="lead fs-6">{{ value }}</span>
                    </button>
                  </span>
                </div>
              </nav>
            </ul>
          </div>
          <div class="col-md-10">
            <InvitationForm
              v-if="selectedModule == 'Invitations'"
              class="mt-4"
            />
            <NotificationForm
              v-if="selectedModule == 'Notifications'"
              class="lh-1"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import NotificationForm from "../../forms/NotificationForm";
import InvitationForm from "../../forms/InvitationForm";

export default {
  components: {
    NotificationForm,
    InvitationForm,
  },
  data() {
    return {
      modules: {
        Notifications: {
          icon: "notification",
        },
        Invitations: {
          icon: "mail-send",
        },
      },
      selectedModule: "Notifications",
    };
  },
};
</script>
