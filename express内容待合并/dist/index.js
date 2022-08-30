export function getCharts(domList) {
  const chartsList = domList.map((i) => {
    const chart = echarts.init(i);
    chart.id = i.id;
    return chart;
  });

  reSize(chartsList, domList);
  window.onresize = () => reSize(chartsList, domList);
  echarts.connect(chartsList.filter((i) => i.id.includes("95")));
  echarts.connect(chartsList.filter((i) => i.id.includes("241")));
  echarts.connect(chartsList.filter((i) => i.id.includes("10")));

  fetchChart(chartsList);
  window.intval && clearInterval(window.intval);
  window.intval = setInterval(() => {
    fetchChart(chartsList);
  }, 1000);
}

function fetchChart(chartsList) {
  (async () => {
    const data = await getData();
    const data95 = data.filter((i) => i.target === "192.168.31.95");
    let data241 = data.filter((i) => i.target === "192.168.32.241");
    data241 = data241.filter(
      (i) => Number(i.resources.script[0]?.duration) > 100
    );
    const data10 = data.filter((i) => i.target === "192.168.10.6:8000");
    chartsList.forEach((i) => {
      const { id } = i;
      let chartData = [];
      let fileSize = 0;
      let js10 = {};
      switch (id) {
        case "one95":
          chartData = data95.map(({ time, performance }) => ({
            time,
            whiteScreen: performance.whiteScreen,
          }));
          i.setOption(getOptions(1, chartData, "95"));
          break;
        case "one241":
          chartData = data241.map(({ time, performance }) => ({
            time,
            whiteScreen: performance.whiteScreen,
          }));
          i.setOption(getOptions(1, chartData, "241"));
          break;
        case "two95":
          chartData = data95.map(({ time, performance }) => ({
            time,
            request: performance.request,
          }));
          i.setOption(getOptions(2, chartData, "95"));
          break;
        case "two241":
          chartData = data241.map(({ time, performance }) => ({
            time,
            request: performance.request,
          }));
          i.setOption(getOptions(2, chartData, "241"));
          break;
        case "three95":
          chartData = data95.map(({ time, resources }) => {
            let target = resources.script[0]?.name.endsWith("umi.js")
              ? resources.script[0]
              : {};
            fileSize = fileSize || target.size;
            return {
              time,
              umijs: target.duration / 1000,
            };
          });
          i.setOption(
            getOptions(
              3,
              chartData,
              `95 -- ${(fileSize / 1024 / 1024).toFixed(1)}MB`
            )
          );
          break;
        case "three241":
          chartData = data241.map(({ time, resources }) => {
            let target = resources.script[0]?.name.endsWith("umi.js")
              ? resources.script[0]
              : {};
            fileSize = fileSize || target.size;
            return {
              time,
              umijs: target.duration / 1000,
            };
          });
          i.setOption(
            getOptions(
              3,
              chartData,
              `241 -- ${(fileSize / 1024 / 1024).toFixed(1)}MB`
            )
          );
          break;
        case "four95":
          chartData = data95.map(({ time, resources }) => {
            let target = resources.link[0]?.name.endsWith("umi.css")
              ? resources.link[0]
              : {};
            fileSize = fileSize || target.size;
            return {
              time,
              umicss: target.duration / 1000,
            };
          });
          i.setOption(
            getOptions(
              4,
              chartData,
              `95 -- ${(fileSize / 1024 / 1024).toFixed(1)}MB`
            )
          );
          break;
        case "four241":
          chartData = data241.map(({ time, resources }) => {
            let target = resources.link[0]?.name.endsWith("umi.css")
              ? resources.link[0]
              : {};
            fileSize = fileSize || target.size;
            return {
              time,
              umicss: target.duration / 1000,
            };
          });
          i.setOption(
            getOptions(
              4,
              chartData,
              `241 -- ${(fileSize / 1024 / 1024).toFixed(1)}MB`
            )
          );
          break;
        case "one10":
          chartData = data10.map(({ time, performance }) => ({
            time,
            whiteScreen: performance.whiteScreen,
          }));
          i.setOption(getOptions(1, chartData, "10.6"));
          break;
        case "two10":
          chartData = data10.map(({ time, performance }) => ({
            time,
            request: performance.request,
          }));
          i.setOption(getOptions(2, chartData, "10.6"));
          break;
        case "three10":
          chartData = data10.map(({ time, resources }) => {
            let target =
              resources.script.sort((a, b) => b.size - a.size)[0] || {};
            js10 = js10.size > target.size ? js10 : target;
            console.log("js10", js10);
            fileSize = fileSize || js10.size;
            return {
              time,
              umijs: js10.duration / 1000,
            };
          });
          i.setOption(
            getOptions(
              3,
              chartData,
              `10.6 -- ${(fileSize / 1024 / 1024).toFixed(1)}MB`
            )
          );
          break;
        case "four10":
          chartData = data10.map(({ time, resources }) => {
            let target =
              resources.link.sort((a, b) => b.size - a.size)[0] || {};
            fileSize = fileSize || target.size;
            return {
              time,
              umicss: target.duration / 1000,
            };
          });
          i.setOption(
            getOptions(
              4,
              chartData,
              `10.6 -- ${(fileSize / 1024 / 1024).toFixed(1)}MB`
            )
          );
          break;
      }
    });
  })();
}

function getData() {
  return new Promise((resolve, reject) => {
    request("/get/performance").then((res) => {
      resolve(res.data.sort((a, b) => a.time - b.time));
    });
  });
}

function reSize(chartsList, domList) {
  if (document.body.offsetWidth > 1600) {
    chartsList.forEach((i) => {
      i.resize({ width: i.id.includes("10") ? 1900 : 950, height: 500 });
    });
    domList.forEach((i) => {
      i.style.width = i.id.includes("10") ? "1900px" : "950px";
      i.style.height = "500px";
    });
  }
}
