import { useSession } from 'next-auth/react'
import NavBar from 'components/navbar'
import Link from 'next/link';
import Signin from 'components/signin';

export default function LandingPage({authProviders}: any) {
  const {data: sessionData, status:authenticatedStatus}= useSession();
  console.log('user data: ', sessionData);
  return (
    <>
    <div className="w-full h-screen relative bg-gray-800 overflow-hidden">
      <div className="hidden sm:block sm:absolute sm:inset-0" aria-hidden="true">
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} fill="currentColor" />
            </pattern>
          </defs>
          <rect width={364} height={384} fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
                    Track your personal goals, and level up
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Track daily progress, mark the day as successful or not, and build the chain of success.
                    Over time, see what habits make you achieve your goals, and which ones prevent you from doing so.
                  </p>
                </div>
              </div>
              {
                authenticatedStatus === 'authenticated' ? (
                  <div className='lg:col-span-6 mx-auto my-auto'>
                  <Link href='/goals'>
                    <div className='p-4 bg-gray-300 rounded hover:cursor-pointer'>
                      <p className='text-bold text-xl'>Visit Your Goals Page</p>
                    </div>
                  </Link>
                  </div>
                ) : (
                  <Signin authProviders={authProviders}/>
                )
              }
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  )
}
