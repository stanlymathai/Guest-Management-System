<template>
  <div>
    <section class="bg-activation min-vh-100"></section>
  </div>
</template>
<script>
import { HTTP } from "../../../config/axios.js";

export default {
  mounted() {
    HTTP.post("/api/sign-up-confirm", { token: this.$route.query.token })
      .then((response) => {
        if (response.data.message)
          return swal("", response.data.message, "error").then(() =>
            window.close()
          );

        swal(
          "",
          `Your account with email id ${response.data.email}
            has been activated. Press OK to login.`,
          "success"
        ).then(() => {
          this.$router.replace("/login");
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
