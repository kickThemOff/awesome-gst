import ConnectWallet from "../components/connectWallet"

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <ConnectWallet />
    </main>
  );
}