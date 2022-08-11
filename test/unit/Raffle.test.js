const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");
const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const { assert, expect } = require("chai");


!developmentChains.includes(network.name)
  ? describe.skip
  : 
  describe("Raffle Unit Tests", async function () {
      let raffle, vrfCoordinatorV2Mock;
      let deployer;

      beforeEach(async function () {
        
        deployer = await getNamedAccounts().deployer;
        const chainId = network.config.chainId;

        await deployments.fixture(["all"]);
        raffle = await ethers.getContract("Raffle", deployer);
        vrfCoordinatorV2Mock = await ethers.getContract(
          "VRFCoordinatorV2Mock",
          deployer
        );

        describe("constructor", async function () {
          it("initializes the raffle correctly", async function () {
            const raffleState = await raffle.getRaffleState();
            const interval = await raffle.getInterval();

            expect(raffleState.toString()).to.equal("0");
            assert.equal(interval.toString(), networkConfig[chainId].interval);
          });
        });
      });
    });
