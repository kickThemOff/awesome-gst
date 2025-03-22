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
import { color } from '@coinbase/onchainkit/theme';
import { ethers } from 'ethers'; // Import ethers.js

const provider = new ethers.providers.Web3Provider(window.ethereum);

export default function ConnectWalletWithEthers() {
  const [provider, setProvider] = useState(null); // Provider state
  const [walletAddress, setWalletAddress] = useState(null); // Wallet address state
  const [balance, setBalance] = useState(null); // User's balance state

  // Set up the provider when wallet is connected
  useEffect(() => {
    if (window.ethereum) {
      const ethersProvider = provider
    }
  }, []);

  // Handle wallet connection
  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request wallet connection
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const ethersProvider = provider
        // setProvider(ethersProvider);

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
  const handleDisconnectWallet = () => {
    setProvider(null);
    setWalletAddress(null);
    setBalance(null);
  };

  return (
    <div className="flex justify-end">
      <Wallet>
        {/* Connect Wallet Button */}
        <ConnectWallet onClick={handleConnectWallet}>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>

        <WalletDropdown>
          {/* Wallet Information */}
          {walletAddress && (
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address className={color.foregroundMuted} />
              <div className="mt-2">
                {/* Display balance */}
                <p>Balance: {balance} ETH</p> {/* Display balance in ETH */}
              </div>
            </Identity>
          )}

          {/* Disconnect Wallet */}
          {walletAddress && (
            <WalletDropdownDisconnect onClick={handleDisconnectWallet} />
          )}
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
