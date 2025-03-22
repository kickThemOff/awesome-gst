"use client";
import React from 'react';
import '../styles/accounts.css';

const AccountsSection = () => {
    return (
        <div className="accounts-container">
            <MainAccount />
            <GstAccount />
            <GstDefiAccount />
            <GstToBePaidAccount />
        </div>
    );
};

const MainAccount = () => {
    return (
        <div className="account main-account text-black" style={{ backgroundImage: "url('/accountBackground.png')", backgroundSize: "cover", backgroundPosition: "center" }} >
            <div className="account-header">
                <h3 className="account-title-main">Main account</h3>
                <div className="account-domain">GST.moneypiggy.eth</div>
            </div>
            <div className="account-balance-row">
                <div className="account-balance-main">323428.1141 <span className="currency">NZDD</span></div>
                <div className="account-actions">
                    <button className="btn btn-light">Top up</button>
                    <button className="btn btn-outline">Withdraw</button>
                </div>
            </div>
        </div>
    );
};

const GstAccount = () => {
    return (
        <div className="account gst-account">
            <div className="account-header">
                <h3 className="account-title-gst">GST account</h3>
                <div className="account-domain">GST.moneypiggy.eth</div>
            </div>
            <div className="account-balance-row">
                <div className="account-balance">28.2321 <span className="currency">NZDD</span></div>
                <div className="account-actions">
                    <button className="btn btn-bordered">Top up</button>
                    <button className="btn btn-dark">Withdraw</button>
                </div>
            </div>
        </div>
    );
};

const GstDefiAccount = () => {
    return (
        <div className="account defi-account">
            <div className="account-header">
                <h3 className="account-title">GST Defi</h3>
            </div>
            <div className="account-balance">5232.2321 <span className="currency">NZDD</span></div>
            <div className="account-details-row">
                <div className="interest-info">
                    <div className="interest-label">Interest earned <span className="more-link">more</span></div>
                    <div className="interest-amount">+23.3497<span className="mini-currency">nzdd</span> <span className="timestamp">Yesterday</span></div>
                </div>
                <div className="account-actions">
                    <button className="btn btn-bordered">Top up</button>
                    <button className="btn btn-dark">Withdraw</button>
                </div>
            </div>
        </div>
    );
};

const GstToBePaidAccount = () => {
    return (
        <div className="account tax-account">
            <div className="account-header">
                <h3 className="account-title">GST to be paid</h3>
                <button className="btn btn-dark btn-small">Tax report</button>
            </div>
            <div className="account-balance">5200.3221 <span className="currency">NZDD</span></div>
            <div className="tax-details-row">
                <div className="tax-due-date">
                    <div className="tax-label">Tax Due Date: <span className="tax-date">30 March 2025</span></div>
                </div>
                <div className="tax-status">
                    <span className="status-label">IRD attached</span>
                    <span className="check-icon"></span>
                </div>
            </div>
        </div>
    );
};

export default AccountsSection;