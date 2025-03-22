"use client";

import { parseEther } from "ethers";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";

function Invoice() {

    const invoices = [
        { id: 1, amount: "1781.31", from: "Smith.co" },
        { id: 2, amount: "2399.99", from: "TechWorld" },
        { id: 3, amount: "1250.75", from: "GadgetStore" },
    ];

    const transaction = [
        { id: 1, name: "Supplier", GST: "-GST80", amount: "-80"},
        { id: 2, name: "Stripe", GST: "+GST80", amount: "+80" },
        { id: 3, name: "Stripe", GST: "+GST80", amount: "+80" },
    ];

    const fixedAddress = "0x660594b90a8ea7F1D0b43bEAB4Fe3c734dc20A7A"; // Replace with the actual Ethereum address
    const fixedAmount = 1781310000; // Adjust amount as needed


    // Function to handle the transaction
    async function handlePayment() {
        if (!window.ethereum) {
            alert("Please install MetaMask to make transactions!");
            return;
        }

        try {
            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Request user to connect wallet
            const signer = await provider.getSigner();

            // Replace with your contract address & ABI
            const contractAddress = "0x90b6fa1BC66dBF3a6E2Fa49C0b525081B55Bd399"; // Replace with actual contract address
            const contractABI = [ // Replace with actual ABI
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
            ];


            
            const contract = new Contract(contractAddress, contractABI, signer);

            // Execute the contract function
            const tx = await contract.transferToPayee(fixedAddress, fixedAmount, 0);
            await tx.wait(); // Wait for transaction confirmation

            alert("Payment successful!");
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Check the console for details.");
        }
    }

    return (
      <>
        {/* Tax-Free Header outside the container */}
        <h1 className="tax-free-header">WhyDefi</h1>
        <p className="update-color">update on 26 March 2025, at 13:45 PM </p>

        {/* Invoice Area */}
      <div className="invoice-area">
        <div className="invoice-heading">
            <p>Invoices</p>
            <button className="btn">Make a payment</button>
        </div>

        {invoices.map((invoice) => (
            <div key={invoice.id} className="child-container">
                <p>
                    <span className="amount">{invoice.amount}</span> 
                    <span className="currency">NZDD</span>
                </p>
                <div className="smaller-container">
                    <p>.</p>
                </div>
                <div className="bottom-container">
                    <span className="color">From:</span>
                    <span className="color">{invoice.from}</span>
                    <button className="reject-button">Reject</button>
                    <button className="reject-button" onClick={handlePayment}>Pay</button>
                </div>
            </div>
            ))}
        </div>
        <div className="invoice-area"></div>
            <div className="invoice-heading">
                <p>Transactions</p>
            </div>

            {transaction.map((transaction) => (
            <div key={transaction.id} className="transaction-container">
                <p>
                    <span className="amount">{transaction.name}</span> 
                    <span className="currency"></span>
                </p>
                <div className="smaller-container">
                    <span className={`amount ${transaction.GST.startsWith('+') ? 'green-text' : 'red-text'}`}>
                        {transaction.GST}
                    </span>
                    <div className="amount">
                        Account: {transaction.amount}
                    </div>
                    <p>dsjkfsldasdsadsadsadsadasfdsfdsfdsfdsfdsfhdfkjshfshdjkfhdskfhkdshfdshj</p>
                </div>
            </div>
            ))}
      </>
    );
  }
  
  export default Invoice;