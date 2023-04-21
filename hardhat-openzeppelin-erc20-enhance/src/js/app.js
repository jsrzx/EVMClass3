var web3;
var chainId;
var accountAddress;

erc20Abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "initialSupply",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "feeAddr",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
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
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "burnAmount",
          "type": "uint256"
        }
      ],
      "name": "burnToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deadAddr",
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
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "mintAmount",
          "type": "uint256"
        }
      ],
      "name": "mintToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
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
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
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
    }
  ]

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

async function read() {
    var contractAddress = document.getElementById("contract_address").value;
    var instance =  new web3.eth.Contract(erc20Abi, contractAddress);
    var tokenSymbol = await instance.methods.symbol().call();
    var tokenTotalSupply = await instance.methods.totalSupply().call();
    var balance = await instance.methods.balanceOf(accountAddress).call();

    document.getElementById("token_symbol").innerText =tokenSymbol;
    document.getElementById("token_totalSupply").innerText =web3.utils.fromWei(tokenTotalSupply);
    document.getElementById("token_balance").innerText = web3.utils.fromWei(balance);
}

async function read_address_balance() {
    var contractAddress = document.getElementById("contract_address").value;
    var address  = document.getElementById("address").value;
    var instance =  new web3.eth.Contract(erc20Abi, contractAddress);
    var balance = await instance.methods.balanceOf(address).call();
    document.getElementById("address_balance").innerText = web3.utils.fromWei(balance);
}

async function mint_token() {
    var contractAddress = document.getElementById("contract_address").value;
    var target = document.getElementById("target").value;
    var amount = document.getElementById("amount").value;
    var instance =  new web3.eth.Contract(erc20Abi, contractAddress);
    var mintTokenData = instance.methods.mintToken(target, amount).encodeABI();

    var estimateGasRes  = await web3.eth.estimateGas({
        to: contractAddress,
        data: mintTokenData,
        from: accountAddress,
        value:'0x0'
    })

    var gasPrice = await web3.eth.getGasPrice();
    let nonce  =await web3.eth.getTransactionCount(accountAddress);
    let rawTransaction = {
        from: accountAddress,
        to: contractAddress,
        nonce: web3.utils.toHex(nonce),
        gasPrice: gasPrice,
        gas: estimateGasRes * 2,
        value: '0x0',
        data: mintTokenData,
        chainId: chainId
    }

    web3.eth.sendTransaction(rawTransaction).on("transactionHash", function(hash) {
        console.log("txHash:",hash);
        document.getElementById("tx_hash").innerText  = hash;
    })
}

async function burn_token() {
    var contractAddress = document.getElementById("contract_address").value;
    var target = document.getElementById("target").value;
    var amount = document.getElementById("amount").value;
    var instance =  new web3.eth.Contract(erc20Abi, contractAddress);
    var burnTokenData = instance.methods.burnToken(target, amount).encodeABI();

    var estimateGasRes  = await web3.eth.estimateGas({
        to: contractAddress,
        data: burnTokenData,
        from: accountAddress,
        value:'0x0'
    })

    var gasPrice = await web3.eth.getGasPrice();
    let nonce  =await web3.eth.getTransactionCount(accountAddress);
    let rawTransaction = {
        from: accountAddress,
        to: contractAddress,
        nonce: web3.utils.toHex(nonce),
        gasPrice: gasPrice,
        gas: estimateGasRes * 2,
        value: '0x0',
        data: burnTokenData,
        chainId: chainId
    }

    web3.eth.sendTransaction(rawTransaction).on("transactionHash", function(hash) {
        console.log("txHash:",hash);
        document.getElementById("tx_hash").innerText  = hash;
    })
}

async function transfer() {
    var contractAddress  = document.getElementById("contract_address").value;
    var instance = new web3.eth.Contract(erc20Abi, contractAddress);
    var toAddress = document.getElementById("to_address").value;
    var amount  = document.getElementById("transfer_amount").value;
    var transferData = instance.methods.transfer(toAddress, web3.utils.toWei(amount)).encodeABI();
    var estimateGasRes  = await web3.eth.estimateGas({
        to: contractAddress,
        data: transferData,
        from: accountAddress,
        value:'0x0'
    })

    var gasPrice = await web3.eth.getGasPrice();
    let nonce  =await web3.eth.getTransactionCount(accountAddress);
    let rawTransaction = {
        from: accountAddress,
        to: contractAddress,
        nonce: web3.utils.toHex(nonce),
        gasPrice: gasPrice,
        gas: estimateGasRes * 2,
        value: '0x0',
        data: transferData,
        chainId: chainId
    }

    web3.eth.sendTransaction(rawTransaction).on("transactionHash", function(hash) {
        console.log("txHash:",hash);
        document.getElementById("tx_hash").innerText  = hash;
    })

    document.getElementById("estimate_gas").innerText  = estimateGasRes;
    document.getElementById("gas_price").innerText  = web3.utils.fromWei(gasPrice, "gwei");
}
