import { randomUUID } from "crypto";
import starkbank from "starkbank";
import logger from "winston";

// Setup for SDK startbank
starkbank.user = new starkbank.Project({
    // env webhook service
    environment: process.env.ENVIRONMENT,
    // ID the project in platform StartBank
    id: process.env.PROJECT_ID,
    // Key with parser the string
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
});

// função for get cpfs random.
function getRandomCpf() {
    const cpfs = [
        "421.422.423-42",
        "111.222.333-00",
        "999.888.777-10"
    ];
    // return with random in index on array by indexs.
    return cpfs[Math.floor(Math.random() * cpfs.length)];
}

// function for send to startbank
async function inssueRandomInvoices() {
    // generate number count between 8 or 12
    const invoiceCount = Math.floor(Math.random() * 5) + 8;

    // amount random 1000-1119
    const amount = Math.floor(Math.random() * 120) + 1000

    // generate array for length
    const invoices = Array.from({ length: invoiceCount }).map(() => ({
        amount,
        taxId: getRandomCpf(),
        name: "Fulano Aleatorio",
        due: new Date().toISOString(),
        externalId: randomUUID(),
        tags: ["dev-challenge"]
    }));


    // CREATE
    // https://starkbank.com/docs/api#invoice
    try {
        await starkbank.Invoice.create(invoices);
    } catch (error) {
        logger.error("Error create invoices StartBank")
    }
}


export default { inssueRandomInvoices };
