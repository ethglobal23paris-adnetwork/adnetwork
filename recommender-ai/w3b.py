from eth_account import Account
from web3 import Web3
from env import infura_HTTPProvider, dap_contract_address, private_key, wallet_address
import json

w3 = Web3(Web3.HTTPProvider(infura_HTTPProvider))

# The contract's ABI (read from ABI.json)
with open("ABI.json", "r") as f:
    zap_abi = json.load(f)

# The contract's address on the Ethereum network
zap_contract_address = dap_contract_address

# Create a contract object
zap_contract = w3.eth.contract(address=zap_contract_address, abi=zap_abi)


# Call the `clicked` function (state-changing operation, requires transaction)
def clicked(ad_id, timestamp, world_id, sender_address):
    nonce = w3.eth.get_transaction_count(wallet_address)
    transaction = zap_contract.functions.clicked(
        ad_id, timestamp, world_id
    ).build_transaction(
        {
            "from": sender_address,
            "gas": 2000000,  # Adjust the gas value as needed
            "gasPrice": w3.to_wei("50", "gwei"),  # Adjust the gas price as needed
            "nonce": nonce,
        }
    )
    signed_transaction = w3.eth.account.sign_transaction(
        transaction, private_key=private_key
    )
    tx_hash = w3.eth.send_raw_transaction(signed_transaction.rawTransaction)
    return str(tx_hash)


# Call the `reviewAd` function (state-changing operation, requires transaction)
def review_ad(ad_id, world_id, ipfs_cid, review):
    bt = zap_contract.functions.reviewAd(ad_id, world_id, ipfs_cid, review)
    nonce = w3.eth.get_transaction_count(wallet_address)

    transaction = bt.build_transaction(
        {
            "from": wallet_address,
            "gas": 2000000,  # Adjust the gas value as needed
            "gasPrice": w3.to_wei("50", "gwei"),  # Adjust the gas price as needed
            "nonce": nonce,
        }
    )
    signed_transaction = w3.eth.account.sign_transaction(
        transaction,
        private_key=private_key,
    )
    tx_hash = w3.eth.send_raw_transaction(signed_transaction.rawTransaction)
    return str(tx_hash)


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
