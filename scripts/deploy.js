const hre = require('hardhat');

async function main() {
  // 确保正确初始化 ethers
  const provider = hre.ethers.provider;
  const signers = await hre.ethers.getSigners();

  if (!signers || signers.length === 0) {
    throw new Error('No signers available. Check your network configuration.');
  }

  const deployer = signers[0];
  console.log('Deploying contracts with account:', deployer.address);
  console.log(
    'Account balance:',
    (await provider.getBalance(deployer.address)).toString()
  );

  // 部署 TradingFlowToken
  const initialSupply = ethers.parseEther('1000000');
  const TradingFlowToken =
    await hre.ethers.getContractFactory('TradingFlowToken');
  const token = await TradingFlowToken.deploy(
    'TradingFlow Token',
    'TFT',
    initialSupply
  );
  await token.waitForDeployment();
  console.log('TradingFlowToken deployed to:', await token.getAddress());

  // 部署 FlowFund
  const FlowFund = await hre.ethers.getContractFactory('FlowFund');
  const fund = await FlowFund.deploy(
    'TradingFlow Fund',
    'TFF',
    await token.getAddress(),
    deployer.address
  );
  await fund.waitForDeployment();
  console.log('FlowFund deployed to:', await fund.getAddress());

  // 验证合约
  if (hre.network.name !== 'hardhat') {
    console.log('Verifying contracts...');
    try {
      await hre.run('verify:verify', {
        address: await token.getAddress(),
        constructorArguments: [
          'TradingFlow Token',
          'TFT',
          initialSupply.toString(),
        ],
      });
      await hre.run('verify:verify', {
        address: await fund.getAddress(),
        constructorArguments: [
          'TradingFlow Fund',
          'TFF',
          await token.getAddress(),
          deployer.address,
        ],
      });
    } catch (e) {
      console.log('Verification failed:', e.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
