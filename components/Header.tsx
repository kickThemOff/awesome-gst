
'use client';

import ConnectWallet from "./connectWallet";
import "../styles/globals.css";

export default function Header() {
    return (
        <nav className="nav-container">
            <div className="menu-bars">
                <h1 className="tax-free-header">WhyDefi</h1>
            </div>
            <div className="right-nav">
                <ConnectWallet />
            </div>
            <br/>
        </nav>
    );
}
