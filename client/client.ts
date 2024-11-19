import * as openPgpKey from './openPgpKey';

window.addEventListener('load', async () => {
    document.getElementById('login-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userID = (document.getElementById('login') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        console.log('Logging in as', userID);
        console.log('Password :', password);

        const key = await openPgpKey.generateOpenPgpKey(userID, password);

        const publicKeyArmored = await fetch('http://localhost:5000/authentification/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                publicKey: key.publicKey
            })
        });

        const publicKeyArmoredText = await publicKeyArmored.text();
        console.log('Received public key:', publicKeyArmoredText);
        const protectedKey = await openPgpKey.protectOpenPgpKey(key, publicKeyArmoredText); 

        openPgpKey.register(protectedKey);
    });
});