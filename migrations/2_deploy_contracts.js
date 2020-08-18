const FoodTransportation = artifacts.require("./FoodTransportation");

module.exports = function(deployer) {
  deployer.deploy(FoodTransportation);
};
