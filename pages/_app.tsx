import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Session } from 'inspector';

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    )
}

export default MyApp
