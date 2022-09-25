import type { NextPage } from 'next';
import Head from 'next/head';
import 'react-nestable/dist/styles/index.css';

import FormViewer from '../../components/formBuilder/viewer';
import Script from 'next/script';

const View: NextPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative bg-blue-50">
      <Head>
        <title>zkForms | View</title>
        <meta name="description" content="zkForms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script src="/snarkjs.min.js" />

      <main className="container mx-auto my-14 flex-1">
        <FormViewer />
      </main>
    </div>
  );
};

export default View;
