const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy TradingFlowToken
  const initialSupply = ethers.parseEther("1000000"); // 1 million tokens
  const TradingFlowToken = await ethers.getContractFactory("TradingFlowToken");
  const token = await TradingFlowToken.deploy(
    "TradingFlow Token",
    "TFT",
    initialSupply
  );
  await token.waitForDeployment();
  console.log("TradingFlowToken deployed to:", await token.getAddress());

  // Deploy FlowFund
  const FlowFund = await ethers.getContractFactory("FlowFund");
  const fund = await FlowFund.deploy(
    "TradingFlow Fund",
    "TFF",
    await token.getAddress(),
    deployer.address // Using deployer as carry fee recipient for now
  );
  await fund.waitForDeployment();
  console.log("FlowFund deployed to:", await fund.getAddress());

  // Verify contracts
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await token.deployTransaction.wait(6); // Wait for 6 block confirmations
    await fund.deployTransaction.wait(6);

    console.log("Verifying TradingFlowToken...");
    await hre.run("verify:verify", {
      address: await token.getAddress(),
      constructorArguments: ["TradingFlow Token", "TFT", initialSupply],
    });

    console.log("Verifying FlowFund...");
    await hre.run("verify:verify", {
      address: await fund.getAddress(),
      constructorArguments: [
        "TradingFlow Fund",
        "TFF",
        await token.getAddress(),
        deployer.address,
      ],
    });
  }

  console.log("Deployment completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
