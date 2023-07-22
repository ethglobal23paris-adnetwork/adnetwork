# AI Reccomendations: The Heart of our Backend Recommendation Engine

Welcome to the Recommender-AI repository, which houses our advanced backend recommendation engine. This engine is the linchpin in our architecture, bridging the gap between our frontend ad-server and backend services while preserving user privacy and ensuring targeted ad delivery.

## Features

### XMTP Messaging Protocol

Our recommendation engine communicates with the frontend ad-server through the XMTP messaging protocol. This layer of abstraction enhances the modularity of our microservices, ensuring streamlined data flow and seamless inter-service communication.

### User Sentiment Aggregation

The engine is designed to aggregate user interactions such as likes and sentiment towards ads. Furthermore, it also compiles additional data like the cost associated with displaying each ad. By harnessing this wealth of information, our engine ensures data-driven and informed decision making.

### Custom Heuristic for Ad Delivery

When the publisher platform requests an ad, our recommendation engine kicks into action, utilizing a custom heuristic to deliver the right ad to the right user. The heuristic takes into account factors such as user preferences, interaction history, and ad cost, ensuring the ads delivered are as relevant and engaging as possible.

### Privacy-Preserving Design

In a world where privacy is paramount, our recommendation engine stands tall with a design focused on preserving user privacy. We understand the importance of handling user data with care, and our engine is designed to balance targeted ad delivery with the necessary privacy considerations.

### Setup

```
python3 -m venv venv
source venv/bin/activate.fish
poetry install
```

### Run

```
uvicorn serve:app --reload
```
