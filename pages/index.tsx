import type { NextPage } from 'next'
import { useEffect }from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Navbar } from '../components/Navbar';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <p>Welcome to Goal Tracker</p>
    </div>
  )
}

export default Home
