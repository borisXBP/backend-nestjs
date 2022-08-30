function getOptions(type, list = [], addName = "") {
  let res = null;
  let dataList = [];
  if (!list) return res;
  const isGw = list.every((j) => Array.isArray(j.device));
  switch (type) {
    case 1:
      dataList = [
        {
          name: "白屏时间",
          data: list.map((i) => [i.time, i.whiteScreen.toFixed(2) || 0]),
        },
      ];
      res = getOption(dataList, `${addName}白屏时间`);
      break;
    case 2:
      dataList = [
        {
          name: "请求耗时",
          data: list.map((i) => [i.time, i.request.toFixed(2) || 0]),
        },
      ];
      res = getOption(dataList, `${addName}请求耗时`);
      break;
    case 3:
      res = getOption(
        [
          {
            name: "最大 js 文件加载耗时",
            data: list.map((i) => [i.time, i.umijs.toFixed(2) || 0]),
          },
        ],
        `${addName} 最大 js 文件加载耗时`
      );
      break;
    case 4:
      res = getOption(
        [
          {
            name: "最大 css 文件加载耗时",
            data: list.map((i) => [i.time, i.umicss.toFixed(2) || 0]),
          },
        ],
        `${addName} 最大 css 文件加载耗时`
      );
      break;
  }
  return res;
}

function getOption(dataList, title) {
  return {
    title: {
      text: `▎${title}`,
      left: 8,
      top: 8,
      textStyle: {
        fontSize: 16,
        color: "#1bb4f6",
      },
    },
    grid: {
      x: 64,
      y: 48,
      x2: 45,
      y2: 36,
      borderWidth: 1,
    },
    tooltip: {
      trigger: "axis",
      show: true,
      backgroundColor: "rgba(218, 223, 225, 0.4)",
      position: function (point, params, dom, rect, size) {
        if (point[0] < size.viewSize[0] / 2) {
          return [point[0] + 20, "40%"];
        }
        return [point[0] - 172, "40%"];
      },
    },
    toolbox: {
      right: 10,
      orient: "vertical",
    },
    legend: {
      data: dataList.map((i) => i.name),
      show: true,
      x: "right",
      y: "10",
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#1bb4f6",
      },
    },
    animation: true,
    animationDuration: 1000,
    animationEasing: "bounceOut", // 缓动动画
    xAxis: {
      type: "time",
      splitLine: {
        show: false,
      },
      boundaryGap: false,
      axisLabel: {
        formatter: {
          year: "{yyyy}",
          month: "{MMM}",
          day: "{d}",
          hour: "{HH}:{mm}",
          minute: "{HH}:{mm}",
          second: "{HH}:{mm}:{ss}",
        },
      },
    },
    yAxis: {
      type: "value",
      nameGap: 1,
      yAxisIndex: 0,
      left: 100,
      boundaryGap: [0, "100%"],
      position: "left",
      axisLabel: {
        formatter: title.includes("耗时") ? "{value} s" : "{value} ms",
        textStyle: {
          color: "#2ad1d2",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#27b4c2",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#bcbcdd",
          type: "dashed",
        },
      },
    },
    // echart 的辅助线改成虚线
    series: dataList.map((i) => {
      return {
        name: i.name,
        type: "line",
        symbolSize: 8,
        deviceList: i.deviceList,
        itemStyle: {
          emphasis: {
            //突出效果配置(鼠标置于拐点上时)
            borderColor: "#fff", //  拐点边框颜色
            borderWidth: 2, //  拐点边框宽度
            shadowColor: "#2196F3", //  阴影颜色
            shadowBlur: 10, //  阴影渐变范围控制
          },
        },
        data: i.data.filter((i) => i[0] !== 0),
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            { type: "min", name: "最小值" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "平均值" }],
        },
      };
    }),
  };
}

// 请求的方法
function request(path = "", type = "get") {
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: type,
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}
