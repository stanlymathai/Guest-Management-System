<template>
  <div class="fade_in small p-4" @change="savePreference">
    <div class="table-responsive">
      <table class="table table-borderless table-hover">
        <thead class="text-dark text-center">
          <tr>
            <th scope="col">
              <p
                v-if="$route.name == 'Setup'"
                class="lead fw-normal text-start mb-0 fs-4 text-primary"
              >
                Your Notifications
              </p>
            </th>
            <th scope="col">User Email</th>
            <th scope="col">User SMS</th>
            <th scope="col">Host Email</th>
            <th scope="col">Host SMS</th>
          </tr>
        </thead>
        <tbody
          class="text-primary"
          :class="{ border: $route.name == 'Settings' }"
        >
          <tr
            :class="{
              'border border-start-0 border-end-0': $route.name == 'Settings',
            }"
          >
            <td>
              <figure>
                <blockquote>
                  <p class="mb-4">Visitor Confirmation/Refusal</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                  <cite title="Source Title">"John Smith</cite>
                  has confirmed their appointment<br />with
                  <cite title="Source Title">Joe Blogs</cite>
                  at 12:00-13:00 on 12/01/20XX"
                </figcaption>
              </figure>
            </td>
            <td
              class="border border-end-0"
              v-for="(item, index) in Notifications.confirmation"
              :key="index"
            >
              <div class="form-switch d-flex justify-content-center">
                <input
                  type="checkbox"
                  v-model="item.value"
                  class="form-check-input mt-4"
                />
              </div>
            </td>
          </tr>
          <tr class="border border-start-0 border-end-0">
            <td>
              <figure>
                <blockquote>
                  <p class="mb-4">Visitor Check-In</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                  <cite title="Source Title">"John Smith</cite>
                  checked in Front Desk at 12:03<br />
                  and is awaiting collection"
                </figcaption>
              </figure>
            </td>
            <td
              class="border border-end-0"
              v-for="(item, index) in Notifications.checkIn"
              :key="index"
            >
              <div class="form-switch d-flex justify-content-center">
                <input
                  type="checkbox"
                  v-model="item.value"
                  class="form-check-input mt-4"
                />
              </div>
            </td>
          </tr>
          <tr class="border border-start-0 border-end-0">
            <td>
              <figure>
                <blockquote>
                  <p class="mb-4">Visitor Collected</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                  <cite title="Source Title">"John Smith</cite>
                  was collected by
                  <cite title="Source Title">Joe Blogs</cite><br />at 12:07 from
                  Front Desk"
                </figcaption>
              </figure>
            </td>
            <td
              class="border border-end-0"
              v-for="(item, index) in Notifications.collected"
              :key="index"
            >
              <div class="form-switch d-flex justify-content-center">
                <input
                  type="checkbox"
                  v-model="item.value"
                  class="form-check-input mt-4"
                />
              </div>
            </td>
          </tr>
          <tr class="border border-start-0 border-end-0">
            <td>
              <figure>
                <blockquote>
                  <p class="mb-4">Visitor Appointment Change Request</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                  <cite title="Source Title">"John Smith</cite>
                  would like to re-arrange their<br />
                  12:00-13:00 appointment on 12/01/20XX.<br />Please follow the
                  link to re-shedule"
                </figcaption>
              </figure>
            </td>
            <td
              class="border border-end-0"
              v-for="(item, index) in Notifications.appointmentChange"
              :key="index"
            >
              <div class="form-switch d-flex justify-content-center">
                <input
                  type="checkbox"
                  v-model="item.value"
                  class="form-check-input mt-4"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-end" v-if="$route.name == 'Setup'">
      <button class="btn btn-sm btn-primary">Set Preferences</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Notifications: {
        confirmation: [
          {
            name: "userEmail",
            value: false,
          },
          {
            name: "userSMS",
            value: false,
          },
          {
            name: "hostEmail",
            value: false,
          },
          {
            name: "hostSMS",
            value: false,
          },
        ],
        checkIn: [
          {
            name: "userEmail",
            value: true,
          },
          {
            name: "userSMS",
            value: false,
          },
          {
            name: "hostEmail",
            value: true,
          },
          {
            name: "hostSMS",
            value: false,
          },
        ],
        collected: [
          {
            name: "userEmail",
            value: false,
          },
          {
            name: "userSMS",
            value: false,
          },
          {
            name: "hostEmail",
            value: false,
          },
          {
            name: "hostSMS",
            value: false,
          },
        ],
        appointmentChange: [
          {
            name: "userEmail",
            value: false,
          },
          {
            name: "userSMS",
            value: false,
          },
          {
            name: "hostEmail",
            value: false,
          },
          {
            name: "hostSMS",
            value: false,
          },
        ],
      },
    };
  },
  methods: {
    savePreference() {
      console.log(`'element' knri `, "element");
    },
  },
};
</script>
