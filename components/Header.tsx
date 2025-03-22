
'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ConnectWallet from "./connectWallet";
import "../styles/globals.css";
import { CONTRACT_ADDRESS, ABI } from "./Contract";

export default function Header() {
    const integrate = async () => {
        try {
            if (window.ethereum) {
                // Request wallet connection
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = signer.getAddress();
                console.log('Wallet connected:', address);

                const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

                try {
                    // Read tax info first to verify contract is accessible
                    const taxInfo = await contract.taxInfo();
                    console.log('Tax Info:', {
                        gstBalance: ethers.formatEther(taxInfo.gstBalance),
                        mainBalance: ethers.formatEther(taxInfo.mainBalance),
                        defiBalance: ethers.formatEther(taxInfo.defiBalance)
                    });

                    // Check if payment has been received
                    const hasPayment = await contract.hasPaymentBeenReceived();
                    console.log('Has payment been received:', hasPayment);

                    if (!hasPayment) {
                        console.log('No payment received yet. Cannot withdraw GST.');
                        return;
                    }

                    // Try to split GST first
                    try {
                        const splitTx = await contract.splitGST({ gasLimit: 200000 });
                        console.log('Split GST transaction sent:', splitTx.hash);
                        await splitTx.wait();
                        console.log('GST split successfully!');
                    } catch (splitError) {
                        console.error('Error splitting GST:', splitError);
                        return;
                    }

                    // Now try to withdraw GST
                    const tx = await contract.withdrawGST({
                        gasLimit: 200000,
                        from: address // Explicitly specify the sender
                    });
                    console.log('Withdraw GST transaction sent:', tx.hash);
                    await tx.wait();
                    console.log('GST withdrawn successfully!');
                } catch (contractError) {
                    console.error('Contract interaction error:', contractError);
                    if (contractError.code === 'CALL_EXCEPTION') {
                        console.error('Contract call failed. This could be because:');
                        console.error('1. You are not authorized to withdraw GST');
                        console.error('2. The contract has insufficient funds');
                        console.error('3. The contract is paused or in an invalid state');
                        console.error('4. The contract is not deployed on this network');
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
