from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey, X25519PublicKey
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from flask import Flask, jsonify

# Generate the server private/public key for use in the exchange.
private_key = X25519PrivateKey.generate()
public_key = private_key.public_key()
print(public_key.public_bytes(encoding=serialization.Encoding.PEM, format=serialization.PublicFormat.SubjectPublicKeyInfo))
print(private_key.private_bytes(encoding=serialization.Encoding.PEM, format=serialization.PrivateFormat.PKCS8, encryption_algorithm=serialization.NoEncryption()))

app = Flask(__name__)

@app.route('/authentification/register', methods=['GET'])
def get_public_key():
    return jsonify({
        'public_key': public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ).decode('utf-8')
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# Create shared key to encrypt the couple public/private key
# ??
shared_key = private_key.exchange(public_key)