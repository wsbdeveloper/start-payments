const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const handlerWebhook = require("./src/controllers/webhooks/handler.js");
const startJobs = require('./src/jobs/InvoiceJobs.js');

const app = express();

dotenv.config({ path: ".env"});
// routers
app.get("/health", (request, response) => {
    response.status(200).json({
        message: "Service Webhook Starkbank is running!"
    })
})

app.post("/webhook", express.raw({ type: "*/*" }) , handlerWebhook);

app.use(bodyParser.json());

// cron job for send data to starkbank
// UTILS: test send when up api service 
// This method for my support for tests with awaiting jobs time.
// (async () => {
//     await require("./src/services/InvoiceService.js")();
// })();


// Start jobs for simulate messages CQRS
startJobs();

const webhookPort = process.env.PORT || 9444;
app.listen(webhookPort, () => {
    console.log(`Webhook service is running on port ${webhookPort}`);
});
