'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ConnectWallet from "./ConnectWallet";
import "../styles/globals.css"; 
import { CONTRACT_ADDRESS, ABI } from "./Contract";

export default function Header() {
  const integrate = async () => {
    try {
      if (window.ethereum) {
        // Request wallet connection
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log('Wallet connected:', address);

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        // Read tax info
        const taxInfo = await contract.taxInfo();
        console.log('Tax Info:', {
          gstBalance: ethers.utils.formatEther(taxInfo.gstBalance),
          mainBalance: ethers.utils.formatEther(taxInfo.mainBalance),
          defiBalance: ethers.utils.formatEther(taxInfo.defiBalance)
        });

        // Check if payment has been received before withdrawing
        const hasPayment = await contract.hasPaymentBeenReceived();
        if (!hasPayment) {
          console.log('No payment received yet. Cannot withdraw GST.');
          return;
        }

        // Withdraw GST
        const tx = await contract.withdrawGST({ gasLimit: 200000 }); // Add explicit gas limit
        await tx.wait();
        console.log('GST withdrawn successfully!');
      } else {
        console.error('Please install MetaMask or another Web3 wallet.');
      }
    } catch (error) {
      console.error('Error during integration:', error);
      // Show more specific error message to user
      if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
        console.error('Transaction failed. This could be because:');
        console.error('1. You are not authorized to withdraw GST');
        console.error('2. No payment has been received yet');
        console.error('3. The contract is not deployed on the correct network');
      }
    }
  };

  return (
    <nav className="nav-container">
      <div className="menu-bars">
        <a href="#" className="nav-link">GSTFi</a>
        <a href="#" className="nav-link">Transactions</a>
        <a href="#" className="nav-link">Contacts</a>
      </div>

      <div className="right-nav">
        <button onClick={() => integrate()}>Integrate</button>
        <ConnectWallet />
      </div>
    </nav>
  );
}
