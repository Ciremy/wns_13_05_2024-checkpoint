import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Header from "@/components/Header";

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
