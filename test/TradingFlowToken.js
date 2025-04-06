const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TradingFlowToken", function () {
  let token;
  let owner;
  let addr1;
  let addr2;
  const name = "TradingFlow Token";
  const symbol = "TFT";
  const initialSupply = ethers.parseEther("1000000"); // 1 million tokens

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const TradingFlowToken = await ethers.getContractFactory("TradingFlowToken");
    token = await TradingFlowToken.deploy(name, symbol, initialSupply);
  });

  describe("Deployment", function () {
    it("Should set the right name and symbol", async function () {
      expect(await token.name()).to.equal(name);
      expect(await token.symbol()).to.equal(symbol);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
      expect(ownerBalance).to.equal(initialSupply);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("100");
      
      // Transfer from owner to addr1
      await token.transfer(addr1.address, transferAmount);
      expect(await token.balanceOf(addr1.address)).to.equal(transferAmount);

      // Transfer from addr1 to addr2
      await token.connect(addr1).transfer(addr2.address, transferAmount);
      expect(await token.balanceOf(addr2.address)).to.equal(transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});
