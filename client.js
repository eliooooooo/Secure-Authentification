// Generate key in client browser.
const generateKey = async () => {
    let key = await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["sign", "verify"]
    );

    return key;
}

generateKey().then(key => {
    console.log(key);
}).catch(error => {
    console.error(error);
});