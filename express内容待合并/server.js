// 使用 express 启动一个服务器
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const logs = JSON.parse(fs.readFileSync("./dist/performance.json", "utf-8"));
const httpLogs = JSON.parse(fs.readFileSync("./dist/http.json", "utf-8"));

// 解决跨域问题
app.all("*", function (req, res, next) {
  // 设置允许跨域的域名,*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options")
    res.sendStatus(200); // 让options 尝试请求快速结束
  else next();
});

app.use(express.json());
// 实现静态资源访问功能
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: false }));

// 把 dist/index.html 映射到 / 路径上
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, `./dist/index.html`));
});

app.get("/boris", (req, res) => {
  console.log("访问了我", req.url);
  res.sendFile(path.join(__dirname, `./dist/index.html`));
});

app.get("/home", (req, res) => {
  res.redirect("/");
});

app.get("/get/performance", (req, res) => {
  const data = fs.readFileSync("./dist/performance.json", "utf-8");
  res.send({
    status: "success",
    data: JSON.parse(data),
  });
});

app.post("/upload/performance", (req, res) => {
  req.body.target = req.headers.referer.slice(7, -1);
  logs.push(req.body);
  fs.writeFileSync(
    path.resolve(__dirname, "./dist/performance.json"),
    JSON.stringify(logs),
    (err) => {}
  );
  res.send("success");
});

// webSocket --------------------------------------------------------------

// ------------------------------

app.listen(8888, () => console.log("started"));
