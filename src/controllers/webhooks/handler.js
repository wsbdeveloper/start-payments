const logger = require("winston");
const transferService = require("./../../services/TransferService");
/**
 * DOC: https://starkbank.com/docs/api#invoice - Topic: List Invoices
 * */

async function handlerWebhook(request, response) {
    //header starkbank send
    const headers = request.headers;

    logger.info("HEADERS: " + headers);

    const event = request.body;

    // Authtoken for receive webhook safe in transaction
    if (event.subscription === "invoice" && event.log.type === "credited") {
        const invoice = event.log.invoice;
        logger.info(`Invoice paid: ${invoice.id}`);

        // amount received the webhook 
        const amount = invoice.amount;
        // amount received the webhook
        const fee = invoice.fee;
        // calc send value without taxes
        const netAmount = amount - fee;

        await transferService(netAmount);
    }

    
    response.status(200).json({ eventState: "Process: Invoice and Credited"});
}

module.exports = handlerWebhook;