import * as openPgpKey from './openPgpKey';
import axios from 'axios';

document.getElementById('login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userID = (document.getElementById('userID') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const key = await openPgpKey.generateOpenPgpKey(userID, password);

    axios('/authentification/register')
    .then(async (response) => {
        const publicKeyArmored = response.data.publicKey;
        const protectedKey = await openPgpKey.protectOpenPgpKey(key, publicKeyArmored);

        openPgpKey.register(protectedKey);
    });
});