import Header from "../components/Header";

import dynamic from 'next/dynamic';

const ConnectWallet = dynamic(() => import('../components/ConnectWallet'), {
  //ssr: false, // Ensures this only runs on the client
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <h1 className="text-3xl font-bold">Welcome to GSTFi</h1>
      </div>
    </main>
  );
}