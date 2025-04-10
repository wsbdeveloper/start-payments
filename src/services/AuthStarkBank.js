const starkbank = require('starkbank');

// DOC: https://starkbank.com/docs/api#authentication

// This content is high secret 
// Get value via env vars ou secret manager AWS 
let privateKeyContent = process.env.SECRET_STARKBANK;

// Credentials for environment sandbox
// My user not receive the 2FA for access to sandbox API this moment is commented

// TODO: verificar acesso antes do envio para avaliação


// let user = new starkbank.Project({
//     environment: 'sandbox',
//     id: process.env.STARKBANK_PROJECT_ID,
//     privateKey: privateKeyContent
// });

// send session the user with credentials logged!
// TODO: verificar acesso antes do envio para avaliação
// starkbank.user = user;

module.exports = starkbank;