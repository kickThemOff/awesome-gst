"use client";
import React, { useEffect, useState } from "react";
import "../styles/accounts.css";
import { ethers } from "ethers";
import "../styles/globals.css";
import { CONTRACT_ADDRESS, ABI } from "./Contract";

const getData = async () => {
  if (window.ethereum) {
    try {
      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log("Wallet connected:", address);

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      // Read tax info to verify contract accessibility
      const taxInfo = await contract.taxInfo();
      const hasPaymentBeenReceived = await contract.hasPaymentBeenReceived();
      const balances = {
        gstBalance: ethers.formatUnits(taxInfo.gstBalance, 6),
        mainBalance: ethers.formatUnits(taxInfo.mainBalance, 6),
        defiBalance: ethers.formatUnits(taxInfo.defiBalance, 6),
      };
      return balances;
    } catch (error) {
      console.error("Error fetching contract data:", error);
      return null;
    }
  } else {
    console.error("Please install MetaMask or another Web3 wallet.");
    return null;
  }
};

const AccountsSection = () => {
  const [balances, setBalances] = useState({
    gstBalance: "Loading...",
    mainBalance: "Loading...",
    defiBalance: "Loading...",
  });

  useEffect(() => {
    const fetchBalances = async () => {
      const data = await getData();
      if (data) {
        setBalances(data);
      }
    };

    fetchBalances();
  }, []);

  return (
    <div className="accounts-container">
      <MainAccount balance={balances.mainBalance} />
      <GstAccount balance={balances.gstBalance} />
      <GstDefiAccount balance={balances.defiBalance} />
    </div>
  );
};

const MainAccount = ({ balance }) => {
  return (
    <div
      className="account main-account text-black"
      style={{
        backgroundImage: "url('/accountBackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="account-header">
        <h3 className="account-title-main">Main account</h3>
        <div className="account-domain">GST.moneypiggy.eth</div>
      </div>
      <div className="account-balance-row">
        <div className="account-balance-main">
          {balance} <span className="currency">NZDD</span>
        </div>
        <div className="account-actions">
          <button className="btn btn-light">Top up</button>
          <button className="btn btn-outline">Withdraw</button>
        </div>
      </div>
    </div>
  );
};

const GstAccount = ({ balance }) => {
  return (
    <div className="account gst-account">
      <div className="account-header">
        <h3 className="account-title-gst">GST account</h3>
        <div className="account-domain">GST.moneypiggy.eth</div>
      </div>
      <div className="account-balance-row">
        <div className="account-balance">
          {balance} <span className="currency">NZDD</span>
        </div>
        <div className="account-actions">
          <button className="btn btn-bordered">Top up</button>
          <button className="btn btn-dark">Withdraw</button>
        </div>
      </div>
    </div>
  );
};

const GstDefiAccount = ({ balance }) => {
  return (
    <div className="account defi-account">
      <div className="account-header">
        <h3 className="account-title">DeFi Account</h3>
      </div>
      <div className="account-balance">
        273.544<span className="currency">NZDD</span>
      </div>
      <div className="account-details-row">
        <div className="interest-info">
          <div className="interest-label">
            Interest earned <span className="more-link">more</span>
          </div>
          <div className="interest-amount">
            +2.3497<span className="mini-currency">NZDD</span>{" "}
            <span className="timestamp">Yesterday</span>
          </div>
        </div>
        <div className="account-actions">
          <button className="btn btn-bordered">Top up</button>
          <button className="btn btn-dark">Withdraw</button>
        </div>
      </div>
    </div>
  );
};

export default AccountsSection;
