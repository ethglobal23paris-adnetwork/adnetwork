from web3 import Web3

# Connect to an Ethereum node or provider
# Replace 'http://your_ethereum_node_url' with the URL of your Ethereum node or provider.
w3 = Web3(
    Web3.HTTPProvider(
        "https://linea-goerli.infura.io/v3/51c64d09ec504c32bc832829d8211891"
    )
)


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
