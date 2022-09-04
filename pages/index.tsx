import type { NextPage } from 'next'
import { useEffect }from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut, getProviders, getCsrfToken } from 'next-auth/react';
import LandingPage from 'components/landingPage';

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();
  console.log('providers: ', providers)
  console.log('csrfToken', csrfToken);
  return {
    props : {
      providers,
      csrfToken
    }
  }
}

const Home: NextPage = ({csrfToken, providers}) => {
  const {data: session} = useSession();
  // console.log('csrfToken: ', csrfToken);
  // console.log('providers: ', providers);
  // if (session) {
  //   return (
  //     <>
  //       <p>Logged in!!</p>
  //       <button className='btn' onClick={() => signOut()}>Sign Out</button>
  //     </>
  //   )
  // }
  // return (
  //   <div className={styles.container}>
  //     <p>Welcome to Goal Tracker, not logged in</p>
  //     <button className='btn' onClick={() => signIn()}>Sign In</button>
  //   </div>
  // )
  return (
    <LandingPage authProviders={providers} />
  )
}

export default Home
