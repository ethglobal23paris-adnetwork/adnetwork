recommender-ai houses our backend reccomendation engine. This engine communicates to our frontend ad-server through the Xmpt messgaing protocol, to add a layer of abstraction
between our microservices.

The engine backend aggregates likes and user sentiment on ads, as well as other information such as the cost to show the ad.

From here, when a the publisher platform requests an ad, our reccomendation engine uses a custom heuristic to deliver the right ad to the right user, in a privacy preserving manner.

