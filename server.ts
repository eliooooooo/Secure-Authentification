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
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const { publicKey, privateKey } = await createKeyPair();

    app.get('/authentification/register', (req, res) => {
        res.status(200).json({ publicKey });
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

startServer();