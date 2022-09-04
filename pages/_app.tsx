import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import { getNextInternalQuery } from 'next/dist/server/request-meta';
import Navbar from 'components/navbar';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  console.log('session from _app: ', session);
    return (
      <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </SessionProvider>
      </QueryClientProvider>
    )
}

export default MyApp
