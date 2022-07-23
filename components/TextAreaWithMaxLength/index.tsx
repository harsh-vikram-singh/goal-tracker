import React, { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid'

interface TextAreaWithMaxLengthProps {
  id: string;
  name: string;
  labelValue?: string;
  placeholder?: string;
  className?: string;
  setValue?: () => null;
  maxLength?: number;
  minLength?: number;
  value?: string;
}

export default function TextAreaWithMaxLength({
  id,
  name,
  placeholder='Placeholder',
  labelValue='',
  className='',
  maxLength=600,
  minLength=0,
  value='',
  setValue
}: TextAreaWithMaxLengthProps) {
  return (
    <div className={`block ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {labelValue}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <textarea
          name={name}
          id={id}
          className={`block w-full p-2 border h-24 sm:text-sm rounded`}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          minLength={minLength}
          // aria-describedby="email-error"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500" >
        {maxLength - value.length} characters remaining
      </p>
    </div>
  )
}