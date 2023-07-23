from web3 import Web3
from env import infura_HTTPProvider

w3 = Web3(Web3.HTTPProvider(infura_HTTPProvider))


def generate_ethereum_account():
    account = w3.eth.account.create()
    private_key = account.privateKey.hex()
    public_key = account.publicKey.hex()
    address = account.address

    return private_key, public_key, address


if __name__ == "__main__":
    private_key, public_key, address = generate_ethereum_account()

    print("Private Key:", private_key)
    print("Public Key:", public_key)
    print("Address:", address)
