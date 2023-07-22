const AdInteractionAggregator = artifacts.require("AdInteractionAggregator"); 

module.exports = function (deployer) {
  deployer.deploy(AdInteractionAggregator)
    .then(() => {
      // Get the deployed contract instance
      return AdInteractionAggregator.deployed();
    })
    .then((zkRollupInstance) => {
      console.log("zk-rollup contract address:", zkRollupInstance.address);
    })
    .catch((error) => {
      console.error("Error deploying the zk-rollup contract:", error);
    });
};
