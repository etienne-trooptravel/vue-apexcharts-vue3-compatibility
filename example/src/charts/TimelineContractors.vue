<template>
  <div>
    <!-- <div class="tt-container tt-window" :class="classes"> -->
    <!-- <div v-for="(contractor, index) in contractors" :key="index">
      {{ contractor.name }} | {{ contractor.start }} | {{ contractor.end }}
    </div>

    <h1>OVERLAPPING DAYS:</h1>

    <pre>{{ overlappedDelegates.ranges }}</pre>
    <div v-for="(contractor, index) in overlappedDelegates.ranges" :key="index">
      <p>
        {{ contractor.previous.name }} || {{ contractor.current.name }} ||
        {{ contractor.numberDays }}
        {{ contractor.numberDays > 1 ? "days" : "day" }}
      </p>
      <pre>{{ contractor.range }}</pre>
    </div>
  </div> -->

    <h2>Contractors</h2>
    <!-- <pre class="hidden">{{ overlappedDelegates.ranges }}</pre> -->
    <!-- <div>{{ sortByField }}</div> -->
    <!-- <div>{{ series1 }}</div> -->
    <!-- <div>{{ selected }}</div> -->
    <!-- <div>{{ series }}</div> -->
    <div>{{ count }}</div>
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
    <!-- height="350"
        width= "1000" -->
    <div class="chart">
      <apexchart
        height="350"
        type="rangeBar"
        :options="chartOptions"
        :series="series1"
      ></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimelineBasicExample",
  data: function() {
    return {
      chartOptions: {
        chart: {
          // height: 400,
          // width: 2000,
          type: "rangeBar",
          // offsetX: 0,
          // offsetY: 0,
          // parentHeightOffset: 500,
          zoom: {
            enabled: true,
            type: "x",
            autoScaleYaxis: false,
            zoomedArea: {
              fill: {
                color: "#FF0000",
                opacity: 0.4
              },
              stroke: {
                color: "#FF0000",
                opacity: 0.4,
                width: 1
              }
            }
          },
          toolbar: {
            show: true,
            // offsetX: 0,
            // offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          axisBorder: {
            show: true,
            color: "#FF0000",
            offsetX: 0,
            offsetY: 0
          }
        },
        legend: {
          position: "right",
          horizontalAlign: "left"
        },
        grid: {
          show: true,
          // borderColor: "#FF0000",
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      selected: "none",
      items: [
        { id: 1, val: "none" },
        { id: 2, val: "company" },
        { id: 3, val: "role" }
      ],
      today: new Date(),
      contractors: [
        {
          companyName: "Trooptravel",
          role: "Founder",
          name: "Leonard",
          start: new Date(new Date().setDate(new Date().getDate())).getTime(),
          end: new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
        },
        {
          companyName: "Siemans",
          role: "Senior Developer",
          name: "Ignatius",
          start: new Date(
            new Date().setDate(new Date().getDate() + 1)
          ).getTime(),
          end: new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
        },
        {
          companyName: "Trooptravel",
          role: "Founder",
          name: "Dennis",
          start: new Date(
            new Date().setDate(new Date().getDate() + 1)
          ).getTime(),
          end: new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
        },
        {
          companyName: "Landobyte",
          role: "Lead Developer",
          name: "Rhyno",
          start: new Date(
            new Date().setDate(new Date().getDate() + 4)
          ).getTime(),
          end: new Date(new Date().setDate(new Date().getDate() + 6)).getTime()
        },
        {
          companyName: "Trooptravel",
          role: "Junior Developer",
          name: "Etienne",
          start: new Date(
            new Date().setDate(new Date().getDate() + 2)
          ).getTime(),
          end: new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
        }
      ]
      // series: [
      //   {
      //     name: "Leonard", // Tesla
      //     role: "Founder",
      //     company: "Trooptravel",
      //     none: "",
      //     data: [
      //       {
      //         x: sortByFlied,
      //         // x: "Trooptravel",
      //         y: [
      //           new Date(new Date().setDate(new Date().getDate())).getTime(),
      //           new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Ignatius",
      //     role: "Senior Developer",
      //     company: "Siemens",
      //     none: "",
      //     data: [
      //       {
      //         // x: `${this.sortByFlied[1]}`,
      //         x: "Siemens",
      //         y: [
      //           new Date(
      //             new Date().setDate(new Date().getDate() + 1)
      //           ).getTime(),
      //           new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Dennis",
      //     role: "Founder",
      //     company: "Trooptravel",
      //     none: "",
      //     data: [
      //       {
      //         // x: `${this.sortByFlied[2]}`,
      //         x: "Trooptravel",
      //         y: [
      //           new Date(
      //             new Date().setDate(new Date().getDate() + 1)
      //           ).getTime(),
      //           new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Rhyno",
      //     role: "Lead Developer",
      //     company: "Landobyte",
      //     none: "",
      //     data: [
      //       {
      //         // x: `${this.sortByFlied[3]}`,
      //         x: "Landobyte",
      //         y: [
      //           new Date(
      //             new Date().setDate(new Date().getDate() + 4)
      //           ).getTime(),
      //           new Date(new Date().setDate(new Date().getDate() + 6)).getTime()
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Etienne",
      //     role: "Junior Developer",
      //     company: "Trooptravel",
      //     none: "",
      //     data: [
      //       {
      //         // x: `${this.sortByFlied[4]}`,
      //         x: "Trooptravel",
      //         y: [
      //           new Date(
      //             new Date().setDate(new Date().getDate() + 2)
      //           ).getTime(),
      //           new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
      //         ]
      //       }
      //     ]
      //   }
      // ]
    };
  },
  computed: {
    // sortByField() {
    //   let arr = [{}];
    //   let companyName = [];
    //   let role = [];

    //   for (let i = 0; i < this.contractors.length; i++) {
    //     companyName[i] = this.contractors[i].companyName;
    //     role[i] = this.contractors[i].role;
    //   }

    //   arr = { companyName: companyName, role: role }
    //   return arr;
    // },
    count() {
      return this.contractors.length;
    },
    series1() {
      let arr = [];

      for (let i = 0; i < this.contractors.length; i++) {
        let name = [];
        let x = "";
        let y = [];
        let data = [];

        name[i] = this.contractors[i].name;

        // x = this.contractors[i][`${this.selected}`];
        if (this.selected === "none") {
          x = "";
        } else if (this.selected === "company") {
          x = this.contractors[i].companyName;
        } else if (this.selected === "role") {
          x = this.contractors[i].role;
        }
        // console.log(`Start ${this.contractors[i].name}`, this.contractors[i].start);

        y[0] = this.contractors[i].start;
        y[1] = this.contractors[i].end;
        data[i] = [{ x: x, y: y }];

        arr[i] = { name: name[i], data: data[i] };
      }

      // console.log(`arr`, arr);
      return arr;
    },
    series() {
      // console.log(`this`, this);
      let arr = [
        {
          name: "Leonard", // Tesla
          role: "Founder",
          company: "Trooptravel",
          none: "",
          data: [
            {
              // x: this.sortByFlied[0],
              x: "Trooptravel",
              y: [
                new Date(new Date().setDate(new Date().getDate())).getTime(),
                new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
              ]
            }
          ]
        },
        {
          name: "Ignatius",
          role: "Senior Developer",
          company: "Siemens",
          none: "",
          data: [
            {
              // x: `${this.sortByFlied[1]}`,
              x: "Siemens",
              y: [
                new Date(
                  new Date().setDate(new Date().getDate() + 1)
                ).getTime(),
                new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
              ]
            }
          ]
        },
        {
          name: "Dennis",
          role: "Founder",
          company: "Trooptravel",
          none: "",
          data: [
            {
              // x: `${this.sortByFlied[2]}`,
              x: "Trooptravel",
              y: [
                new Date(
                  new Date().setDate(new Date().getDate() + 1)
                ).getTime(),
                new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
              ]
            }
          ]
        },
        {
          name: "Rhyno",
          role: "Lead Developer",
          company: "Landobyte",
          none: "",
          data: [
            {
              // x: `${this.sortByFlied[3]}`,
              x: "Landobyte",
              y: [
                new Date(
                  new Date().setDate(new Date().getDate() + 4)
                ).getTime(),
                new Date(new Date().setDate(new Date().getDate() + 6)).getTime()
              ]
            }
          ]
        },
        {
          name: "Etienne",
          role: "Junior Developer",
          company: "Trooptravel",
          none: "",
          data: [
            {
              // x: `${this.sortByFlied[4]}`,
              x: "Trooptravel",
              y: [
                new Date(
                  new Date().setDate(new Date().getDate() + 2)
                ).getTime(),
                new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
              ]
            }
          ]
        }
      ];
      return arr;
    },
    overlappedDelegates() {
      // return this.overlap(this.contractors);
      return this.overlap(this.series1);
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
        // let previousTime = previous.start.getTime();
        let previousTime = previous.data[0].y[0];
        // let currentTime = current.start.getTime();
        let currentTime = current.data[0].y[0];
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
          // let previousEnd = previous.end.getTime();
          let previousEnd = previous.data[0].y[1];
          // let currentStart = current.start.getTime();
          let currentStart = current.data[0].y[0];
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

<style scoped>
.select-sort-field {
  text-transform: capitalize;
}

.hidden {
  display: none;
}

.chart {
  /* overflow:scroll; */
  margin: 0;
  padding: 0;
}
</style>
