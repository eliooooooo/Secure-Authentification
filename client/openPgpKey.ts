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
    const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
        curve: 'curve25519',
        userIds: [{ name: userID }],
        passphrase: password
    });

    return new OpenPgpKey(userID, publicKeyArmored, privateKeyArmored);
}

export async function protectString(str:string, publicKey:openpgp.key.Key)
{
    const { keys: [key] } = await openpgp.key.readArmored(publicKey.armor());
    return openpgp.encrypt({
        message: openpgp.message.fromText(str),
        publicKeys: [key]
    });
}

export async function protectOpenPgpKey(key:OpenPgpKey, publicKeyArmored:string) :Promise<OpenPgpKey>
{
    const { keys: [publicKey] } = await openpgp.key.readArmored(publicKeyArmored);

    let cipherPublicKey = await protectString(key.publicKey, publicKey);
    let cipherPrivateKey = await protectString(key.privateKey, publicKey);

    return new OpenPgpKey (key.userID, cipherPublicKey as unknown as string, key.privateKey = cipherPrivateKey as unknown as string);
}

export function register(OpenPgpKey:OpenPgpKey) 
{
    // Send protected key to the server via an API.
}