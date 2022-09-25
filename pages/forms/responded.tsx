import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import 'react-nestable/dist/styles/index.css';

const Responded: NextPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative bg-blue-50">
      <Head>
        <title>zkForms | Already Responded</title>
        <meta name="description" content="zkForms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto my-14 flex-1">
        <div className="relative w-full md:w-1/2 mx-auto">
          <div className="shadow-md rounded-md border-t-8 border-primary/90 bg-white">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-normal flex-1 truncate">
                  You&apos;ve already responded
                </h2>
              </div>
            </div>
            <p className="border-t px-4 pt-4 text-sm text-gray-800">
              You can fill out this form only once.
            </p>
            <p className="mt-4 pb-4 px-4 text-sm text-gray-800">
              Contact the owner in case of a mistake.
            </p>
          </div>
          <div className="text-center my-5">
            <Link href={process.env.NEXT_PUBLIC_HOST!}>
              <a target="_blank" className="text-2xl font-light text-gray-500">
                Created with <span className="font-medium">zkForms</span>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Responded;
