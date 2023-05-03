const hre = require("hardhat");
require('dotenv').config()

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Address deploying the contract --> ${deployer.address}`);

  const cloneFactory = await ethers.getContractFactory("CloneFactory");
  const cloneContract = await cloneFactory.deploy();
  console.log(`Clone contract address --> ${cloneContract.address}`);

  const erc20TemplateFactory = await ethers.getContractFactory("InitializableERC20");
  const erc20TemplateContract = await erc20TemplateFactory.deploy();
  console.log(`ERC20Template contract address --> ${erc20TemplateContract.address}`);

  const erc20V3Factory = await ethers.getContractFactory("ERC20V3Factory");
  const erc20V3Contract = await erc20V3Factory.deploy(cloneContract.address, erc20TemplateContract.address, erc20TemplateContract.address, erc20TemplateContract.address, 1);
  console.log(`ERC20V3Factory contract address --> ${erc20V3Contract.address}`);

  await verify(cloneContract.address, []);
  console.log(`Clone contract address ${cloneContract.address} verified`);
  await verify(erc20TemplateContract.address, []);
  console.log(`ERC20Template contract address ${erc20TemplateContract.address} verified`);
  await verify(erc20V3Contract.address, [cloneContract.address, erc20TemplateContract.address, erc20TemplateContract.address, erc20TemplateContract.address, 1]);
  console.log(`ERC20V3Factory contract address ${erc20V3Contract.address} verified`);
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e);
    }
  }
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// $ npx hardhat --network arbgoerli run scripts/deploy.js
// Address deploying the contract --> 0x85dAfB62D4e2a70Ae50aB63093C9417c4bC7593E
// Clone contract address --> 0x34A5e88B92B18E4792ae0128d9E92a7b13FC7751
// ERC20Template contract address --> 0x438A4FA4f1Ac7e54d89946aE5609027E9Ea01633
// ERC20V3Factory contract address --> 0x499e8095372e0957f29855897Ad6052214509b65

// Successfully submitted source code for contract
// contracts/InitializableERC20.sol:InitializableERC20 at 0x438A4FA4f1Ac7e54d89946aE5609027E9Ea01633
// for verification on the block explorer. Waiting for verification result...

// Successfully submitted source code for contract
// contracts/ERC20V3Factory.sol:ERC20V3Factory at 0x499e8095372e0957f29855897Ad6052214509b65
// for verification on the block explorer. Waiting for verification result...

// Successfully submitted source code for contract
// contracts/ERC20V3Factory.sol:CloneFactory at 0x34A5e88B92B18E4792ae0128d9E92a7b13FC7751
// for verification on the block explorer. Waiting for verification result...

// Successfully verified contract InitializableERC20 on Etherscan.
// https://goerli.arbiscan.io/address/0x438A4FA4f1Ac7e54d89946aE5609027E9Ea01633#code
// Successfully verified contract ERC20V3Factory on Etherscan.
// https://goerli.arbiscan.io/address/0x499e8095372e0957f29855897Ad6052214509b65#code
// Successfully verified contract CloneFactory on Etherscan.
// https://goerli.arbiscan.io/address/0x34A5e88B92B18E4792ae0128d9E92a7b13FC7751#code
