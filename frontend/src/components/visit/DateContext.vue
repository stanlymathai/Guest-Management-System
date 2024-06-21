<template>
  <div class="text-end mt-4" style="font-size: 0.8rem">
    <span
      v-for="(context, i) in [
        'Tomorrow',
        'This Week',
        'Next Week',
        'This Month',
      ]"
      :key="i"
      @click="handleContextClick(context)"
    >
      <a
        :class="{
          'text-decoration-none text-reset pe-none':
            upcomingVisitTitle == context,
        }"
        class="cursor_pointer"
        >{{ context }}
      </a>
      <a class="ms-2 me-2 text-decoration-none">/</a>
    </span>
    <a
      @click="
        (visitRange.from = new Date()),
          (visitRange.to = new Date()),
          (showCustom = true)
      "
      class="cursor_pointer"
    >
      Custom
    </a>

    <DateRange
      v-if="showCustom"
      class="text-start"
      :dateTo="visitRange.to"
      :dateFrom="visitRange.from"
      @submit="handleCustomRange"
      @close="showCustom = false"
      @dateTo="visitRange.to = $event"
      @dateFrom="visitRange.from = $event"
      :minDate="new Date()"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DateRange from "../common/DateRange";
import moment from "moment";

export default {
  components: {
    DateRange,
  },
  created() {
    !this.visitsTodayVisible && this.showVisitsToday();
    this.fetchUpcomingVisits(this.visitRange);
    this.setUpComingTitle(this.title);
  },
  data() {
    return {
      title: "Today",
      showCustom: false,
      visitRange: {
        from: moment().add(1, "day").format("YYYY-MM-DD"),
        to: moment().endOf("isoWeek").format("YYYY-MM-DD"),
      },
    };
  },
  computed: {
    ...mapGetters(["visitsTodayVisible", "upcomingVisitTitle"]),
  },
  methods: {
    ...mapActions([
      "fetchUpcomingVisits",
      "setUpComingRange",
      "setUpComingTitle",
      "showVisitsToday",
      "hideVisitsToday",
    ]),

    handleContextClick(context) {
      if (context == this.upcomingVisitTitle) return;
      this.title = context;
      switch (context) {
        case "Tomorrow":
          this.visitRange.from = moment().add(1, "day").format("YYYY-MM-DD");
          this.visitRange.to = this.visitRange.from;
          break;
        case "This Week":
          this.visitRange.from = moment().add(1, "day").format("YYYY-MM-DD");
          this.visitRange.to = moment().endOf("isoWeek").format("YYYY-MM-DD");
          break;
        case "Next Week":
          this.visitRange.from = moment()
            .add(1, "week")
            .startOf("isoWeek")
            .format("YYYY-MM-DD");
          this.visitRange.to = moment()
            .add(1, "week")
            .endOf("isoWeek")
            .format("YYYY-MM-DD");
          break;
        case "This Month":
          this.visitRange.from = moment().add(1, "day").format("YYYY-MM-DD");
          this.visitRange.to = moment().endOf("month").format("YYYY-MM-DD");
          break;
        default:
          return;
      }
      this.setUpComingTitle(this.title);
      this.fetchUpcomingVisits(this.visitRange);
      this.visitsTodayVisible && this.hideVisitsToday();
    },
    handleCustomRange() {
      let visitFrom = this.visitRange.from;
      let visitTo = this.visitRange.to;

      let areTheySame =
        moment(visitFrom).format("YYYY-MM-DD") ==
        moment(visitTo).format("YYYY-MM-DD");

      this.title = areTheySame
        ? moment(visitFrom).format("Do MMMM")
        : `${moment(visitFrom).format("Do MMM")} ⇔ ${moment(visitTo).format(
            "Do MMM"
          )}`;

      this.visitRange.from = moment(visitFrom).format("YYYY-MM-DD");
      this.visitRange.to = moment(visitTo).format("YYYY-MM-DD");

      this.setUpComingTitle(this.title);
      this.fetchUpcomingVisits(this.visitRange);
      this.visitsTodayVisible && this.hideVisitsToday();
    },
  },
};
</script>
