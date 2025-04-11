// tests/invoice.test.js
const inssueRandomInvoices = require("../../../src/services/InvoiceService.js");
const starkbank = require("starkbank");
const utils = require("../../../src/services/utils.js");

// Mock function external library
jest.mock("starkbank", () => ({
    Invoice: {
        create: jest.fn()
    }
}));

jest.mock("../../../src/services/utils", () => ({
    getRandomCpf: jest.fn(() => "123.456.789-00")
}));

jest.mock("../../../src/services/AuthStarkBank", () => ({
    Project: jest.fn()
}));

describe("issueRandomInvoices", () => {
    it("should create between 8 and 12 invoices with valid structure", async () => {
        // Mock do retorno da StarkBank
        const fakeInvoices = Array.from({ length: 10 }, (_, i) => ({
            id: `invoice-${i}`
        }));

        // 
        starkbank.Invoice.create.mockResolvedValue(fakeInvoices);

        const created = await inssueRandomInvoices();

        expect(created.length).toBeGreaterThanOrEqual(8);
        expect(created.length).toBeLessThanOrEqual(12);

        expect(starkbank.Invoice.create).toHaveBeenCalledTimes(1);
        const invoicesSent = starkbank.Invoice.create.mock.calls[0][0];

        invoicesSent.forEach(invoice => {
            expect(invoice).toHaveProperty("amount");
            expect(invoice).toHaveProperty("taxId", "123.456.789-00");
            expect(invoice).toHaveProperty("name", "Fulano Aleatorio");
            expect(invoice).toHaveProperty("tags", ["dev-test-challanger-backend"]);
            expect(invoice).toHaveProperty("due");
            expect(invoice).toHaveProperty("externalId");
        });
    });

    it("should throw if starkbank.Invoice.create fails", async () => {
        starkbank.Invoice.create.mockRejectedValue(new Error("StarkBank error"));

        try {
            await inssueRandomInvoices();
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("Error create invoices StarkBank");
        }
    });
});
