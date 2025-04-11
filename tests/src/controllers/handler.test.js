const handlerWebhook = require("../../../src/controllers/webhooks/handler.js");
const transferService = require("../../../src/services/TransferService.js");
const { Project, event } = require("starkbank");
const starkbank = require("starkbank");


jest.mock("starkbank", () => ({
    Project: jest.fn().mockImplementation(() => ({
        id: "mock-project-id"
    })),
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

describe("Test handlerWebhook controller", () => { 
    let req, res;

    // configuration web express
    beforeEach(() => {
        req = {
            headers: { "digital-signature": "valid-signature" },
            body: '{"event": {"subscription": "invoice", "log": { "type": "created", "invoice": { "id": "123", "amount": 1000, "fee": 100 } }}}'
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("Should return 400 is not signature", async () => {
        req.headers = {};
        await handlerWebhook(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Missing signature header" });
    });

    it("Should return error signature not valid", async () => {
        starkbank.event.parse.mockImplementation(() => { throw new Error("Invalid signature"); });

        await handlerWebhook(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid signature or body" });
    });

})