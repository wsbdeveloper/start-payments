/**
 * DOC: https://starkbank.com/docs/api#invoice - Topic: List Invoices
 * */
export default async function handlerWebhook(request, response) {
    const event = request.body;

    if (event.subscription === "invoice" && event.log.type === "credited") {
        const invoice = event.log.invoice;
        console.log(`Invoice paid: ${invoice.id}`);

        const amount = invoice.amount;
        const fee = invoice.fee;
        const netAmount = amount - fee;

        await transferService.sendToStarkBank(netAmount);
    }

    
    response.status(200).json({ eventState: "Process: Invoice and Credited"});
}