import * as openPgpKey from './openPgpKey';

window.addEventListener('load', async () => {
    document.getElementById('login-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userID = (document.getElementById('login') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        console.log('Logging in as', userID);
        console.log('Password :', password);

        const key = await openPgpKey.generateOpenPgpKey(userID, password);

        const appPublicKeyResponse = await fetch('http://localhost:5000/authentification/register');
        const appPublicKey = (await appPublicKeyResponse.text()).trim();

        console.log('Response received:', appPublicKey);

        // const protectedKey = await openPgpKey.protectOpenPgpKey(key, appPublicKey); 
        const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nxjMEZz3z3hYJKwYBBAHaRw8BAQdAmOlU8AD259hMXgu7WWqAB2spYEa5+gnp\nshKXZado1sHNBnNlcnZlcnLCAwEwQTFgoAhQWCZz3z3gMLCQcJkM/9PHuvt7x+\nRRQAAAAAABwAIHNhbHRAbm90YXRpb25zLm9wZW5wZ3Bqcy5vcmcx+TWGlhif\nvgeUf4vpfcGjvRq9oLKe/3W32uKYbZty3wUVCggMDgQWAAIBAhkBApsDAh4B\nFiEE8+GuZn5/L4PdSGHwz/08e6+3vH4AAIGgAP9/3z9NFvoMP12UlQ6zh8Hb\nVLjTAygZDWlWALOQRxZX+gEAs4KP/7T2jqn/jSIdsj8enBgu2TLQLQv4kfAb\nj7f8IgnOOARnPfPeEgorBgEEAZdVAQUBAQdAeqmV+jvrsHE0gQYQNY53ayqu\nTm3ft6NyU5ZMut+C30sDAQgHwr4EGBYKAHAFgmc9894JkM/9PHuvt7x+RRQA\nAAAAABwAIHNhbHRAbm90YXRpb25zLm9wZW5wZ3Bqcy5vcmdHPPNd0AmFTPAV\nIuSR3FQDTS/rTv/sIpkpAZ/UjoFAZQKbDBYhBPPhrmZ+fy+D3Uhh8M/9PHuv\nt7x+AADD2AD5AdzYTOulUYXYcQxxz/8ntYXnZIhn+ApIQgpCvv02dgIA/0V3\nSd7dorZyk9e3vWo1fqbQFrHUPmjtFbVmCq78Me4N\n=OvAs\n-----END PGP PUBLIC KEY BLOCK-----\n`;
        const protectedKey = await openPgpKey.protectOpenPgpKey(key, pgpKey); 

        console.log('Protected key:', protectedKey);

        openPgpKey.register(protectedKey);
    });
});