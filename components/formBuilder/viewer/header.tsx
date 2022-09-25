import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = ({
  title,
  description,
  deadline,
  image,
  owner,
  isResponseView = false,
  responseAddress = '',
  isRestricted = false,
}: {
  title: string;
  description: string;
  deadline: string;
  image: string;
  owner: string;
  responseAddress: string;
  isResponseView: boolean;
  isRestricted: boolean;
}) => {
  return (
    <div className="shadow-md rounded-md border-t-8 border-primary/90 bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-medium flex-1 truncate">{title}</h2>
          {isRestricted && (
            <p className="bg-gray-200 rounded-xl py-1 px-3 text-sm font-semibold">
              Anonymous
            </p>
          )}
        </div>
        <p className="mt-4 text-sm md:text-base text-gray-800">{description}</p>
      </div>
      <div className="border-t p-4">
        <p className="text-sm text-gray-800 truncate">
          <span className="font-medium">Created by: </span>
          {owner}
        </p>
      </div>
      <div className="px-4 pb-4">
        {isResponseView ? (
          <p className="text-sm text-gray-800 truncate">
            <span className="font-medium">Submitted by: </span>
            {responseAddress}
          </p>
        ) : (
          <>
            <ConnectButton />
            {isRestricted && (
              <p className="text-sm mt-3 font-medium">
                *Your wallet address will not be shared or saved
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
