require("./AuthStarkBank");
const starkbank =  require("starkbank");
const logger = require("../utils/loggers.js");
const { getRandomCpf } = require("./utils");

// function for send to starkbank
async function inssueRandomInvoices() {    
    // generate number count between 8 or 12
    const invoiceCount = Math.floor(Math.random() * 5) + 8;

    // amount random gen
    const amount = Math.floor(Math.random() * (5000 - 100 + 1)) + 100;

    // generate array for length
    const invoices = Array.from({ length: invoiceCount }).map(() => ({
        amount,
        taxId: getRandomCpf(),
        name: "Fulano Aleatorio",
        tags: ["dev-test-challanger-backend"]
    }));


    // CREATE
    // https://starkbank.com/docs/api#invoice
    try {
        const dataResultInvoice = await starkbank.invoice.create(invoices);

        logger.info("Results for send invoice to starkbank:", dataResultInvoice.id);
        return dataResultInvoice;
    } catch (error) {
        throw Error("Error create invoices StarkBank");
    }
}


module.exports = {inssueRandomInvoices};
