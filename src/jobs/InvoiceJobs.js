import cron from "node-cron";
import logger from "winston";

function startJobs() {
    const sendInvoicesJob = cron.schedule("* * * * *", () => {
        logger.info(`[${new Date().toISOString()}] Sending invoices to startbank`);
    });

    if (!sendInvoicesJob.running) {
        sendInvoicesJob.start();
        logger.info(`[${new Date().toISOString()}] Starting cron`);
    }
}

export default startJobs;