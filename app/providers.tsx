'use client';
 
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia } from 'wagmi/chains'; // add baseSepolia for testing 
 
export function Providers(props: { children: ReactNode, initialState: any }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} 
      chain={baseSepolia} // add baseSepolia for testing 
      config={{
        appearance: {
          name: 'WhyDeFi', 
          mode: 'auto',
          theme: 'default',
        },
        wallet: { 
          display: 'modal', 
          
        }}}
    >
      {props.children}
    </OnchainKitProvider>
  );
}