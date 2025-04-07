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
  const initialSupply = hre.ethers.utils.parseEther('1000000');
  const TradingFlowToken =
    await hre.ethers.getContractFactory('TradingFlowToken');
  const token = await TradingFlowToken.deploy(
    'TradingFlow Token',
    'TFT',
    initialSupply
  );
  await token.deployed();
  console.log('TradingFlowToken deployed to:', token.address);

  // 部署 FlowFund
  const FlowFund = await hre.ethers.getContractFactory('FlowFund');
  const fund = await FlowFund.deploy(
    'TradingFlow Fund',
    'TFF',
    token.address,
    deployer.address
  );
  await fund.deployed();
  console.log('FlowFund deployed to:', fund.address);

  // 验证合约
  if (hre.network.name !== 'hardhat') {
    console.log('Verifying contracts...');
    try {
      await hre.run('verify:verify', {
        address: token.address,
        constructorArguments: [
          'TradingFlow Token',
          'TFT',
          initialSupply.toString(),
        ],
      });
      await hre.run('verify:verify', {
        address: fund.address,
        constructorArguments: [
          'TradingFlow Fund',
          'TFF',
          token.address,
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
