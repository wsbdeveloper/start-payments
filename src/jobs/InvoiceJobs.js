const cron = require("node-cron");
const logger = require("winston");

const inssueRandomInvoices = require("../services/InvoiceService.js");

function startJobs() {
    // set interval 3 hours
    const sendInvoicesJob = cron.schedule("0 */3 * * *", async () => {
        logger.info(`[${new Date().toISOString()}] Sending invoices to starkbank`);
        await inssueRandomInvoices();
    });

    if (!sendInvoicesJob.running) {
        sendInvoicesJob.start();
        logger.info(`[${new Date().toISOString()}] Starting cron`);
    }
}

module.exports = startJobs;