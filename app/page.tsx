import ConnectWallet from "../components/connectWallet";
import AccountsSection from "../components/AccountsSection"
import Header from "../components/Header"
import Invoice from "../components/dashboard";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white"> 
      <Header/>      
      {/* <ConnectWallet /> */}
      <AccountsSection />
      <Invoice />
    </main>
  );
}
