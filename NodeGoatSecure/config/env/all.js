// default app configuration
const port = process.env.PORT || 5000;
let db = process.env.MONGODB_URI || "mongodb://localhost:27017/nodegoat-v2";
const crypto = require("crypto");
module.exports = {
    port,
    db,
    cookieSecret: "session_cookie_secret_key_here",
    //cryptoKey: "a_secure_key_for_crypto_here",
    cryptoKey: crypto.randomBytes(32),
    cryptoAlgo: "aes256",
    hostName: "localhost",
    environmentalScripts: []
};

