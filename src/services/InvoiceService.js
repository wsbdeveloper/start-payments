require("./AuthStarkBank");
const { randomUUID } = require("crypto");
const starkbank =  require("starkbank");
const logger = require("winston");
const { getRandomCpf } = require("./utils");

// function for send to starkbank
async function inssueRandomInvoices() {    
    // generate number count between 8 or 12
    const invoiceCount = Math.floor(Math.random() * 5) + 8;

    // amount random 1000-1119
    const amount = Math.floor(Math.random() * 120) + 10000

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

        logger.info("Results for send invoice to starkbank:", dataResultInvoice);

    } catch (error) {
        throw Error("Error create invoices StarkBank" + error);
    }
}


module.exports = inssueRandomInvoices;
