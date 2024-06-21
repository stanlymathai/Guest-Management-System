<template>
  <div id="app" class="col-md-12">
    <div class="bg-light">
      <Header v-if="$route.meta.requiresAuth && !$route.meta.isVisitor" />
      <Sidebar v-if="$route.meta.requiresAuth && !$route.meta.isVisitor" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/Sidebar.vue";

export default {
  name: "app",
  components: {
    Header,
    Sidebar,
  },
  created() {
    this.$store.dispatch("tryAutoLogin");
  },
};
</script>
