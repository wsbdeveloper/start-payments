require("./AuthStarkBank");
const starkbank = require("starkbank");
const logger = require("../utils/loggers.js");

// Transfer to Starkbank the values.

async function transfer(amount) {

    // setup
    // these values were mentioned in the email send.
    const transfer = [{
        amount: amount,
        bankCode: "20018183",
        branchCode: "0001",
        accountNumber: "6341320293482496",
        name: "Stark Bank S.A.",
        taxId: "20.018.183/0001-80",
        accountType: "payment",
        tags: ["forward-transfer"]
    }];

    try {
        const evaluate = await starkbank.transfer.create(transfer); 
        logger.info(`Tranfer send to StarkBank ${evaluate[0].id}`)
    } catch (error) {
        logger.error("Error to send for StarkBank the values process without taxes!" + error.message);
    }
}

module.exports = transfer;