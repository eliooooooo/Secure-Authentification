import express from 'express';
import * as openpgp from 'openpgp';
import cors from 'cors';

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
    const app = express();
    const port = 5000;

    app.use(cors());

    const { publicKey, privateKey } = await createKeyPair();

    app.post('/authentification/register', (req, res) => {
        res.send(publicKey);
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

startServer();