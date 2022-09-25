import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Footer from '../components/footer';
import Header from '../components/header/header';
import { useAccount } from 'wagmi';
import { listFiles } from '../utils/ipfs';
import Link from 'next/link';
import Spinner from '../components/spinner';

const Item = ({ title, cid }: { title: string; cid: string }) => {
  return (
    <div className="flex flex-col md:flex-row my-4 px-5 py-4 rounded-xl shadow-md">
      <h5 className="flex-1 text-base md:text-xl mb-5 md:mb-0">{title}</h5>
      <div>
        <Link href={`/forms/view?cid=${cid}`}>
          <a className="btn text-sm md:text-base font-medium mx-2">View</a>
        </Link>
        <Link href={`/forms/analytics?cid=${cid}`}>
          <a className="btn text-sm md:text-base font-medium mx-2 bg-blue-400 text-white">
            Analytics
          </a>
        </Link>
        {/* <button className="btn bg-red-400 text-white font-medium mx-2">
          Delete
        </button>
        <button className="btn bg-blue-400 text-white font-medium mx-2">
          Set as Complete
        </button> */}
      </div>
    </div>
  );
};

const Dashboard: NextPage = () => {
  const [data, setData] = useState<any[] | undefined>([]);
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        const res = await listFiles(address!);
        setData(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchFiles();
  }, [address]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Head>
        <title>zkForms</title>
        <meta name="description" content="zkForms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container flex-1 mx-auto px-6 mb-20 md:px-4">
        <h2 className="text-xl md:text-2xl font-semibold my-4">
          Dashboard -{' '}
          <span className="text-base md:text-xl font-semibold text-gray-500 my-4">
            View all your forms
          </span>
        </h2>

        {isLoading && (
          <div className="mt-10">
            <Spinner />
          </div>
        )}

        {data && !isLoading && (
          <>
            {data.length > 0 ? (
              <>
                {data?.map((item: any) => (
                  <Item key={item} title={item.title} cid={item.cid} />
                ))}
              </>
            ) : (
              <div className="mt-16 flex flex-col items-center">
                <p className="mb-4 text-base md:text-xl font-semibold text-gray-500 text-center">
                  Start creating out forms to get started with
                  censorship-resistant analytics.
                </p>
                <Link href="/create">
                  <a className="btn bg-black text-white">Try zkForms</a>
                </Link>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
