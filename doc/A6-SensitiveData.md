# A6 - Sensitive Data Exposure 

### server.js

Il file `server.js` presenta una vulnerabilità di tipo Sensitive Data Exposure in quanto usa una connessione HTTP per comunicare con il server.

```js
const http = require("http");

http.createServer(app).listen(port, () => {
    console.log(`Express http server listening on port ${port}`);
});
```

#### 🛡️ Mitigation
```js
const fs = require("fs");
const https = require("https");
const path = require("path");
const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, "./artifacts/cert/server.key")),
    cert: fs.readFileSync(path.resolve(__dirname, "./artifacts/cert/server.crt"))
};

https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Express https server listening on port ${port}`);
});

```

💡 **Spiegazione**:
- ✅ HTTPS protegge i dati in transito, evitando che informazioni sensibili vengano esposte a utenti non autorizzati attraverso intercettazioni.

### profile-dao.js
Nel file `profile-dao.js` le informazioni sensibili degli utenti sono salvate in plaintext:

```js

function ProfileDAO(db) {

    "use strict";

    if (false === (this instanceof ProfileDAO)) {
        console.log("Warning: ProfileDAO constructor called without 'new' operator");
        return new ProfileDAO(db);
    }

    const users = db.collection("users");

    this.updateUser = (userId, firstName, lastName, ssn, dob, address, bankAcc, bankRouting, callback) => {

        // Create user document
        const user = {};
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (address) {
            user.address = address;
        }
        if (bankAcc) {
            user.bankAcc = bankAcc;
        }
        if (bankRouting) {
            user.bankRouting = bankRouting;
        }
        if (ssn) {
            user.ssn = ssn;
        }
        if (dob) {
            user.dob = dob;
        }
       
        users.update({
                _id: parseInt(userId)
            }, {
                $set: user
            },
            err => {
                if (!err) {
                    console.log("Updated user profile");
                    return callback(null, user);
                }

                return callback(err, null);
            }
        );
    };

    this.getByUserId = (userId, callback) => {
        users.findOne({
                _id: parseInt(userId)
            },
            (err, user) => {
                if (err) return callback(err, null);

                callback(null, user);
            }
        );
    };
}

module.exports = { ProfileDAO };
```

#### 🛡️ Mitigation
```js
function ProfileDAO(db) {

    "use strict";

    if (false === (this instanceof ProfileDAO)) {
        console.log("Warning: ProfileDAO constructor called without 'new' operator");
        return new ProfileDAO(db);
    }

    const users = db.collection("users");

    const crypto = require("crypto");
    const config = require("../../config/config");

    const createIV = () => {
        // create a random salt for the PBKDF2 function - 16 bytes is the minimum length according to NIST
        const salt = crypto.randomBytes(16);
        return crypto.pbkdf2Sync(config.cryptoKey, salt, 100000, 16, "sha512");
    };

    // Helper methods to encryt / decrypt
    const encrypt = (toEncrypt) => {
        config.iv = createIV();
        const cipher = crypto.createCipheriv(config.cryptoAlgo, config.cryptoKey, config.iv);
        return `${cipher.update(toEncrypt, "utf8", "hex")} ${cipher.final("hex")}`;
    };

    const decrypt = (toDecrypt) => {
        const decipher = crypto.createDecipheriv(config.cryptoAlgo, config.cryptoKey, config.iv);
        return `${decipher.update(toDecrypt, "hex", "utf8")} ${decipher.final("utf8")}`;
    };
    
    
    this.updateUser = (userId, firstName, lastName, ssn, dob, address, bankAcc, bankRouting, callback) => {

        // Create user document
        const user = {};
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (address) {
            user.address = address;
        }
        if (bankAcc) {
            user.bankAcc = encrypt(bankAcc);
        }
        if (bankRouting) {
            user.bankRouting = encrypt(bankRouting);
        }
        if (ssn) {
            user.ssn = encrypt(ssn);
        }
        if (dob) {
            user.dob = encrypt(dob);
        }
    

        users.update({
                _id: parseInt(userId)
            }, {
                $set: user
            },
            err => {
                if (!err) {
                    console.log("Updated user profile");
                    return callback(null, user);
                }

                return callback(err, null);
            }
        );
    };

    this.getByUserId = (userId, callback) => {
        users.findOne({
                _id: parseInt(userId)
            },
            (err, user) => {
                if (err) return callback(err, null);

                user.bankAcc = user.bankAcc ? decrypt(user.bankAcc) : "";
                user.bankRouting = user.bankRouting ? decrypt(user.bankRouting) : "";
                user.ssn = user.ssn ? decrypt(user.ssn) : "";
                user.dob = user.dob ? decrypt(user.dob) : "";

                callback(null, user);
            }
        );
    };
}

module.exports = { ProfileDAO };


```

💡 **Spiegazione**:
- ✅ Ogni campo sensibile viene crittografato con l’algoritmo createCipheriv prima di essere salvato nel database.
    - Il metodo encrypt() usa:

        - Un algoritmo definito in config.cryptoAlgo (`aes256`)

        - Una chiave simmetrica (config.cryptoKey = `crypto.randomBytes(32)`)

        - Un IV (Initialization Vector) creato dinamicamente

- ✅ Quando i dati vengono letti, vengono decifrati tramite il metodo `decrypt()`. Questo impedisce che dati sensibili siano visibili in chiaro nel database o nelle query raw.



[🔙](01-as-is.md#a6---sensitive-data-exposure)

