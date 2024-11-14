from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey, X25519PublicKey
from cryptography.hazmat.primitives.kdf.hkdf import HKDF

# Generate a private key for use in the exchange.
private_key = X25519PrivateKey.generate()
public_key = private_key.public_key()

psw = "password"

# Encrypt the private key with a password
encrypt_private_key = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.BestAvailableEncryption(psw.encode())
)

# Generate another private key to simulate the server's private key
server_private_key = X25519PrivateKey.generate()
server_public_key = server_private_key.public_key()

# Create shared key to encrypt the couple public/private key
shared_key = private_key.exchange(server_public_key)


# Encrypt the couple public/private key with the shared key