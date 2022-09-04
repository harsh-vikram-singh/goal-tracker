import React from 'react';
import { signOut, signIn, useSession } from 'next-auth/react';
import { BeakerIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const NavBar = () => {
  const {data, status } = useSession();
  const isSignedIn = status === 'authenticated' ? true : false;
  const handleLogout = () => {
    console.log('logging out the user');
    signOut();
  }
  const handleLogin = () => {
    console.log('logging in')
    signIn()
  }
  return (
    <nav className='flex justify-between align-center p-4 bg-gray-800'>
      <Link href='/'>
      <div className='flex align-center my-auto gap-4 hover:cursor-pointer'>
        <BeakerIcon className='w-6 h-6 text-red-500' />
        <p className='text-white text-lg font-bold tracking-wide'>Goal Tracker</p>
      </div>
      </Link>
      {isSignedIn ? (
        <button className={`text-white border p-2 rounded border-slate-50 hover:cursor-pointer`} onClick={handleLogout}>Logout</button>
      ) : (
        null
      )}
    </nav>
  )
};

export default NavBar;