import type { NextPage } from 'next'
import { useEffect }from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: NextPage = () => {
  const {data: session} = useSession();
  if (session) {
    return (
      <>
        <p>Logged in!!</p>
        <button className='btn' onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }
  return (
    <div className={styles.container}>
      <p>Welcome to Goal Tracker, not logged in</p>
      <button className='btn' onClick={() => signIn()}>Sign In</button>
    </div>
  )
}

export default Home
