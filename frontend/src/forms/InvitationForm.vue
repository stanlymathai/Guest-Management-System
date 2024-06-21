<template>
  <div class="row fade_in small p-3">
    <div v-if="$route.name == 'Setup'">
      <h2 class="fs-2 text-primary weight400 mb-0">Your Invitations</h2>
      <p class="form-label">
        <small class="text-dark ms-2">
          Here you can customise the invitations that will go out to your
          Visitors!
        </small>
      </p>
    </div>
    <div class="col-md-7">
      <div class="p-2">
        <label class="text-primary form-label fs-6">Company Logo</label>
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          @input="setClientLogo"
          class="form-control mb-2 text-dark"
        />
      </div>
      <div class="p-1">
        <sup
          class="text-primary form-label fs-6"
          title="This will help visitors find you better. Give clear and concise instructions such as local transport links and landmarks."
          >Directions <b>?</b></sup
        >

        <textarea
          type="textarea"
          placeholder="Type here..."
          class="form-control lh-sm"
          v-model="Invitations.locationDirections"
        />
      </div>
      <div class="p-1">
        <label class="text-primary form-label fs-6"
          >Location Contact Number</label
        >

        <input
          type="number"
          placeholder="Enter here"
          class="form-control mb-2"
          v-model="Invitations.locationNumber"
        />
      </div>
      <div class="mb-2 p-1">
        <sup
          class="text-primary form-label fs-6"
          title="This may include safety procedures or rules for visitors on location. This will appear as small text at the bottom of your invitation."
          >Additional Text <b>?</b></sup
        >
        <textarea
          type="textarea"
          placeholder="Type here..."
          class="form-control lh-sm"
          v-model="Invitations.locationText"
        />
      </div>
    </div>
    <div
      class="col-md-4 ms-4"
      style="grid-template-columns: max-content max-content"
    >
      <div class="mb-2 cursor_pointer" @click="this.$refs.fileInput.click()">
        <label class="text-dark lead fs-6 mb-2">Logo Preview</label>
        <img
          v-if="!Invitations.selectedImage"
          src="../../src/assets/images/Placeholder.jpg"
          class="w-75 rounded"
        />
        <img
          v-else
          :src="Invitations.selectedImage"
          class="img-fluid rounded"
        />
      </div>
    </div>
    <div v-if="$route.name == 'Setup'" class="text-end">
      <button
        class="btn btn-sm btn-primary me-3"
        type="button"
        @click="() => this.$router.push('/')"
      >
        Skip For Now
      </button>
      <button class="btn btn-sm btn-primary me-3" @click="submit">
        Confirm Invitations
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Invitations: {
        selectedImage: "",
        locationText: "",
        locationDirections: "",
        locationNumber: "",
      },
    };
  },
  methods: {
    submit() {
      let formData = new FormData();
      formData.append("logo", this.Invitations.companyLogo ?? "");
      formData.append("contact", this.Invitations.locationNumber ?? "");
      formData.append("directions", this.Invitations.locationDirections ?? "");
      formData.append("additionalText", this.Invitations.additionalText ?? "");
      // this.addInvitaionEmail(formData);
    },
    setClientLogo() {
      let input = this.$refs.fileInput;
      if (!input.files[0].type.match(/image.*/)) {
        swal("", "Selected file is not an image", "error");
        return;
      }
      if (input.files[0].size > 1000000) {
        swal("", "The image size should be less than 1 MB.", "error");
        return;
      }
      let file = input.files;
      let reader = new FileReader();
      reader.onload = (e) => {
        let img = document.createElement("img");
        img.onload = () => {
          let canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          // preprocess image
          let MAX_WIDTH = 450;
          let MAX_HEIGHT = 1;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          this.Invitations.selectedImage = canvas.toDataURL("image/png");
        };
        img.src = e.target.result;
      };
      if (reader.readAsDataURL) {
        reader.readAsDataURL(file[0]);
      } else if (reader.readAsDataurl) {
        readAsDataurl(file[0]);
      }
      this.$emit("input", file[0]);
    },
  },
};
</script>
