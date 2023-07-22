# Web 3 Advertising Network (zk-ads)

![Advertising Network Diagram](link_to_graph_diagram.png)

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

See the README.md in each folder for more details on launching the microservices.
