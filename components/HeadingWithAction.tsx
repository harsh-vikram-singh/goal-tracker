import { WhiteButton } from 'components/buttons'
interface HeadingWithActionProps {
  headingLabel: string;
  actionLabel: string;
  actionOnClickHandler: () => void;
};

const HeadingWithAction = ({
  headingLabel,
  actionLabel,
  actionOnClickHandler
}: HeadingWithActionProps) => {
  return (
    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {headingLabel} 
      </h3>
      <div className="mt-3 sm:mt-0 sm:ml-4">
        <WhiteButton onClick={actionOnClickHandler}>{actionLabel}</WhiteButton>
      </div>
    </div>
  )
}

export default HeadingWithAction;
