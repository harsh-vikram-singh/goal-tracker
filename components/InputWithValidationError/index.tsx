import { ExclamationCircleIcon } from '@heroicons/react/solid'

interface InputWithValidationErrorProps {
  type: string;
  id: string;
  name: string;
  labelValue?: string;
  placeholder?: string;
  defaultValue?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  value?: string;
}

export default function InputWithValidationError({
  type,
  id,
  name,
  placeholder='Placeholder',
  labelValue='',
  defaultValue="",
  isInvalid=false,
  errorMessage,
  value=''
}: InputWithValidationErrorProps) {
  return (
    <div>
      <label htmlFor={type} className="block text-sm font-medium text-gray-700">
        {labelValue}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={id}
          className={`block w-full p-2 border rounded ${isInvalid ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : ''} sm:text-sm `}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-invalid={`${isInvalid}`}
          value={value}
          // aria-describedby="email-error"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ExclamationCircleIcon className={`h-5 w-5 text-red-500 ${!isInvalid ? 'hidden' : ''}`} aria-hidden={`${!isInvalid}`} />
        </div>
      </div>
      <p className="mt-2 text-sm text-red-600" id="email-error" hidden={!isInvalid}>
        {errorMessage}
      </p>
    </div>
  )
}
