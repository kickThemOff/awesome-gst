"use client";

import { useEffect, useState } from 'react';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
} from '@coinbase/onchainkit/identity';
//import { color } from '@coinbase/onchainkit/src/';
import { ethers } from 'ethers'; // Import ethers.js

export default function ConnectWalletWithEthers() {
  const [provider, setProvider] = useState(null); // Provider state
  const [walletAddress, setWalletAddress] = useState<string|null>(null); // Wallet address state
  const [balance, setBalance] = useState<string|null>(''); // User's balance state

  // Set up event listeners for wallet changes
  useEffect(() => {
    if (window.ethereum) {
      // Handle account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          handleDisconnectWallet();
        } else {
          // User switched accounts
          setWalletAddress(accounts[0]);
        }
      });

      // Handle chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      // Cleanup listeners on unmount
      return () => {
        window.ethereum.removeListener('accountsChanged', handleDisconnectWallet);
        window.ethereum.removeListener('chainChanged', () => window.location.reload());
      };
    }
  }, []);

  // Handle wallet connection
  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request wallet connection
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethersProvider);

        // Get wallet address
        const signer = ethersProvider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);

        // Fetch balance (in Wei, and then convert to Ether)
        const balanceInWei = await ethersProvider.getBalance(address);
        const balanceInEther = ethers.utils.formatEther(balanceInWei); // Convert Wei to Ether
        setBalance(balanceInEther);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.error('Please install MetaMask or another Web3 wallet.');
    }
  };

  // Handle wallet disconnect
  const handleDisconnectWallet = async () => {
    try {
      // Reset states
      setProvider(null);
      setWalletAddress(null);
      setBalance('');
      
      // Clear any stored wallet data
      localStorage.removeItem('walletAddress');
      localStorage.removeItem('walletBalance');
      
      // If using MetaMask, you can also request account disconnection
      if (window.ethereum) {
        await window.ethereum.request({
          method: "eth_requestAccounts",
          params: [{ eth_accounts: {} }],
        });
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  return (
    <div className="flex justify-end">
      <Wallet>
        {/* Connect Wallet Button */}
        <ConnectWallet onConnect={handleConnectWallet}>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>

        <WalletDropdown>
          {/* Wallet Information */}
          {walletAddress && (
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address className={'any-color'} />
              <div className="mt-2">
                {/* Display balance */}
                <p>Balance: {balance} ETH</p> {/* Display balance in ETH */}
              </div>
            </Identity>
          )}

          {/* Disconnect Wallet */}
          {walletAddress && (
            <WalletDropdownDisconnect onDisconnect={handleDisconnectWallet} />
          )}
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
