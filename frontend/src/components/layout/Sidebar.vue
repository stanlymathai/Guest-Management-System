<template>
  <div
    class="sidebar bg-light pt-100 min-vh-100"
    :class="{ open: $store.getters.showSideBar }"
  >
    <div class="sidebar_main">
      <ul class="nav-list" style="overflow: visible">
        <span v-for="(item, index) in menuItems" :key="index">
          <li v-if="!item.hide" class="mt-0 mb-0">
            <router-link :to="{ name: item.name }" class="lh-sm router_link">
              <i class="bx" :class="item.icon || 'bx-square-rounded'" />
              <span class="sidebar_menu_name">{{ item.name }}</span>
            </router-link>
          </li>
        </span>
        <span>
          <br />
        </span>
        <span v-for="(item, index) in footerItems" :key="index">
          <li class="mt-0 mb-0">
            <span
              @click="handleFooterItemClick(item.name)"
              class="router_link cursor_pointer"
            >
              <i class="bx" :class="item.icon || 'bx-square-rounded'" />
              <span class="sidebar_menu_name">{{ item.name }}</span>
            </span>
          </li>
        </span>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    window.document.body.style.paddingLeft = '80px';
  },
  data() {
    return {
      menuItems: [
        {
          name: 'Users',
          icon: 'bx-group',
          hide: !this.$store.getters.isLocationManager,
        },
        {
          name: 'Locations',
          icon: 'bx-map',
        },
        {
          name: 'Reports',
          icon: 'bx-bar-chart-alt',
        },
        // {// hide temporary still live release. GMS1-44
        //   name: "Settings",
        //   icon: "bx-cog",
        //   hide: !this.$store.getters.isLocationManager,
        // },
        {
          name: 'Help',
          icon: 'bx-help-circle',
        },
        // { // me too!
        //   name: "Evacuation",
        //   icon: "bx-error-alt",
        // },
      ],

      footerItems: [
        {
          name: 'Profile',
          icon: 'bx-user',
        },
        {
          name: 'Logout',
          icon: 'bx-log-out',
        },
      ],
    };
  },
  methods: {
    handleFooterItemClick(name) {
      if (name == 'Logout') {
        let that = this;
        swal('Are you sure you want to log out?', {
          buttons: ['Cancel', 'Log Out'],
        }).then(function (isConfirm) {
          if (isConfirm) that.$router.replace({ name: 'Login' });
        });
      } else this.$router.push({ name });
    },
  },
  unmounted() {
    window.document.body.style.paddingLeft = '0';
  },
};
</script>

<style>
@import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');

body {
  transition: all 0.5s ease;
}
</style>
