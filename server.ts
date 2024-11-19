import express from 'express';
import * as openpgp from 'openpgp';

const app = express();
const port = 3000;


const createKeyPair = async () => {
    const {publicKey, privateKey} = await openpgp.generateKey({
            type: 'ecc',
            curve: 'curve25519Legacy',
            userIDs: [{ name: 'server' }],
            passphrase: 'erigheprger',
            format: 'armored'
    });

    return {publicKey, privateKey};
};

const startServer = async () => {
    const { publicKey, privateKey } = await createKeyPair();

    app.get('/authentification/register', (req, res) => {
        res.send('Hello, world!');
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

startServer();