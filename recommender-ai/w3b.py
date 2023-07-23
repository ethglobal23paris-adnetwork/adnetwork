from web3 import Web3
from env import infura_HTTPProvider, contract_address, EIP20_ABI

w3 = Web3(Web3.HTTPProvider(infura_HTTPProvider))
unicorns = w3.eth.contract(address=contract_address, abi=EIP20_ABI)
