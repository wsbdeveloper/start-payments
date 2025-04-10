const cron = require("node-cron");
const logger = require("winston");

const inssueRandomInvoices = require("../services/InvoiceService.js");

function startJobs() {
    const sendInvoicesJob = cron.schedule("* * * * *", async () => {
        await inssueRandomInvoices();
        logger.info(`[${new Date().toISOString()}] Sending invoices to starkbank`);
    });

    if (!sendInvoicesJob.running) {
        sendInvoicesJob.start();
        logger.info(`[${new Date().toISOString()}] Starting cron`);
    }
}

module.exports = startJobs;