/* eslint-disable vue/valid-template-root */
<template>
  <div>
    <div>Dataset size: {{ count }}</div>
    <!-- <div>Dataset: {{ series }}</div> -->
    <!-- <div>Chardata: {{ chartData }}</div> -->
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
    <!-- <div>{{ contractors }}</div> -->
    <div class="chart">
      <GCharts type="Timeline" :data="series" :options="chartOptions" />
    </div>
    <div class="hidden">{{ toolTipSeries }}</div>
    <div class="chart">
      <GCharts
        type="Timeline"
        :data="toolTipSeries"
        :options="toolTipChartOptions"
      />
    </div>

    <tool-tip />

    <!-- <div>{{ toolTipSeries1 }}</div>
    <div class="chart">
      <GCharts
        type="Timeline"
        :options="toolTipChartOptions"
         @ready="onChartReady"
      />
    </div> -->
  </div>
</template>

<script>
import GCharts from "./GChart";
import ToolTip from "./ToolTip";
import { ref, reactive, computed, toRefs } from "vue";
export default {
  name: "Policy",
  components: { GCharts, ToolTip },
  setup() {
    // const chartsLib = ref(null)

    // function onChartReady(chart, google) {
    //   //   chartsLib.value = google;
    // }

    // const chartOptions = computed({
    //   if (!chartsLib.value) return null
    //   return chartsLib.value.charts.Bar.convertOptions({
    //     chart: {
    //       title: 'Company Performance',
    //       subtitle: 'Sales, Expenses, and Profit: 2014-2017'
    //     },
    //     bars: 'horizontal', // Required for Material Bar Charts.
    //     hAxis: { format: 'decimal' },
    //     height: 400,
    //     colors: ['#1b9e77', '#d95f02', '#7570b3']
    //   })
    // })

    const params = reactive({
      chartOptions: {
        title: "Data Line",
        width: "100%",
        height: 400,
        legend: { position: "bottom" }
      },
      //   chartOptions,
      chartData: [
        ["name", "label", "start", "end"],
        ["asdf", "notBlank1", new Date(1789, 3, 30), new Date(1797, 2, 4)],
        ["asdf", "notBlank2", new Date(1789, 3, 30), new Date(1797, 2, 4)],
        ["adf", "notBlank3", new Date(1789, 3, 30), new Date(1797, 2, 4)]
      ]
    });

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

    // const series = computed({
    //   get: () => {
    //     let arr = [];
    //     arr[0] = ["name", "content", "start", "end"];

    //     for (let i = 0; i < contractors.value.length; i++) {
    //       let label = "";

    //       if (selected.value === "none") {
    //         label = "";
    //       } else if (selected.value === "company") {
    //         label = contractors.value[i].companyName;
    //       } else if (selected.value === "role") {
    //         label = contractors.value[i].role;
    //       }

    //       arr[i + 1] = [
    //         contractors.value[i].name,
    //         label,
    //         contractors.value[i].start,
    //         contractors.value[i].end
    //       ];
    //     }
    //     return arr;
    //   }
    // });

    const series = computed({
      get: () => {
        let arr = [];
        arr[0] = ["name", "label", "start", "end"];

        for (let i = 0; i < contractors.value.length; i++) {
          let label = "";

          if (selected.value === "none") {
            label = "";
          } else if (selected.value === "company") {
            label = contractors.value[i].companyName;
          } else if (selected.value === "role") {
            label = contractors.value[i].role;
          }

          arr[i + 1] = [
            label,
            contractors.value[i].name,
            contractors.value[i].start,
            contractors.value[i].end
          ];
        }
        return arr;
      }
    });

    const toolTipSeries = computed({
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
          let label = "";

          if (selected.value === "none") {
            label = "";
          } else if (selected.value === "company") {
            label = contractors.value[i].companyName;
          } else if (selected.value === "role") {
            label = contractors.value[i].role;
          }

          arr[i + 1] = [
            label,
            contractors.value[i].name,
            chartTooltipHTML(i),
            // `<div>Custom Tooltip: ${contractors.value[i].name}</div>`,
            bookingStyle(i),
            contractors.value[i].start,
            contractors.value[i].end
          ];
          //   console.log(`${contractors.value[i].name}`, bookingStyle[i])
        }
        return arr;
      }
    });

    // const toolTipSeries1 = computed({
    //   get: () => {
    //     let arr = [];

    //     for (let i = 0; i < contractors.value.length; i++) {
    //       let label = "";

    //       if (selected.value === "none") {
    //         label = "";
    //       } else if (selected.value === "company") {
    //         label = contractors.value[i].companyName;
    //       } else if (selected.value === "role") {
    //         label = contractors.value[i].role;
    //       }

    //       arr[i] = [
    //         label,
    //         contractors.value[i].name,
    //         `<div>Custom Tooltip: ${contractors.value[i].name}</div>`,
    //         contractors.value[i].start,
    //         contractors.value[i].end
    //       ];
    //     }
    //     return arr;
    //   }
    // });

    function bookingStyle(val) {
      let style = ["#71FFCD", "#FF6178"]; // Booking true/false

      if (contractors.value[val].booking) {
        return style[0];
      } else {
        return style[1];
      }
    }

    const toolTipChartOptions = ref({
      title: "Data Line",
      width: "100%",
      height: 400,
      legend: { position: "bottom" },
      focusTarget: "category", // This line makes the entire category's tooltip active.
      tooltip: { isHtml: true } // Use an HTML tooltip.
    });

    function chartTooltipHTML(i) {
      return (
        '<div id="container">' +
        '<div id="blog-card">' +
        '<a class="card-link" href="#">' +
        '<article class="blog-card">' +
        '<img class="tooltip-logo" :src="' +
        contractors.value[i].companyLogo +
        " />" +
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

    // function onChartReady(chart, google) {
    // //   console.log(`chart`, chart);
    // //   console.log(`Google`, google);
    //   let dataTable = new google.visualization.DataTable();
    //   dataTable.addColumn({'type': 'string', 'id': 'name'});
    //   dataTable.addColumn({'type': 'string', 'id': 'label'});
    //         dataTable.addColumn({
    //     'type': 'string',
    //     'role': 'tooltip',
    //     'p': { 'html': true }
    //   });
    //   dataTable.addColumn({'type': 'datetime', 'id': 'start'});
    //   dataTable.addColumn({'type': 'datetime', 'id': 'end'});
    // //   console.log(`TooltipSeries1`, toolTipSeries1);
    //   dataTable.addRows(toolTipSeries1);
    // //   dataTable.addRows(5);
    // //   console.log(`chart`, chart);
    // //   chart.push(chartTooltip());
    // //     const query = new google.visualization.Query(
    // //     "https://docs.google.com/spreadsheets/d/1qhyJnMpiuuwKLCY3t6W4bp6XKnixTFekAPlCpR8AcK0/edit?usp=sharing"
    // //   )
    // //   query.send(response => {
    // //     const options = {
    // //       title: "Creating a Chart from a Separate Spreadsheet"
    // //     };
    // //     const data = response.getDataTable();
    // //     chart.draw(data, options);
    // //   })
    // }

    // function chartTooltip() {
    //   return (
    //     '<div style="white-space: nowrap; padding:5px;"><b>' +
    //     "</b><br>" +
    //     "$" +
    //     " B, <b>" +
    //     "</b>: " +
    //     "</div>"
    //   );
    // }

    // function onChartReady(chart, google) {
    //   console.log(`chart`, chart);
    //   console.log(`Google`, google);
    //   //   const query = new google.visualization.Query(
    //   //     "https://url-to-spreadsheet..."
    //   //   );
    //   //   query.send(response => {
    //   //     const options = {
    //   //       // some custom options
    //   //     };
    //   //     const data = response.getDataTable();
    //   //     chart.draw(data, options);
    //   //   });
    //   chartsLib.value = google;
    // }

    // const count = computed({
    //   get: () => count.value + 1,
    //   set: val => {
    //     count.value = val - 1;
    //   }
    // });

    return {
      GCharts,
      ...toRefs(params),
      contractors,
      selected,
      items,
      count,
      series,
      toolTipSeries,
      //   toolTipSeries1,
      //   series1,
      //   onChartReady,
      toolTipChartOptions,
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

* {
  box-sizing: border-box;
  &::before,
  &::after {
    box-sizing: border-box;
  }
}

#container {
  width: 18rem;
  height: 10rem;
}

.blog-card {
  display: flex;
  flex-direction: row;
  background: $white;
  box-shadow: 0 0.1875rem 1.5rem $shadow;
  border-radius: 0.375rem;
  overflow: hidden;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 0;
  border: none;
  &:hover .tooltip-name {
    @include transition(color 0.3s ease);
    color: $red;
  }
  &:hover .tooltip-logo {
    @include transition(opacity 0.3s ease);
    opacity: 0.9;
  }
}

.tooltip-logo {
  @include transition(opacity 0.3s ease);
  display: block;
  width: 100%;
  object-fit: cover;
}

.tooltip-details {
  padding: 0.5rem;
}

.tooltip-name {
  @include transition(color 0.3s ease);
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

// @media (max-width: 40rem) {
//   #container {
//     width: 10rem;
//     height: 12rem;
//   }

//   .blog-card {
//     flex-wrap: wrap;
//   }
// }

@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: ". main main ." ". main main .";
  }

  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }

  .tooltip-logo {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr;
  }

  //   @media (max-width: 40rem) {
  //     .blog-card {
  //       grid-template-columns: auto;
  //       grid-template-rows: 12rem 1fr;
  //     }
  //   }
}
</style>
