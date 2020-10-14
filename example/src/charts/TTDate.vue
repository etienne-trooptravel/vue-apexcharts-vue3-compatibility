<template>
  <div class="tt-container tt-window" :class="classes">
    <div v-for="(contractor, index) in contractors" :key="index">
      {{ contractor.name }} | {{ contractor.start }} | {{ contractor.end }}
    </div>

    <h1>OVERLAPPING DAYS:</h1>

    <div v-for="(contractor, index) in overlappedDelegates.ranges" :key="index">
      <p>
        {{ contractor.previous.name }} || {{ contractor.current.name }} ||
        {{ contractor.numberDays }}
        {{ contractor.numberDays > 1 ? "days" : "day" }}
      </p>
      <pre>{{ contractor.range }}</pre>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "TTDate",
  components: {},
  props: {},
  data() {
    return {
      today: new Date(),
      contractors: [
        {
          companyName: "Trooptravel",
          role: "Founder",
          name: "Leonard",
          start: new Date(new Date().setDate(new Date().getDate())),
          end: new Date(new Date().setDate(new Date().getDate() + 3))
        },
        {
          companyName: "Siemans",
          role: "Senior Developer",
          name: "Ignatius",
          start: new Date(new Date().setDate(new Date().getDate() + 1)),
          end: new Date(new Date().setDate(new Date().getDate() + 3))
        },
        {
          companyName: "Trooptravel",
          role: "Founder",
          name: "Dennis",
          start: new Date(new Date().setDate(new Date().getDate() + 1)),
          end: new Date(new Date().setDate(new Date().getDate() + 3))
        },
        {
          companyName: "Landobyte",
          role: "Lead Developer",
          name: "Rhyno",
          start: new Date(new Date().setDate(new Date().getDate() + 4)),
          end: new Date(new Date().setDate(new Date().getDate() + 6))
        },
        {
          companyName: "Trooptravel",
          role: "Junior Developer",
          name: "Etienne",
          start: new Date(new Date().setDate(new Date().getDate() + 2)),
          end: new Date(new Date().setDate(new Date().getDate() + 3))
        }
      ]
    };
  },
  created() {},
  mounted() {},
  computed: {
    overlappedDelegates() {
      return this.overlap(this.contractors);
    }
  },
  methods: {
    getDatesBetweenDates(startDate, endDate) {
      let dates = [];
      //to avoid modifying the original date
      const theDate = new Date(startDate);
      while (theDate < endDate) {
        dates = [...dates, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1);
      }
      return dates;
    },
    overlap(dateRanges) {
      let self = this;

      let sortedRanges = dateRanges.sort((previous, current) => {
        // get the start date from previous and current
        let previousTime = previous.start.getTime();
        let currentTime = current.start.getTime();

        // if the previous is earlier than the current
        if (previousTime < currentTime) {
          return -1;
        }

        // if the previous time is the same as the current time
        if (previousTime === currentTime) {
          return 0;
        }

        // if the previous time is later than the current time
        return 1;
      });

      let result = sortedRanges.reduce(
        (result, current, idx, arr) => {
          // get the previous range
          if (idx === 0) {
            return result;
          }
          let previous = arr[idx - 1];

          // check for any overlap
          let previousEnd = previous.end.getTime();
          let currentStart = current.start.getTime();
          let overlap = previousEnd >= currentStart;

          // store the result
          if (overlap) {
            // yes, there is overlap
            result.overlap = true;

            // store the specific ranges that overlap
            result.ranges.push({
              previous: previous,
              current: current,
              overlap: overlap,
              numberDays: (previousEnd - currentStart) / (86400 * 1000),
              range: self.getDatesBetweenDates(currentStart, previousEnd)
            });
          }

          return result;

          // seed the reduce
        },
        { overlap: false, ranges: [] }
      );

      // return the final results
      return result;
    }
  }
};
</script>

<style>
.grid_accomodation_settings {
  grid-area: accomodation_settings;
  display: grid;
  grid-template-areas:
    "analysis_priority_label . ."
    "priority_cost priority_time priority_co2"
    "services_required_label . . "
    "require_transport require_transport ."
    "require_accommodation require_accommodation . "
    "require_meeting_space require_meeting_space . "
    ". . . ";
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(7, 1fr);
}

div.tt-trip-create-button {
  /* border: 1px solid red; */
  max-width: 210px;
  justify-self: end;
}

.grid_travel_policy {
}

.grid_start_date {
  display: grid;
  grid-template-areas:
    "start_date_label . end_date_label"
    "start_date_button . end_date_button"
    "flexible_dates flexible_dates flexible_dates ";
  grid-template-rows: 30px 50px 30px;
  grid-template-columns: 10fr 1fr 10fr;
}

.grid_start_time {
  display: grid;
  grid-template-areas:
    "start_time_label . end_time_label"
    "start_time_button . end_time_button"
    "flexible_times flexible_times flexible_times";
  grid-template-rows: 30px 50px 30px;
  grid-template-columns: 10fr 1fr 10fr;
}

div.tt-customer-logo {
  /* border: 1px solid green; */
  background-size: contain;
  background-position: center left;
  background-repeat: no-repeat;
}
</style>
