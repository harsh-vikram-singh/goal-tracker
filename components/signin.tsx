import React from 'react';
import { signIn } from 'next-auth/react';
import LoginButton from 'components/buttons/loginButton'

interface SigninProps {
  authProviders: {
    [authProvidername: string]: {
      id: string;
      name: string;
    }
  }
}

const Signin = ({authProviders}: SigninProps) => {
  console.log(Object.values(authProviders));
  return (
    <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  <div className="px-4 py-8 sm:px-10">
                    <div>
                      <div className='flex flex-col gap-4'>
                      <p className="text-xl font-medium text-gray-900">Sign in</p>
                      {Object.values(authProviders).map((provider) => (
                        <LoginButton id={provider.id} name={provider.name} onClick={() => signIn(provider.id)}/>
                      ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
                    <p className="text-xs leading-5 text-gray-500">
                      By creating an account, you understand that this website is a work in progress, and things are expected to change.
                    </p>
                  </div>
                </div>
              </div>
  );
};

export default Signin;