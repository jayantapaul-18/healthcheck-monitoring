const status = require("express")();
const os = require('os');
const v8 = require('v8');
const eventLoopStats = require('event-loop-stats');
const axios = require('axios');
const moment = require('moment');
const { TARGET_URL , TIMEOUT} = require('./config');



status.get("/target-url", (req, res) => {
    var newArray = TARGET_URL.map((object, i) => ({ ...object, key: i + 1 }));
    res.status(200).json(newArray);
});

status.get("/status", (req, res) => {

    var status = {
        timestamp: Date.now(),
        osHostname: os.hostname(),
        processArch: process.arch,
        osPlatform:os.platform(),
        heapStat: v8.getHeapStatistics(),
        osFreemem: os.freemem(),
        osTotalmem :os.totalmem(),
        osLoadavg: os.loadavg(),
        osCpus: os.cpus(),
        osNetworkInterfaces: os.networkInterfaces(),
        osUptime: os.uptime(),
        v8GetHeapSpaceStatistics:v8.getHeapSpaceStatistics()

    }

    res.status(200).json({status:status, eventLoopStats:eventLoopStats.sense()});
  });

// message: '"connect ETIMEDOUT ip:443"'
// message: '"Request failed with status code 404"'
// message: '"timeout of 1000ms exceeded"'

function allSettled (promises) {
    const allPromises = promises.map(p => Promise.resolve(p)
        .then(
        value => ({ state: 'fulfilled', value: value }),
        error => ({ state: 'rejected', reason: error })

      )
    );
    return Promise.all(allPromises);
  }


status.get("/health-status", (req, res) => {
    const Promises = [];
    const TARGET_TEST_RESULTS = [];
    (TARGET_URL || []).forEach(TARGET => {
        let uri = `${TARGET.protocol}://${TARGET.hostPort}${TARGET.path}`;
        Promises.push(axios({
          url: uri,
          method: 'GET',
            timeout: TIMEOUT,
            maxRedirects: 2
        },
        ));
      });

    var startDate = moment();
    allSettled(Promises).then(results => {
        results.forEach((result, index) => {
            var endDate = moment();
            console.log('Request took: ' + endDate.diff(startDate) + ' ms.');
            // if(result.status == 'fulfilled' && result.value.status == 200) {
            //     console.log(result.value.status);
            //   }
            //   if(result.status == 'fulfilled' && result.value.status == 502) {
            //     console.log(result.value.status);
            //   }
            if (result.state === 'rejected') {
                console.log("rejected result: ",result);
                console.log(JSON.stringify(result.reason.message));
                TARGET_TEST_RESULTS.push({
                    key:index,
                    path: TARGET_URL[index].path,
                    status: ['failed'],
                    httpStatusCode: (result.reason.code),
                    responseBody: JSON.stringify(result),
                    response: "Error: "+JSON.stringify(result.reason.message),
                    timestamp: new Date
                });
            } else {
                // console.log(result);
                TARGET_TEST_RESULTS.push({
                    key:index,
                    path: TARGET_URL[index].path,
                    status: ['success'],
                    httpStatusCode: 200,
                    responseBody: '',
                    response: result.value.data,
                    timestamp: new Date
                });
            }
        });

        //   return TARGET_TEST_RESULTS;
        console.log(TARGET_TEST_RESULTS);
        res.status(200).json(TARGET_TEST_RESULTS);
    });

});

module.exports = status;
