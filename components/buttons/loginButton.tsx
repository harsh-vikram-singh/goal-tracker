import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

interface LoginButtonProps {
  name: string;
  id: string;
  onClick?: () => void;
  text?: string;
}

type iconNames = 'github' | 'google';

const getIcon = (providerId: iconNames) => {
  const iconObj = {
    github: <FaGithub />,
    google: <FaGoogle />
  }
  return iconObj[providerId]
}

const LoginButton = ({name, id, text, onClick}: LoginButtonProps) => {
  return (
    <div key={name}>
      <div className='border rounded p-2 flex gap-2 align-baseline justify-center hover:shadow-lg hover:border-white hover:text-white hover:cursor-pointer hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500' onClick={onClick}>
        <div className='my-auto'>{getIcon(id as iconNames)}</div>
        <p>Sign in with {name}</p>
      </div>
    </div>
  )
};

export default LoginButton;