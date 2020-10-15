/* eslint-disable vue/valid-template-root */
<template>
  <div>
    <div>Dataset size: {{ count }}</div>
    <label for="sort_by"
      >Sort by:
      <select id="sort_by" class="select-sort-field" v-model="selected">
        <option
          v-for="item in items"
          :value="item.val"
          :key="item.id"
          class="select-sort-field"
          >{{ item.val }}
        </option>
      </select>
    </label>

    <div class="hidden">{{ series }}</div>
    <div class="chart">
      <GCharts
        type="Timeline"
        :data="series"
        :options="chartOptions"
      />
    </div>

  </div>
</template>

<script>
import GCharts from "./GChart";
import { ref, computed } from "vue";
export default {
  name: "Policy",
  components: { GCharts },
  setup() {

    const contractors = ref([
      {
        companyName: "Trooptravel",
        companyLogo:
          "https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco/xgxvcsotbsyxqqd0v3wk",
        role: "Founder",
        name: "Leonard",
        booking: true,
        start: new Date(new Date().setDate(new Date().getDate())),
        end: new Date(new Date().setDate(new Date().getDate() + 3))
      },
      {
        companyName: "Tesla",
        companyLogo:
          "https://www.logo.wine/a/logo/Tesla%2C_Inc./Tesla%2C_Inc.-Logo.wine.svg",
        role: "Senior Developer",
        name: "Ignatius",
        booking: false,
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 3))
      },
      {
        companyName: "Trooptravel",
        companyLogo:
          "https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco/xgxvcsotbsyxqqd0v3wk",
        role: "Founder",
        name: "Dennis",
        booking: true,
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 3))
      },
      {
        companyName: "Landobyte",
        companyLogo:
          "https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco/pd3irshwgvjuxqu9y0i9",
        role: "Lead Developer",
        name: "Rhyno",
        booking: true,
        start: new Date(new Date().setDate(new Date().getDate() + 4)),
        end: new Date(new Date().setDate(new Date().getDate() + 6))
      },
      {
        companyName: "Trooptravel",
        companyLogo:
          "https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco/xgxvcsotbsyxqqd0v3wk",
        role: "Junior Developer",
        name: "Etienne",
        booking: false,
        start: new Date(new Date().setDate(new Date().getDate() + 2)),
        end: new Date(new Date().setDate(new Date().getDate() + 3))
      }
    ]);

    const selected = ref("none");
    const items = ref([
      { id: 1, val: "none" },
      { id: 2, val: "company" },
      { id: 3, val: "role" }
    ]);

    const count = computed({
      get: () => contractors.value.length
    });

    const series = computed({
      get: () => {
        let arr = [];
        arr[0] = [
          { type: "string", id: "label" },
          { type: "string", id: "name" },
          { type: "string", role: "tooltip" },
          { type: "string", id: "style", role: "style" },
          { type: "datetime", id: "start" },
          { type: "datetime", id: "end" }
        ];

        for (let i = 0; i < contractors.value.length; i++) {
          arr[i + 1] = [
            sortSelection(i),
            contractors.value[i].name,
            chartTooltipHTML(i),
            bookingStyle(i),
            contractors.value[i].start,
            contractors.value[i].end
          ];
        }
        return arr;
      }
    });

    function sortSelection(val) {
        let label;
          if (selected.value === "none") {
            label = "Contractors";
          } else if (selected.value === "company") {
            label = contractors.value[val].companyName;
          } else if (selected.value === "role") {
            label = contractors.value[val].role;
          }
          return label
    }

    function bookingStyle(val) {
      let style = ["#71FFCD", "#FF6178"]; // Booking true/false

      if (contractors.value[val].booking) {
        return style[0];
      } else {
        return style[1];
      }
    }

    const chartOptions = ref({
      title: "Data Line",
      height: 400,
      legend: { position: "bottom" },
      focusTarget: "category", // This line makes the entire category's tooltip active.
      tooltip: { isHtml: true }, // Use an HTML tooltip.
      explorer: {
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 4.0
      }
    });

    function chartTooltipHTML(i) {
      return (
        '<div id="container">' +
        '<div id="blog-card">' +
        '<a class="card-link" href="#">' +
        '<article class="blog-card">' +
        '<img class="tooltip-logo" src="' +
        contractors.value[i].companyLogo +
        '" />' +
        '<div class="tooltip-details">' +
        '<h4 class="tooltip-name">' +
        contractors.value[i].name +
        "</h4>" +
        '<h3 class="tooltip-date">' +
        contractors.value[i].start.toLocaleString("default", {
          month: "short"
        }) +
        " " +
        contractors.value[i].start.getDate() +
        " - " +
        contractors.value[i].end.getDate() +
        ", " +
        contractors.value[i].start.getFullYear() +
        "</h3>" +
        '<p class="tooltip-duration"> Duration: ' +
        (contractors.value[i].end - contractors.value[i].start) /
          (1000 * 3600 * 24) +
        " days" +
        "</p>" +
        '<p class="tooltip-role">' +
        contractors.value[i].role +
        "</p>" +
        "</div>" +
        "</article>" +
        "</a>" +
        "</div>" +
        "</div>"
      );
    }

    return {
      GCharts,
      contractors,
      selected,
      items,
      count,
      series,
      chartOptions,
      bookingStyle
    };
  }
};
</script>

<style lang="scss">
.select-sort-field {
  text-transform: capitalize;
}

.hidden {
  display: none;
}
.chart {
  height: 400px;
  width: 100%;
}

.google-visualization-tooltip {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
}

$text: #777;
$black: #121212;
$white: #fff;
$red: #e04f62;
$border: #ebebeb;
$shadow: rgba(0, 0, 0, 0.2);

@mixin transition($args...) {
  transition: $args;
}

#container {
  display: flex;
  background-color:$white;
  box-shadow: 0 0.1875rem 1.5rem $shadow;
  border-radius: 0.375rem;
  
}

.blog-card {
  width: 18rem;
  display: flex;
  flex-direction: row;
  background: $white;
  overflow: hidden;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 0;
  border: none;
  box-shadow: none !important;
}

.tooltip-logo {
  display: block;
  width: 100%;
  object-fit: cover;
}

.tooltip-details {
  padding: 0.5rem;
}

.tooltip-name {
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.5rem 0;
  padding: 0 0 0.5rem 0;
  border-bottom: 0.125rem solid $border;
}

.tooltip-duration {
  margin: 0;
}

.tooltip-date {
  @include transition(color 0.3s ease);
  font-size: 1rem;
  line-height: 1.4;
  color: $black;
  font-weight: 400;
  margin: 0 0 0 0;
}

.tooltip-role {
  font-size: 0.875rem;
  line-height: 1;
  margin: 0.5rem 0 0 0;
  padding: 0.5rem 0 0 0;
  border-top: 0.0625rem solid $border;
}


@supports (display: grid) {
  .tooltip-logo {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr;
  }
}
</style>
