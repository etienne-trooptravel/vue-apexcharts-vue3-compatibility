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
        role: "Founder",
        name: "Leonard",
        booking: true,
        start: new Date(new Date().setDate(new Date().getDate())),
        end: new Date(new Date().setDate(new Date().getDate() + 3))
      },
      {
        companyName: "Tesla",
        role: "Senior Developer",
        name: "Ignatius",
        booking: false,
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 3))
      },
      {
        companyName: "Trooptravel",
        role: "Founder",
        name: "Dennis",
        booking: true,
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 3))
      },
      {
        companyName: "Landobyte",
        role: "Lead Developer",
        name: "Rhyno",
        booking: true,
        start: new Date(new Date().setDate(new Date().getDate() + 4)),
        end: new Date(new Date().setDate(new Date().getDate() + 6))
      },
      {
        companyName: "Trooptravel",
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
            `<div>Custom Tooltip: ${contractors.value[i].name}</div>`,
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

<style scoped>
.select-sort-field {
  text-transform: capitalize;
}

.hidden {
  display: none;
}
.chart {
  height: 400px;
}
</style>
