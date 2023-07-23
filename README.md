# Web 3 Advertising Network (zk-ads)

![Logo](assets/logo.png)

[Slides presentation](https://docs.google.com/presentation/d/1f45JjelZp2ldz2nsQdrBUq3VKB1Nlqr8tpfnOB8LZvU/edit?usp=sharing)

## Introduction

In today's digital landscape, massive online services have become central hubs for advertising, which often results in the aggregation and centralization of customer data. This raises concerns about data privacy and security. To address this issue, our Web 3 Advertising Network aims to revolutionize the advertising industry by leveraging decentralized technologies and open protocols to provide a more transparent, secure, and privacy-focused advertising ecosystem.

### Advertising Network Diagram

The advertising network consists of three key actors:

1. **Target Audience**: Represents the users who will be exposed to advertisements while using various online services and platforms.

2. **Advertiser**: Represents individuals or entities looking to promote their products, services, or content to the target audience.

3. **Ad Display**: Represents the space or medium where the advertisements are presented to the target audience.

All other components that facilitate the flow of advertising content are referred to as "piping." In Web 2 advertising networks, this piping is typically controlled by centralized entities like Google. However, in the Web 3 Advertising Network, we embrace decentralization, allowing for more open and transparent communication between the involved parties.

## Benefits

Our Web 3 Advertising Network offers several key benefits that set it apart from traditional Web 2 advertising platforms:

### 1. Enhanced Ad Targeting with AI

Utilizing advanced artificial intelligence algorithms, our advertising network can better understand the preferences and behaviors of the target audience. This ensures that advertisements are more relevant and personalized, leading to higher engagement and conversion rates for advertisers.

### 2. Decentralized Communication with xTMP

The network incorporates the **eXtensible Text-based Messaging Protocol (xTMP)** to facilitate communication between advertisers and the target audience. This decentralized messaging protocol ensures that no single entity controls or monitors the communication, enhancing privacy and data security for all participants.

### 3. Transparent Ad Moderation

In the Web 3 Advertising Network, ad moderation processes are carried out through community-driven mechanisms. The transparency and fairness of these processes are maintained by leveraging decentralized consensus algorithms, ensuring that no central authority can unduly influence ad approvals or rejections.

### 4. Chat Integration

Our advertising network also provides an integrated chat feature that allows direct and secure communication between advertisers and the target audience. This fosters a more engaging and interactive advertising experience, allowing for real-time feedback and customer support.

### 5. Open and Interoperable

By embracing Web 3 technologies and open protocols, our advertising network enables seamless integration with various decentralized applications and platforms. This openness encourages innovation and ensures that advertisers and developers can leverage the network's capabilities to create unique and creative advertising campaigns.

# Repository Overview

This is a mono-repo for the zKAD network project. Folders contain microservices:

- `xmtp-anonymizer`: a relay server that keeps the identity of the sender and receiver of XMTP messages anonymous.

- `recommender-ai`: ads recommendation service that takes in a user's xMTP messages and recommends ads to the user.

- `zk-ads`: contains the front-end and back-end for the zKAD network, smart contracts, and the CLI.

# Integrations and Partners

## MetaMask SDK

We utilized the MetaMask SDK for user login, address and attestation. We first use metamask as the user login to immedeitly secure the users wallet address. This is reqiured from the moment the user enters the page as we need to query the chain and run our reccomendation engine, and finally load an ad from Web3Storage all before a user can see the ads. MetaMask allows us to do this quickly and easily. 

We also use the MetaMask SDK to allow for user attestation upon rating an AD. This is a core part of ZAP, as it enables our DAO model and empowers our reccomendation engine.

Here is where we use Metamask to login [const MetamaskLoginButton = () => {](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/e0707eddcc6ebea8f31becccc5f860cea2aeddad/zk-ads/client/src/routes/Login.js#L75)

Here is where we instantiate the SDK [const mmsdk = new MetaMaskSDK({](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/37bddf5abd4954339155b0c14b714310ff1d7f2a/zk-ads/client/src/helpers/Ethereum.js#L8-L22)

And here is where we use it to gather the users address [const MetamaskInfo = () => {](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/37bddf5abd4954339155b0c14b714310ff1d7f2a/zk-ads/client/src/helpers/MetamaskInfo.js#L4-L28)


## Web3Storage and IPFS

Web3Storage is used by Zap to upload and store advertisment data (Including AD banner images, and Redirect URLs) in a dencentralized system. When advertisers create a new AD our frontend uploads to Web3Storage directly, allowing us to bypass the need for a centralized backend. The CIDs are stored in the smart contract allowing all of our systems to access all of the currently available advertisements, and thier CIDs.

Here is our backend endpoint[app.post('/upload', upload.single('image'), async (req, res) => {](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/e0707eddcc6ebea8f31becccc5f860cea2aeddad/ad-portal/backend/server.js#L27)

Here is our retreival code [export async function ipfs_retrieve (cid) {](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/e0707eddcc6ebea8f31becccc5f860cea2aeddad/zk-ads/client/src/helpers/ipfs.js#L9)

Here is our front end retrieval method [const handleUpload = async () => {](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/e0707eddcc6ebea8f31becccc5f860cea2aeddad/zk-ads/client/src/components/AdsUpload.js#L47)


## Linea 

We deployed ZAP using Linea's ZK rollup. This allows us to deploy on infura aswell. Using Linea as a ZK rollup allows us to further abstract users on chain identities, ensuring that our platform is privacy preserving.

Here is were we connect with Infura[w3 = Web3(Web3.HTTPProvider(infura_HTTPProvider))](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/e0707eddcc6ebea8f31becccc5f860cea2aeddad/recommender-ai/w3b.py#L6)

Here is where we generate our keys and account [w3 = Web3(Web3.HTTPProvider(infura_HTTPProvider))](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/e0707eddcc6ebea8f31becccc5f860cea2aeddad/recommender-ai/generate_key.py#L4-L7)


## World Coin

We use Worldcoin as our second login layer to ensure proof of personhood and to allow for ZK attestations. Having the User authenticate with worldcoin greatly bolsters us against Cybil attacks because it ensures proof of personhood. The other advantage of Worldcoin is that we are able to smooth out the user expierince. When a user clicks on an ad, they previously needed to sign an attestation, and we needed to use on-chain queryies to verify personhood, or atleast attempt to. Implementing Worldcoin simplified our algoirthm while greatly increaseing the robustness. 

Here is our worldcoin login[const WorldcoinLoginButton = () => {](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/e0707eddcc6ebea8f31becccc5f860cea2aeddad/zk-ads/client/src/routes/Login.js#L46)


## XMTP

We use XMTP to add a layer of abstraction on top of our backend calls. Currently our reccomendation algorithm lives on am endpoint. To communicate with our engine endpoint we use XMTP to send a message to our node relay, which then relays the message to our flask backend where the engine lives. The engine sends the results back the front end using the same approach. We also use xmtp to send rating data to our engine.


Here is where we send rating data to the engine using XMTP [export const handleRatingChange = async (ad_id, newValue) => {](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/e0707eddcc6ebea8f31becccc5f860cea2aeddad/zk-ads/client/src/helpers/xmtp.js#L4)



Here is our relay [const AI_BACKEND = process.env.AI_BACKEND;](https://github.com/ethglobal23paris-adnetwork/adnetwork/blob/e0707eddcc6ebea8f31becccc5f860cea2aeddad/xmtp-anonymizer/relay.js#L6-L20)




See the README.md in each folder for more details on launching the microservices.
