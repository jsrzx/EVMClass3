var web3;
var chainId;
var accountAddress;


async function connect() {
  if (window.ethereum) {
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.error("User denied account access");
    }
    web3 = new Web3(window.ethereum);
  } else if (window.web3) {
    web3 = new Web3(window.ethereum);
  } else {
    alert("Please install wallet");
  }

  chainId = await web3.eth.getChainId();
  console.log(chainId);

  var blockNumber = await web3.eth.getBlockNumber();
  var block = await web3.eth.getBlock(blockNumber);
  var blockTimestamp = block.timestamp;

  var account = await web3.eth.getAccounts();
  accountAddress = account[0];

  var balance = await web3.eth.getBalance(accountAddress);

  document.getElementById("chain_id").innerText = chainId;
  document.getElementById("block_number").innerText = blockNumber;
  document.getElementById("block_timestamp").innerText = blockTimestamp;
  document.getElementById("account_address").innerText = accountAddress;
  document.getElementById("account_balance").innerText = web3.utils.fromWei(balance);
}

async function publish_token() {

  let erc20V3FactoryABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "cloneFactory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "erc20Template",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "customErc20Template",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "customMintableErc20Template",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "createFee",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newFee",
          "type": "uint256"
        }
      ],
      "name": "ChangeCreateFee",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newCustomMintableTemplate",
          "type": "address"
        }
      ],
      "name": "ChangeCustomMintableTemplate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newCustomTemplate",
          "type": "address"
        }
      ],
      "name": "ChangeCustomTemplate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newStdTemplate",
          "type": "address"
        }
      ],
      "name": "ChangeStdTemplate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "erc20",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "erc20Type",
          "type": "uint256"
        }
      ],
      "name": "NewERC20",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferPrepared",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [],
      "name": "_CLONE_FACTORY_",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_CREATE_FEE_",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_CUSTOM_ERC20_TEMPLATE_",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_CUSTOM_MINTABLE_ERC20_TEMPLATE_",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_ERC20_TEMPLATE_",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_NEW_OWNER_",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_OWNER_",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "_USER_CUSTOM_MINTABLE_REGISTRY_",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "_USER_CUSTOM_REGISTRY_",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "_USER_STD_REGISTRY_",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newFee",
          "type": "uint256"
        }
      ],
      "name": "changeCreateFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "totalSupply",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "decimals",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "tradeBurnRatio",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tradeFeeRatio",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "teamAccount",
          "type": "address"
        }
      ],
      "name": "createCustomERC20",
      "outputs": [
        {
          "internalType": "address",
          "name": "newCustomERC20",
          "type": "address"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "initSupply",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "decimals",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "tradeBurnRatio",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tradeFeeRatio",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "teamAccount",
          "type": "address"
        }
      ],
      "name": "createCustomMintableERC20",
      "outputs": [
        {
          "internalType": "address",
          "name": "newCustomMintableERC20",
          "type": "address"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "totalSupply",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "decimals",
          "type": "uint8"
        }
      ],
      "name": "createStdERC20",
      "outputs": [
        {
          "internalType": "address",
          "name": "newERC20",
          "type": "address"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getTokenByUser",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "stds",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "customs",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "mintables",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "initOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newCustomMintableTemplate",
          "type": "address"
        }
      ],
      "name": "updateCustomMintableTemplate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newCustomTemplate",
          "type": "address"
        }
      ],
      "name": "updateCustomTemplate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newStdTemplate",
          "type": "address"
        }
      ],
      "name": "updateStdTemplate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]

  let erc20V3FactoryAddress = '0x499e8095372e0957f29855897Ad6052214509b65';

  var instance = new web3.eth.Contract(erc20V3FactoryABI, erc20V3FactoryAddress);

  var name = document.getElementById("name").value;
  var totalSupply = document.getElementById("total_supply").value;
  var symbol = document.getElementById("symbol").value;
  var decimals = document.getElementById("decimals").value;

  let accountNonce = await web3.eth.getTransactionCount(accountAddress);
  var gasPrice = await web3.eth.getGasPrice();
  var transferData = instance.methods.createStdERC20(totalSupply, name, symbol, decimals).encodeABI();

  var estimateGasRes = await web3.eth.estimateGas({
    to: erc20V3FactoryAddress,
    data: transferData,
    from: accountAddress,
    value: web3.utils.toHex(10000000),
  })

  console.log(">>> estimateGasRes:", estimateGasRes)

  // The send transactions "from" field must be defined!
  const rawTransaction = {
    from: accountAddress,
    nonce: web3.utils.toHex(accountNonce),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(300000000),
    gas: 100000000,
    to: erc20V3FactoryAddress,
    value: web3.utils.toHex(10000000),
    data: transferData,
  }

  web3.eth.sendTransaction(rawTransaction).on("transactionHash", function (hash) {
    console.log("txHash:", hash);
    document.getElementById("tx_hash").innerText = hash;
  })
}
