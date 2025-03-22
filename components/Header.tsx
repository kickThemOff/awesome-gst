'use client';

import ConnectWallet from "./connectWallet";
import "../styles/globals.css";

export default function Header() {
    return (
        <nav className="nav-container">
            <div className="left-content">
                <h1 className="tax-free-header">WhyDefi</h1>
            </div>
            <div className="right-content">
                <ConnectWallet />
            </div>
        </nav>
    );
}
