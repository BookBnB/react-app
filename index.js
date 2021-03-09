const express = require('express');
const path = require('path');
const apiMetrics = require("prometheus-api-metrics");

const app = express();

app.use(apiMetrics({
    metricsPath: process.env.PROM_METRICS_PATH || "/metrics"
}))

app.use(express.static(path.join(__dirname, 'build'), {
    setHeaders: function (res, path, stat) {
        if(/.*\.(jpg|jpeg|gif|png|css|js)/.test(path)) {
            res.setHeader('Cache-Control', 'public, max-age=604800, immutable')
        } else {
            res.setHeader('Cache-Control', 'max-age=600')
        }
    }
}));

app.get(/.*/, function (request, response, next) {
    response.sendFile(path.join(__dirname, 'build', 'index.html'));
    response.setHeader('Cache-Control', 'max-age=600')
});

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Listening in port ' + port);
});