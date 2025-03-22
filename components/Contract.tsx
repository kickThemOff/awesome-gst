export const CONTRACT_ADDRESS = "0x2b981FFB67a26AC1d5586323586fEd11AB024ECA"
export const ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "IRDAccount",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "GSTWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldaddr",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newaddr",
				"type": "address"
			}
		],
		"name": "IRDAccountChangedr",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "payee",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "code",
				"type": "uint256"
			}
		],
		"name": "PayeeTransfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newIRDAccount",
				"type": "address"
			}
		],
		"name": "changeIRDAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "hasPaymentBeenReceived",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "splitGST",
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
		"inputs": [],
		"name": "taxInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "gstBalance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mainBalance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "defiBalance",
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
				"name": "payee",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "code",
				"type": "uint256"
			}
		],
		"name": "transferToPayee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawGST",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]