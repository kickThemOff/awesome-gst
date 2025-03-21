import ConnectWallet from "../components/connectWallet"
import { WalletDefault } from '@coinbase/onchainkit/wallet';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <WalletDefault />
    </main>
  );
}