const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    TIMEOUT: 5000,
    REQUEST_INTERVAL: 1000
}

module.exports = {
    TARGET_URL : [
        {
            key: 1,
            tag: 'plab',
            protocol: 'http',
            hostPort: 'localhost:3838',
            path: '/app/v1/ping',
            status: ['success'],
            httpStatusCode: 200,
            responseBody: '',
            response: { message: 33.589 },
            timestamp: "2022-03-26T15:56:10.493Z",
            state: true
        },
        {
            tag: 'plab',
            protocol: 'http',
            hostPort: 'localhost:3838',
            path: '/app/v1/healthz',
            state: true
        },
        {
            tag: 'plab',
            protocol: 'http',
            hostPort: 'localhost:1881',
            path: '/app/v1/healthcheck',
            state: true
        },
        {
            tag: 'plab',
            protocol: 'http',
            hostPort: 'localhost:3003',
            path: '/secure/v1/healthcheck',
            state: false
        },
        {
            tag: 'plab',
            protocol: 'https',
            hostPort: 'localhost:3003',
            path: '/yup/v1/healthcheck',
            state: false
        },
        {
            tag: 'plab',
            protocol: 'http',
            hostPort: '192.168.1.176:1881',
            path: '/agent/v1/healthcheck',
            state: false
        },
        {
            tag: 'plab',
            protocol: 'http',
            hostPort: 'localhost:1881',
            path: '/perf/v1/healthcheck',
            state: false
        },
        {
            tag: 'plab',
            protocol: 'http',
            hostPort: '192.168.1.176:1881',
            path: '/agent/v1/getTemp',
            state: false
        },
        {
            tag: 'plab',
            protocol: 'http',
            hostPort: 'localhost:1881',
            path: '/agent/v1/cpuLoad',
            state: false
        },
        {
            tag: 'plab',
            protocol: 'http',
            hostPort: '192.168.1.176:1881',
            path: '/agent/v1/getEnv',
            state: false
        },
        {
            tag: 'plab',
            protocol: 'http',
            hostPort: '192.168.1.176:1881',
            path: '/agent/v1/hostnamectl',
            state: false
        },
        {
            tag: 'plab',
            protocol: 'http',
            hostPort: '192.168.1.176:1881',
            path: '/agent/v1/getTemp',
            state: false
        }
    ]

}