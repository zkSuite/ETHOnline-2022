import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="w-full flex mx-auto items-center justify-between py-6 px-5 md:px-20 bg-black text-gray-100">
      <p
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push('/')}
      >
        zkForms
      </p>
      <div className="flex flex-row space-x-2 items-center cursor-pointer">
        <Link href="https://twitter.com/">
          <a>
            <img src="/static/twitter.svg" className="w-8 h-8 mx-2" />
          </a>
        </Link>
        <Link href="https://github.com/zkSuite/zkforms-frontend">
          <a>
            <img src="/static/github.svg" className="w-8 h-8 mx-2" />
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
