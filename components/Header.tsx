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

        // Check if we're on the correct network (Base Sepolia)
        const network = await provider.getNetwork();
        if (network.chainId !== 84532) { // Base Sepolia chainId
          console.error('Please switch to Base Sepolia network');
          return;
        }

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        // Read tax info first to verify contract is accessible
        try {
          const taxInfo = await contract.taxInfo();
          console.log('Tax Info:', {
            gstBalance: ethers.utils.formatEther(taxInfo.gstBalance),
            mainBalance: ethers.utils.formatEther(taxInfo.mainBalance),
            defiBalance: ethers.utils.formatEther(taxInfo.defiBalance)
          });
        } catch (error) {
          console.error('Error reading tax info:', error);
          return;
        }

        // Check if payment has been received before withdrawing
        try {
          const hasPayment = await contract.hasPaymentBeenReceived();
          if (!hasPayment) {
            console.log('No payment received yet. Cannot withdraw GST.');
            return;
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
          return;
        }

        // Withdraw GST with explicit gas limit and error handling
        try {
          const tx = await contract.withdrawGST({ 
            gasLimit: 200000,
            from: address // Explicitly specify the sender
          });
          console.log('Transaction sent:', tx.hash);
          await tx.wait();
          console.log('GST withdrawn successfully!');
        } catch (error) {
          console.error('Error withdrawing GST:', error);
          if (error.code === 'CALL_EXCEPTION') {
            console.error('Contract call failed. This could be because:');
            console.error('1. You are not authorized to withdraw GST');
            console.error('2. The contract has insufficient funds');
            console.error('3. The contract is paused or in an invalid state');
          }
        }
      } else {
        console.error('Please install MetaMask or another Web3 wallet.');
      }
    } catch (error) {
      console.error('Error during integration:', error);
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
