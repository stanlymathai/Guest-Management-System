<template>
  <div class="container-fluid">
    <nav class="fixed-top nav-bg">
      <div class="row">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row ms-4">
            <button
              type="button"
              class="svg-button"
              title="Menu"
              @click="handleClick()"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <button
              class="svg-button"
              type="button"
              @click="handleClick('/')"
              title="Home"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>
            <button
              class="svg-button"
              type="button"
              @click="handleClick('calendar')"
              title="Calendar"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </button>
            <button
              class="svg-button"
              type="button"
              title="Self Register"
              @click="handleClick('self-register')"
              v-if="$store.getters.isLocationManager"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </button>
          </div>
          <div class="d-flex flex-row-reverse">
            <a class="navbar-brand" href="/">
              <img
                width="180"
                src="../../assets/images/my_tag-logo.png"
                alt="logo"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(route) {
      if (route) {
        this.$router.replace(route);
        if (this.$store.getters.showSideBar) this.handleClick();
      } else this.$store.dispatch("toggleSideBar");
    },
  },
};
</script>
