const fs = require("fs");
const path = require("path");

jest.mock("fs");
jest.mock("path");

jest.mock("starkbank", () => {
    return {
        Project: jest.fn(function (params) {
            return {
                id: params.id,
                environment: params.environment,
                privateKey: params.privateKey
            };
        })
    };
});

const starkbank = require("starkbank");

describe("AuthStarkBank", () => {
    beforeAll(() => {
        process.env.STARKBANK_PROJECT_ID = "test-project-id";
        process.env.STARKBANK_PRIVATE_KEY_PATH = "privatefake-key.pem";

        path.resolve.mockImplementation((p) => p);
        fs.readFileSync.mockReturnValue("privatefake-key");
    });

    it("should export starkbank with authenticated Project", () => {
        const authStarkBank = require("../../../src/services/AuthStarkBank");

        expect(authStarkBank.user).toBeDefined();
        expect(authStarkBank.user.id).toBe("test-project-id");
        expect(authStarkBank.user.environment).toBe("sandbox");
        expect(authStarkBank.user.privateKey).toBe("privatefake-key");

        expect(starkbank.Project).toHaveBeenCalledWith({
            environment: "sandbox",
            id: "test-project-id",
            privateKey: "privatefake-key"
        });
    });
});