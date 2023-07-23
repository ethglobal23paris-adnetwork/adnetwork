from eth_account import Account
from web3 import Web3
from env import infura_HTTPProvider, contract_address, EIP20_ABI, private_key
import json

w3 = Web3(Web3.HTTPProvider(infura_HTTPProvider))
unicorns = w3.eth.contract(address=contract_address, abi=EIP20_ABI)


# The contract's ABI (read from ABI.json)
zap_abi = json.loads(open("ABI.json", "r").read())

# The contract's address on the Ethereum network
zap_contract_address = contract_address

# Create a contract object
zap_contract = w3.eth.contract(address=zap_contract_address, abi=zap_abi)

# Example usage of the contract functions


# Call the `createAd` function (state-changing operation, requires transaction)
def create_ad(ipfs_cid, redirect_url, category, sender_address):
    transaction = zap_contract.functions.createAd(
        ipfs_cid, redirect_url, category
    ).buildTransaction(
        {
            "from": sender_address,
            "gas": 2000000,  # Adjust the gas value as needed
            "gasPrice": w3.toWei("50", "gwei"),  # Adjust the gas price as needed
        }
    )
    signed_transaction = w3.eth.account.signTransaction(
        transaction, private_key=private_key
    )
    tx_hash = w3.eth.sendRawTransaction(signed_transaction.rawTransaction)
    return tx_hash


# Call the `clicked` function (state-changing operation, requires transaction)
def clicked(ad_id, timestamp, world_id, sender_address):
    transaction = zap_contract.functions.clicked(
        ad_id, timestamp, world_id
    ).buildTransaction(
        {
            "from": sender_address,
            "gas": 2000000,  # Adjust the gas value as needed
            "gasPrice": w3.toWei("50", "gwei"),  # Adjust the gas price as needed
        }
    )
    signed_transaction = w3.eth.account.signTransaction(
        transaction, private_key=private_key
    )
    tx_hash = w3.eth.sendRawTransaction(signed_transaction.rawTransaction)
    return tx_hash


# Call the `reviewAd` function (state-changing operation, requires transaction)
def review_ad(ad_id, world_id, ipfs_cid, review, sender_address):
    transaction = zap_contract.functions.reviewAd(
        ad_id, world_id, ipfs_cid, review
    ).buildTransaction(
        {
            "from": sender_address,
            "gas": 2000000,  # Adjust the gas value as needed
            "gasPrice": w3.toWei("50", "gwei"),  # Adjust the gas price as needed
        }
    )
    signed_transaction = w3.eth.account.signTransaction(
        transaction, private_key=private_key
    )
    tx_hash = w3.eth.sendRawTransaction(signed_transaction.rawTransaction)
    return tx_hash


# For state-changing functions (createAd, clicked, reviewAd), you will receive a transaction hash (tx_hash).
# You can use this transaction hash to track the status of the transaction on the Ethereum network.

# For read-only functions, you can call them directly using the contract object.
# For example, to call the `clicked` function:
# result = zap_contract.functions.clicked(ad_id, timestamp, world_id).call()

# Replace 'ad_id', 'timestamp', and 'world_id' with the appropriate arguments for the function.
# The `call()` method is used for read-only functions, and it will return the result of the function call.
# Note that read-only functions do not require a transaction, so you don't need to sign or send any transactions for them.


def get_wallet_address(private_key):
    if not private_key.startswith("0x"):
        private_key = "0x" + private_key
    if not Web3.is_checksum_address(private_key):
        raise ValueError(
            "Invalid private key format. \
        It should be a valid 32-byte hexadecimal value with or without '0x' prefix."
        )
    account = Account.from_key(private_key)
    return account.address
