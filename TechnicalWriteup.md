## How it's made: Under the Hood of Our Project

Our project seamlessly melds several cutting-edge technologies, each meticulously woven together to revolutionize the advertising landscape.

### Advertiser Portal

At the very start of our advertising pipeline, you'll find our advertiser portal. This is where we harness the capabilities of Web3Storage, utilizing it as a reliable and efficient storage system for advertiser images and redirect URLs.

### Recommendation Engine

As we move further down the pipeline, we encounter the recommendation engine. Here, the MetaMask SDK plays an instrumental role, enabling users to provably attest their ad ratings. The engine communicates securely with our system via the XMTP messaging protocol, utilizing a heuristic based on user ratings and ad cost for optimal performance.

### Ad Serving

To serve an ad, our frontend fetches the image Content Identifier (CID) and the redirect URL from the smart contract. It then leverages the IPFS gateway to load and display the image. Upon clicking the ad, we use the MetaMask SDK once more to gain an attestation, incorporating Worldcoin to ensure proof of personhood and prevent Sybil attacks.

### Aggregation and Payout

The user attestations are then aggregated on a Web2 backend. Upon reaching a critical number of clicks, this data is sent to the smart contract, which uses QuickNode to establish a connection between the advertiser and the publisher. The subsequent payout is carried out transparently on the Ethereum blockchain.

### Future Goals

Looking towards the future, we plan to further empower the recommendation engine by incorporating users' blockchain history for improved targeting and voting. We intend to incorporate user sentiment data into our smart contract using Zero-Knowledge Proofs (ZK) to safeguard user privacy while allowing advertisers to observe user interaction trends with their ads. Our long-term goal is to transition to ZK attestations for enhanced privacy over our current Worldcoin implementation.

We would also like to improve the DAO system to allow for all participants in the Web3 space, be they Advertisers, Publishers, Or users, to have a say in the Ads they see, and be rewarded for doing so!