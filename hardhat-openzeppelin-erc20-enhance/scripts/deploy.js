const hre = require("hardhat");
require('dotenv').config()

async function main() {
  const initialSupply = ethers.utils.parseEther("100000");

  const [deployer] = await ethers.getSigners();
  console.log(`Address deploying the contract --> ${deployer.address}`);

  const tokenFactory = await ethers.getContractFactory("RToken");
  const contract = await tokenFactory.deploy(initialSupply, "0x11D8daf07C15E16bB6E180a3A0FE87278ae770A4");

  console.log(`Token contract address --> ${contract.address}`);

  //console.log(network.config.chainId)
  //console.log(process.env.ETHERSCAN_API_KEY)
  //// verify the contract after deploying
  //if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
  //  console.log("Waiting for block confirmations...");
  //  // NomicLabsHardhatPluginError: Failed to send contract verification request.
  //  // Endpoint URL: https://api-goerli.etherscan.io/api
  //  // Reason: The Etherscan API responded that the address 0x1E4264Db97D8690bB7376aAC98AA851F3C0e2c07 does not have bytecode.
  //  // 延长等待时间，避免上述异常
  //  await hardhatToken.deployTransaction.wait(10);
  //  await verify(hardhatToken.address, [1000]);
  //}
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
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
