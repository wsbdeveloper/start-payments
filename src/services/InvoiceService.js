import starkbank from "starkbank";

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



module.exports = { getRandomCpf };
