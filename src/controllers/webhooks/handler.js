const logger = require("../../utils/loggers");
const starkbank = require("starkbank");
const fs = require("fs");
const transferService = require("./../../services/TransferService");
const auth = require("./../../services/AuthStarkBank");
/**
 * DOC: https://starkbank.com/docs/api#invoice - Topic: List Invoices
 * */

async function handlerWebhook(request, response) {
    // security
    const signature = request.headers["digital-signature"];

    if (!signature) {
        logger.warn("Missing signature header");
        return response.status(400).json({ error: "Missing signature header" });
    }
    try {
        const parsedEvent = await starkbank.event.parse({ content: request.body.toString(), signature });

        const subscription = parsedEvent.event.subscription;
        const invoiceRequest = parsedEvent.event.log.type;

        // Authtoken for receive webhook safe in transaction
        if (subscription === "invoice" && invoiceRequest === "created") {
            const invoice = parsedEvent.event.log.invoice;
            logger.info(`Invoice paid: ${invoice.id}`);

            // amount received the webhook 
            const amount = invoice.amount;
            // amount received the webhook
            const fee = invoice.fee;
            // calc send value without taxes
            const netAmount = amount - fee;

            await transferService(netAmount);
        }


        return response.status(200).json({ eventState: "Process: Invoice and Credited" });
    } catch (error) {
        return response.status(400).json({ error: "Invalid signature or body" });
    }
}

module.exports = handlerWebhook;