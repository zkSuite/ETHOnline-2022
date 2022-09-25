import { useRouter } from 'next/router';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const Header = () => {
  const { address } = useAccount();

  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="w-full bg-white">
      <div className="w-full flex mx-auto items-center justify-between flex-wrap py-3 px-5 md:py-4 md:px-20 shadow dark:shadow-gray-300">
        <Link href="/">
          <a className="text-xl font-bold cursor-pointer">zkForms</a>
        </Link>
        <div className="flex-1 hidden md:flex justify-center">
          {pathname === '/' && (
            <>
              <Link href="#how-it-works">
                <a className="mx-5">How it works</a>
              </Link>
              <Link href="#faq">
                <a className="mx-5">FAQ</a>
              </Link>
            </>
          )}
        </div>
        <div className="flex flex-row space-x-2 items-center cursor-pointer">
          <ConnectButton />
          {address && (
            <Link href="/dashboard">
              <a className="btn !rounded-xl !shadow-md">Dashboard</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
