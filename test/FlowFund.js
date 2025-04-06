const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FlowFund", function () {
  let token;
  let fund;
  let owner;
  let addr1;
  let addr2;
  let carryAddress;
  const initialSupply = ethers.parseEther("1000000");
  const fundName = "TradingFlow Fund";
  const fundSymbol = "TFF";

  beforeEach(async function () {
    [owner, addr1, addr2, carryAddress] = await ethers.getSigners();
    
    // Deploy TradingFlowToken
    const TradingFlowToken = await ethers.getContractFactory("TradingFlowToken");
    token = await TradingFlowToken.deploy("TradingFlow Token", "TFT", initialSupply);

    // Deploy FlowFund
    const FlowFund = await ethers.getContractFactory("FlowFund");
    fund = await FlowFund.deploy(fundName, fundSymbol, await token.getAddress(), carryAddress.address);

    // Approve fund to spend tokens
    await token.approve(await fund.getAddress(), initialSupply);
  });

  describe("Deployment", function () {
    it("Should set the correct token and carry address", async function () {
      expect(await fund.token()).to.equal(await token.getAddress());
      expect(await fund.carryAddress()).to.equal(carryAddress.address);
    });

    it("Should create initial fund manager NFT for owner", async function () {
      expect(await fund.ownerOf(1)).to.equal(owner.address);
      const manager = await fund.fundManagers(1);
      expect(manager.performanceFee).to.equal(1500); // 15%
    });
  });

  describe("Fund Manager NFTs", function () {
    it("Should create new fund manager", async function () {
      await fund.createFundManager(addr1.address, 1000, "ipfs://metadata1");
      expect(await fund.ownerOf(2)).to.equal(addr1.address);
      
      const manager = await fund.fundManagers(2);
      expect(manager.performanceFee).to.equal(1000);
      expect(manager.metadata).to.equal("ipfs://metadata1");
    });

    it("Should update fund manager metadata", async function () {
      await fund.createFundManager(addr1.address, 1000, "ipfs://metadata1");
      await fund.connect(addr1).updateFundManagerMetadata(2, "ipfs://metadata2");
      
      const manager = await fund.fundManagers(2);
      expect(manager.metadata).to.equal("ipfs://metadata2");
    });

    it("Should update performance fee", async function () {
      await fund.createFundManager(addr1.address, 1000, "ipfs://metadata1");
      await fund.connect(addr1).updatePerformanceFee(2, 2000);
      
      const manager = await fund.fundManagers(2);
      expect(manager.performanceFee).to.equal(2000);
    });
  });

  describe("Investment Operations", function () {
    const investAmount = ethers.parseEther("1000");

    beforeEach(async function () {
      // Transfer some tokens to addr1
      await token.transfer(addr1.address, investAmount);
      await token.connect(addr1).approve(await fund.getAddress(), investAmount);
    });

    it("Should allow investment", async function () {
      await fund.connect(addr1).invest(investAmount);
      const investor = await fund.getInvestorInfo(addr1.address);
      expect(investor[0]).to.equal(investAmount); // totalInvestment
    });

    it("Should process withdrawal requests", async function () {
      await fund.connect(addr1).invest(investAmount);
      await fund.connect(addr1).requestWithdrawal(investAmount);
      
      const investor = await fund.getInvestorInfo(addr1.address);
      expect(investor[4]).to.be.true; // hasActiveWithdrawal

      // Wait for withdrawal delay
      await ethers.provider.send("evm_increaseTime", [600]); // 10 minutes
      await ethers.provider.send("evm_mine");

      const initialBalance = await token.balanceOf(addr1.address);
      await fund.processWithdrawal(addr1.address);
      
      expect(await token.balanceOf(addr1.address)).to.equal(initialBalance + investAmount);
    });

    it("Should distribute and claim dividends", async function () {
      // Invest
      await fund.connect(addr1).invest(investAmount);
      
      // Send dividends to fund
      const dividendAmount = ethers.parseEther("100");
      await token.transfer(await fund.getAddress(), dividendAmount);
      
      // Distribute dividends
      await fund.distributeDividends();
      
      // Claim dividends
      const initialBalance = await token.balanceOf(addr1.address);
      const initialCarryBalance = await token.balanceOf(carryAddress.address);
      
      await fund.connect(addr1).claimDividends(1); // Use fund manager ID 1
      
      // Check balances after claim
      const finalBalance = await token.balanceOf(addr1.address);
      const finalCarryBalance = await token.balanceOf(carryAddress.address);
      
      expect(finalCarryBalance - initialCarryBalance).to.equal(dividendAmount * BigInt(1500) / BigInt(10000)); // 15% carry fee
      expect(finalBalance - initialBalance).to.equal(dividendAmount * BigInt(8500) / BigInt(10000)); // 85% to investor
    });
  });
});
