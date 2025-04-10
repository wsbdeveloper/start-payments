const logger = require("winston");

/**
 * DOC: https://starkbank.com/docs/api#invoice - Topic: List Invoices
 * */
async function handlerWebhook(request, response) {
    const event = request.body;

    if (event.subscription === "invoice" && event.log.type === "credited") {
        const invoice = event.log.invoice;
        logger.info(`Invoice paid: ${invoice.id}`);

        // amount received the webhook 
        const amount = invoice.amount;
        // amount received the webhook
        const fee = invoice.fee;
        // calc send value without taxes
        const netAmount = amount - fee;

        await transferService.sendToStarkBank(netAmount);
    }

    
    response.status(200).json({ eventState: "Process: Invoice and Credited"});
}

module.exports = handlerWebhook;