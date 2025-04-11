

const starkbank = require("starkbank");
const logger = require("../../../src/utils/loggers.js");
const transfer = require("../../../src/services/TransferService.js");

jest.mock("../../../src/utils/loggers.js", () => ({
    info: jest.fn(),
    error: jest.fn()
}));

jest.mock("starkbank", () => ({
    Project: jest.fn().mockImplementation(() => ({
        id: "mock-project-id"
    })),
    invoice: {
        create: jest.fn().mockReturnValue({ id: "mock-invoice-id" })
    },
    transfer: {
        create: jest.fn().mockReturnValue()
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
describe("TransferService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a transfer successfully", async () => {
        const mockResponse = [{ id: "12345-transfer-id" }];
        starkbank.transfer.create.mockResolvedValue(mockResponse);

        await transfer(1000);

        expect(starkbank.transfer.create).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    amount: 1000,
                    name: "Stark Bank S.A."
                })
            ])
        );

        expect(logger.info).toHaveBeenCalledWith(
            expect.stringContaining("Tranfer send to StarkBank 12345-transfer-id")
        );
    });

    it("should log error when transfer fails", async () => {
        const error = new Error("Something went wrong");
        starkbank.transfer.create.mockRejectedValue(error);

        await transfer(1000);

        expect(logger.error).toHaveBeenCalledWith(
            expect.stringContaining("Error to send for StarkBank the values process without taxes!")
        );
    });
});
