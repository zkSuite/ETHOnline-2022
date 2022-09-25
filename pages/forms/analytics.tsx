import type { NextPage } from 'next';
import Head from 'next/head';
import 'react-nestable/dist/styles/index.css';

import Footer from '../../components/footer';
import Header from '../../components/header/header';
import FormAnalytics from '../../components/formBuilder/analytics';

const Analytics: NextPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative bg-blue-50">
      <Head>
        <title>zkForms | Analytics</title>
        <meta name="description" content="zkForms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto my-14 flex-1 px-5 md:px-0">
        <FormAnalytics />
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
