var myChart = echarts.init(document.getElementById("main"));
const dataSource = [
  ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
  ["Milk Tea", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
  ["Matcha Latte", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
];
setTimeout(function () {
  option = {
    legend: {},
    tooltip: {
      trigger: "axis",
      showContent: true,
    },
    dataset: {
      source: dataSource,
    },
    xAxis: { type: "category" },
    yAxis: { gridIndex: 0 },
    grid: { top: "55%" },
    series: [
      {
        type: "line",
        id: 'line1',
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
      {
        type: "line",
        id: 'line2',
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
      {
        type: "pie",
        id: "pie",
        radius: "30%",
        center: ["50%", "25%"],
        // emphasis: {
        //   focus: "self",
        // },
        label: {
          formatter: "{b}: {@2012} ({d}%)",
        },
        encode: {
          itemName: "product",
          value: "2012",
          tooltip: "2012",
        },
        selectedMode: 'single'
      },
    ],
  };
  myChart.on("updateAxisPointer", function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      myChart.setOption({
        series: {
          id: "pie",
          label: {
            formatter: "{b}: {@[" + dimension + "]} ({d}%)",
          },
          encode: {
            value: dimension,
            tooltip: dimension,
          },
        },
      });
    }
  });

  myChart.setOption(option);
  myChart.on("selectchanged", function (event) {
    const {dataIndexInside,seriesIndex} = event?.fromActionPayload;
    const selected = event?.selected;
    const dimension = dataSource[dataIndexInside + 1];
    if(seriesIndex === 2 && selected?.length > 0){
      myChart.setOption({
        series: [
          {
            id: "line1",
            label: {
              formatter: "{b}: {@[" + dimension + "]} ({d}%)",
            },
            encode: {
              value: dimension,
              tooltip: dimension,
            },
          },{
            id: "line2",
            label: {
              formatter: "{b}: {@[" + dimension + "]} ({d}%)",
            },
            encode: {
              value: dimension,
              tooltip: dimension,
            },
          }
        ],
      });
    } else {
      myChart.setOption({
        series: [
          {
            id: "line1",
            label: {
              formatter: "{b}: {@[" + dataSource + "]} ({d}%)",
            },
            encode: null,
          },{
            id: "line2",
            label: {
              formatter: "{b}: {@[" + dataSource + "]} ({d}%)",
            },
            encode: null,
          }
        ],
      });
    }
  });

});
function changeFontSizeAndColor(){
  const size = document.getElementById('fontSize')?.value;
  const color = document.getElementById('fontColor')?.value;
  myChart.setOption({
    xAxis: {
      axisLabel: {
        fontSize: size ? size: 12,
        color: color ? color : '#0000'
      }
    },
    yAxis: {
      axisLabel: {
        fontSize: size ? size: 12,
        color: color ? color : '#0000'
      }
    },
  });
}
