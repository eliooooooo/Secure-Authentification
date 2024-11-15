import * as openPgpKey from './openPgpKey';

document.getElementById('login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userID = (document.getElementById('userID') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const key = await openPgpKey.generateOpenPgpKey(userID, password);

    const publicKeyArmored = await fetch('/authentification/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            publicKey: key.publicKey
        })
    });

    const publicKeyArmoredText = await publicKeyArmored.text();
    const protectedKey = await openPgpKey.protectOpenPgpKey(key, publicKeyArmoredText); 

    openPgpKey.register(protectedKey);
});