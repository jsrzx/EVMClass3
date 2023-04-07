const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("OPZERC20.sol", () => {
    let contractFactory;
    let contract;
    let owner;
    let alice;
    let bob;
    let initialSupply;
    let ownerAddress;
    let aliceAddress;
    let bobAddress;

    beforeEach(async () => {
        [owner, alice, bob] = await ethers.getSigners();
        initialSupply = ethers.utils.parseEther("100000");
        contractFactory = await ethers.getContractFactory("RToken");
        ownerAddress = await owner.getAddress();
        aliceAddress = await alice.getAddress();
        bobAddress = await bob.getAddress();

        contract = await contractFactory.deploy(initialSupply, bobAddress);
    });

    describe("Correct setup", () => {
        it("should be named 'RToken", async () => {
            const name = await contract.name();
            expect(name).to.equal("RToken");
        });

        it("should have correct supply", async () => {
            const supply = await contract.totalSupply();
            expect(supply).to.equal(initialSupply);
        });

        it("owner should have all the supply", async () => {
            const ownerBalance = await contract.balanceOf(ownerAddress);
            expect(ownerBalance).to.equal(initialSupply);
        });
    });

    describe("Core", () => {
        it("test fee and burn transfer", async () => {
            const transferAmount = ethers.utils.parseEther("1000");
            const feeAmount = ethers.utils.parseEther("100");
            const burnAmount = ethers.utils.parseEther("50");

            let aliceBalance = await contract.balanceOf(aliceAddress);
            expect(aliceBalance).to.equal(0);

            await contract.transfer(aliceAddress, transferAmount);

            aliceBalance = await contract.balanceOf(aliceAddress);
            expect(aliceBalance).to.equal(transferAmount.sub(feeAmount).sub(burnAmount));

            bobBalance = await contract.balanceOf(bobAddress);
            expect(bobBalance).to.equal(feeAmount);
        });
    });
});