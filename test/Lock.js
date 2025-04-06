const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {
  let lock;
  let unlockTime;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    unlockTime = (await ethers.provider.getBlock()).timestamp + ONE_YEAR_IN_SECS;

    const Lock = await ethers.getContractFactory("Lock");
    lock = await Lock.deploy(unlockTime, { value: 1 });
  });

  it("should set the right unlockTime", async function () {
    expect(await lock.unlockTime()).to.equal(unlockTime);
  });

  it("should set the right owner", async function () {
    expect(await lock.owner()).to.equal(owner.address);
  });
});
