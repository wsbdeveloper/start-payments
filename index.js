const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const handlerWebhook = require("./src/controllers/webhooks/handler.js");
const startJobs = require('./src/jobs/InvoiceJobs.js');


(async () => {
    await require("./src/services/InvoiceService")();
})();
const app = express();
app.use(bodyParser.json());
dotenv.config({ path: ".env"});
// routers
app.get("/health", (request, response) => {
    response.status(200).json({
        message: "Service Webhook Starkbank is running!"
    })
})

/**
 * DOC: https://starkbank.com/docs/api#invoice - Topic: List Invoices
 * */
app.post("/webhook", handlerWebhook);

// cron job for send data to starkbank
startJobs();

const webhookPort = process.env.PORT || 9444;
app.listen(webhookPort, () => {
    console.log(`Webhook service is running on port ${webhookPort}`);
});
