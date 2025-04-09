import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());

// routers
app.get("/health", (request, response) => {
    response.status(200).json({
        message: "Service Webhook Startbank is running!"
    })
})


const webhookPort = process.env.PORT || 9444;
app.listen(webhookPort, () => {
    console.log(`Webhook service is running on port ${webhookPort}`);
});
