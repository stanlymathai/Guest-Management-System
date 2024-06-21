<template>
  <section class="bg-secondary min-vh-100">
    <div class="container">
      <div class="row fade_in">
        <div class="col-md-3 py-3 px-0">
          <img src="../../assets/images/my_tag-logo.png" alt="" class="w-100" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 bg-white rounded-20 has-db-shadow mb-5 p-4">
          <div class="row min-vh-50">
            <div class="col-md-12">
              <div class="row dashboard-form">
                <h3 class="fs-2 text-dark-blue text-center">
                  {{ visit.organization }} has invited you to
                  {{ visit.location }}!
                </h3>

                <h2 class="fs-3 text-dark-blue weight400">Check in</h2>
                <div class="col-md-6 mb-4">
                  <h4 class="fs-4 text-dark-blue">
                    Please confirm your details
                  </h4>
                  <div class="table-responsive">
                    <table
                      class="table fs-5 weight400 text-primary table-borderless"
                    >
                      <tbody>
                        <tr>
                          <td width="36%">Name</td>
                          <td width="2%">:</td>
                          <td class="text-start">{{ visit.visitorName }}</td>
                        </tr>
                        <tr>
                          <td>Date</td>
                          <td width="2%">:</td>
                          <td class="text-start">{{ visit.visitDate }}</td>
                        </tr>
                        <tr>
                          <td>Arrival</td>
                          <td width="2%">:</td>
                          <td class="text-start">
                            {{ visit.time.from }}
                          </td>
                        </tr>
                        <tr>
                          <td>Departure</td>
                          <td width="2%">:</td>
                          <td class="text-start">{{ visit.time.to }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="form-check small text-dark">
                    <input
                      type="checkbox"
                      v-model="termsAccepted"
                      class="form-check-input"
                      @change="invalidTerms = false"
                      :class="{ 'is-invalid': invalidTerms }"
                    />
                    <label
                      class="form-check-label"
                      :class="{ 'text-danger': invalidTerms }"
                    >
                      By ticking this I confirm the above information is correct
                      and I have completed the necessary work, If any, required
                      to attend this site.
                    </label>
                  </div>
                </div>
                <div class="col-md-3" v-if="!isCameraOpen">
                  <h4 class="fs-4 text-dark-blue">Add a selfie!</h4>
                  <p class="fs-5 text-primary weight400">
                    Please Upload a photo
                  </p>
                  <p class="text-dark weight400 small">
                    Please ensure the photo is clear and well-lit to ensure the
                    photo can be used for identification purposes.
                  </p>
                  <input
                    type="file"
                    name="files"
                    ref="fileInput"
                    accept="image/*"
                    @input="pickFile"
                    id="BtnBrowseHidden"
                    style="display: none"
                  />
                  <label
                    for="BtnBrowseHidden"
                    class="btn btn-sm btn-primary mb-2 me-3"
                  >
                    Upload
                  </label>
                  <button
                    type="button"
                    @click="toggleCamera"
                    class="btn btn-sm btn-primary mb-2"
                  >
                    Camera
                  </button>
                </div>
                <div class="col-md-3 text-center" v-if="!isCameraOpen">
                  <img
                    v-if="selectedImage == null"
                    @click="this.$refs.fileInput.click()"
                    src="../../assets/images/placehplder_avatar.jpeg"
                    class="img-fluid img-thumbnail rounded-20 w-75"
                  />
                  <img
                    v-else
                    :src="selectedImage"
                    class="img-fluid img-thumbnail rounded-20"
                  />
                </div>
                <div v-else class="col-md-5 text-center d-grid">
                  <Loader v-if="isCameraOpen && isCameraLoading" />
                  <div
                    class="camera-box"
                    v-if="isCameraOpen"
                    v-show="!isCameraLoading"
                    :class="{ flash: isShotPhoto }"
                  >
                    <div
                      class="camera-shutter"
                      :class="{ flash: isShotPhoto }"
                    />

                    <video
                      v-show="!isPhotoTaken"
                      class="image_canvas"
                      ref="camera"
                      autoplay
                    />

                    <canvas
                      v-show="isPhotoTaken"
                      class="image_canvas"
                      id="photoTaken"
                      :height="337.5"
                      :width="450"
                      ref="canvas"
                    />
                  </div>

                  <div v-if="isPhotoTaken && isCameraOpen">
                    <button
                      class="btn btn-success mb-2 me-2"
                      @click="confirmPhoto"
                    >
                      Confirm
                    </button>
                    <button
                      class="btn btn-primary mb-2"
                      @click="takePhoto"
                      type="button"
                    >
                      Take Another
                    </button>
                  </div>
                  <div v-if="isCameraOpen && !isCameraLoading && !isPhotoTaken">
                    <button
                      class="btn btn-primary mb-2 me-2"
                      @click="takePhoto"
                    >
                      Take Photo
                    </button>
                    <button
                      class="btn btn-danger mb-2"
                      @click="toggleCamera"
                      type="button"
                    >
                      Close Camera
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-md-flex justify-content-md-end" v-if="!isCameraOpen">
            <button
              type="button"
              @click="$emit('deny')"
              class="btn btn-danger col-12 col-md-2 mb-2"
            >
              Deny Slot
            </button>
            <button
              @click="confirmSlot"
              :disabled="invalidTerms"
              class="btn btn-success ms-md-2 ms-0 col-12 col-md-2 mb-2"
            >
              Confirm Slot
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Loader from "../layout/Loader";

export default {
  components: { Loader },

  props: {
    visit: {
      required: true,
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      termsAccepted: false,
      invalidTerms: false,
      selectedImage: null,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isCameraLoading: false,
    };
  },
  methods: {
    pickFile() {
      let input = this.$refs.fileInput;
      if (!input.files[0].type.match(/image.*/))
        return swal("", "Selected file is not an image", "error");

      if (input.files[0].size > 1000000)
        return swal("", "The image size should be less than 1 MB.", "error");

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
          let MAX_HEIGHT = 337.5;
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
          this.selectedImage = canvas.toDataURL("image/png");
        };
        img.src = e.target.result;
      };
      if (reader.readAsDataURL) {
        reader.readAsDataURL(file[0]);
      } else if (reader.readAsDataurl) readAsDataurl(file[0]);

      this.$emit("input", file[0]);
    },

    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      this.isCameraLoading = true;
      const constraints = (window.constraints = {
        audio: false,
        video: { facingMode: "user" }, // to open front camera
      });

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isCameraLoading = false;
          this.$refs.camera.srcObject = stream;
        })
        .catch((e) => swal(e).then(() => (this.isCameraOpen = false)));
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    },

    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => (this.isShotPhoto = false), FLASH_TIMEOUT);
      }

      this.isPhotoTaken = !this.isPhotoTaken;

      const context = this.$refs.canvas.getContext("2d");
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
    },

    confirmPhoto() {
      this.toggleCamera();
      this.selectedImage = document
        .getElementById("photoTaken")
        .toDataURL("image/jpeg");
    },

    confirmSlot() {
      if (this.termsAccepted == false) return (this.invalidTerms = true);

      if (this.selectedImage) this.$emit("image", this.selectedImage);

      this.$emit("confirm");
    },
  },
};
</script>
