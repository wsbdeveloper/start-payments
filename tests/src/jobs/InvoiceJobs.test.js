const cron = require("node-cron");
const logger = require("../../../src/utils/loggers.js");
const { inssueRandomInvoices } = require("../../../src/services/InvoiceService.js");
const startJobs = require("../../../src/jobs/InvoiceJobs.js");

jest.mock("node-cron");
jest.mock("../../../src/utils/loggers.js", () => ({
    info: jest.fn(),
}));

jest.mock("../../../src/services/InvoiceService.js", () => ({
    inssueRandomInvoices: jest.fn().mockImplementation(() => {}),
}));

jest.mock("../../../src/services/TransferService.js", () => jest.fn().mockImplementation(() => {
    return {
        status: jest.fn().mockReturnThis(200),
        json: jest.fn().mockReturnThis({ eventState: "Process: Invoice and Credited" })
    }
}));

jest.mock("starkbank", () => ({
    Project: jest.fn().mockImplementation(() => ({
        id: "mock-project-id"
    })),
    invoice: {
        create: jest.fn().mockReturnValue({ id: "mock-invoice-id" })
    },
    event: {
        parse: jest.fn().mockResolvedValue({
            event: {
                subscription: "invoice",
                log: {
                    type: "created",
                    invoice: {
                        id: "123",
                        amount: 1000,
                        fee: 100,
                    }
                }
            }
        }),
    }
}));

describe("Test InvoiceJob", () => {
    let req, res;

    // configuration web express
    beforeEach(() => {
        cron.schedule.mockClear();
        logger.info.mockClear();
    });

    it("Should schedule one job and calling inssueRandomInvoices", async () => {
        const mockStart = jest.fn();
        const mockJob = {
            running: false,
            start: mockStart,
        };

        cron.schedule.mockReturnValue(mockJob);

        startJobs();

        expect(cron.schedule).toHaveBeenCalledWith(
            "0 */3 * * *",
            expect.any(Function)
        );
        // calling cron.schedule with the correct cron expression
        const cronCallback = cron.schedule.mock.calls[0][1];
        await cronCallback();

        expect(inssueRandomInvoices).toHaveBeenCalled();
        expect(mockStart).toHaveBeenCalled();
        expect(logger.info).toHaveBeenCalledWith(expect.stringContaining("Sending invoices"));
        expect(logger.info).toHaveBeenCalledWith(expect.stringContaining("Starting cron"));
    });
})