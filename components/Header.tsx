import ConnectWallet from "./ConnectWallet";
import "../styles/globals.css"; 

export default function Header() {
  return (
    <nav className="nav-container">
      <div className="menu-bars">
        <a href="#" className="nav-link">GSTFi</a>
        <a href="#" className="nav-link">Transactions</a>
        <a href="#" className="nav-link">Contacts</a>
      </div>


      <div className="right-nav">
        <ConnectWallet />
      </div>
    </nav>
  );
}
