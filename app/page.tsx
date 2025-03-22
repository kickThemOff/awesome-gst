import ConnectWallet from "../components/connectWallet";
import AccountsSection from "../components/AccountsSection"
import Header from "../components/Header"
import Invoice from "../components/dashboard";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white"> 
      <Header/>      
      {/* <ConnectWallet /> */}
      
      <div className="flex flex-row items-start justify-center w-full max-w-6xl gap-4">
        <div className="w-2/5">
          <Invoice />
          
        </div>
        <div className="w-3/5">
          <AccountsSection />
        </div>
      </div>
    </main>
  );
}
