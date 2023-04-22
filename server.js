//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const process = require("process");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const status = require("./status.js");
const newUUID = uuidv4();
const { createProxyMiddleware } = require('http-proxy-middleware');

// app.use(helmet());
// app.use('/', createProxyMiddleware({ target: 'http://localhost:3838', changeOrigin: true }));
app.use(helmet.hidePoweredBy());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: "application/json" }));
app.use(cookieParser());
// Render using Prod Build
app.use(express.static(path.join(__dirname, 'build')))
// Render from Public Directory
// app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());
app.use("/app/v1", status);

//allow cross origin requests
app.use(function (req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, OPTIONS, DELETE"
    );
    res.header("Access-Control-Allow-Origin", ["http://localhost:3000","http://localhost:3838","*"]);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", false);
    next();
  });


app.get('/app/v1/ping', (req, res) => {
    return res.send({ status:'pong'})
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/target-url-config', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })


function startTimer() {
    const started = process.uptime()
    return () => Math.floor((process.uptime() - started) * 1000) // uptime gives us seconds
  }

app.all("/app/v1/healthz", (req, res) => {
    // winston.info(`${req.method} - ${req.originalUrl} - ${req.ip}`);
    const rss = (process.memoryUsage().rss / (1024 * 1024)).toFixed(2);
    const heapTotal = (process.memoryUsage().heapTotal / (1024 * 1024)).toFixed(2);
    const uptime = (process.uptime() / 60).toFixed(2);
    res.status(200).send({ message: "healthy", status: 200, application: "api", upTime: uptime ,heapTotal:heapTotal,rss:rss});
  });



// const options = {
//   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
// };

function startServer() {
    const port =
      process.env.NODE_ENV === "production" ? process.env.TOOL_SERVER_PORT || 80 : 3838;
    app.listen(port, () => {
      console.log(
        "Server listening on port http://localhost:" +
          port +
          "/app/v1/healthz  [ " + newUUID +" ]"+
          " [ How to Message in a World of Noise ]"
      );
      // winston.info(`Server listening on port http://localhost:${port}`);
    });
  }

startServer();
// @End //
