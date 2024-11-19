import * as openpgp from 'openpgp';

export class OpenPgpKey {
    public userID:string;
    public publicKey:string;
    public privateKey:string;

    constructor(userID: string, publicKey: string, privateKey: string) {
        this.userID = userID;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }
}

export async function generateOpenPgpKey(userID: string, password: string): Promise<OpenPgpKey> {
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'ecc',
        curve: 'curve25519Legacy',
        userIDs: [{ name: userID }],
        passphrase: password,
        format: 'armored'
    });

    return new OpenPgpKey(userID, publicKey, privateKey);
}

export async function protectString(str:string, publicKey:openpgp.Key)
{
    return openpgp.encrypt({
        message: await openpgp.createMessage({ text: str }),
        encryptionKeys: publicKey
    });
}

export async function protectOpenPgpKey(key:OpenPgpKey, publicKeyArmored:string) :Promise<OpenPgpKey>
{
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    let cipherPublicKey = await protectString(key.publicKey, publicKey);
    let cipherPrivateKey = await protectString(key.privateKey, publicKey);

    return new OpenPgpKey (key.userID, cipherPublicKey as unknown as string, key.privateKey = cipherPrivateKey as unknown as string);
}

export function register(OpenPgpKey:OpenPgpKey) 
{
    // Send protected key to the server via an API.
}