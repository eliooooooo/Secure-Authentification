import * as openPgpKey from './openPgpKey';
import axios from 'axios';

document.getElementById('login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userID = (document.getElementById('userID') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const key = await openPgpKey.generateOpenPgpKey(userID, password);

    axios({
        method: 'post',
        url: '/authentification/register'
    })
    .then(async (response:any) => {
        const publicKeyArmored = response.data.publicKey;
        const protectedKey = await openPgpKey.protectOpenPgpKey(key, publicKeyArmored);

        openPgpKey.register(protectedKey);
    })
    .catch(error => {
        console.error(error);
    });
});