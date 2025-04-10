const starkbank = require('starkbank');
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// DOC: https://starkbank.com/docs/api#authentication
// Credentials for environment sandbox
const project = new starkbank.Project({
    environment: 'sandbox',
    id: process.env.STARKBANK_PROJECT_ID,
    // Get value via env vars ou secret manager AWS 
    privateKey: fs.readFileSync(path.resolve(process.env.STARKBANK_PRIVATE_KEY_PATH)).toString()
});

// send session the user with credentials logged!
starkbank.user = project;

module.exports = starkbank;