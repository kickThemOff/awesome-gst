"use client";

import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import {CONTRACT_ADDRESS, ABI } from './Contract'

function Invoice() {

    const invoices = [
        { id: 1, amount: "281.31", from: "Smith.co" },
        { id: 2, amount: "2399.99", from: "TechWorld" },
        { id: 3, amount: "1250.75", from: "GadgetStore" },
    ];

    const transaction = [
        { id: 1, name: "Supplier", GST: "-GST30.11", amount: "-263.11", timestamp: "23/03/2025, 10:30:45 AM" }, 
        { id: 2, name: "Stripe", GST: "+GST60.23", amount: "+543.425", timestamp: "20/03/2025, 10:30:45 AM" },
        { id: 3, name: "Stripe", GST: "+GST19.24", amount: "+145.134", timestamp: "17/03/2025, 10:30:45 AM" }
    ];

    const fixedAddress = "0x660594b90a8ea7F1D0b43bEAB4Fe3c734dc20A7A"; // Replace with the actual Ethereum address
    const fixedAmount = 281310000; // Adjust amount as needed

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
            const contractAddress = CONTRACT_ADDRESS
            const contractABI = ABI;
            
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
        {/* Invoice Area */}
      <div className="invoice-area">
        <div className="invoice-heading">
            <p>Invoices</p>
            <p>Make a payment</p>
        </div>

        {invoices.map((invoice) => (
            <div key={invoice.id} className="child-container">
                <p>
                    <span className="amount">{invoice.amount}</span> 
                    <span className="currency">NZDD</span>
                </p>                
                <div className="bottom-container">
                    <span className="color">From: {invoice.from}</span>
                    <button className="btn-pay" onClick={handlePayment}>Pay</button>
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
              
                    <div className="transaction-container">
                        <div className="transaction-heading">

                        <span>
                            <span className="amount">{transaction.name}</span>

                        </span>  
                            <div className="time">
                                {transaction.timestamp}
                            </div>
                        </div>
                    <div>
                    <span className={`amount ${transaction.GST.startsWith('+') ? 'green-text' : 'red-text'}`}>
                        {transaction.GST}
                    </span>
                        <span className="amount">
                            Main Account: {transaction.amount}
                        </span>
                       </div> 
                </div>
            </div>
            ))}
      </>
    );
  }
  
  export default Invoice;