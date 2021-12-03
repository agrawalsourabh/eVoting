var EVote = artifacts.require("./eVote.sol");

module.exports = function(deployer) {
  deployer.deploy(EVote);
};
