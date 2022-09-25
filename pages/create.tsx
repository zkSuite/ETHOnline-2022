import type { NextPage } from 'next';
import Head from 'next/head';
import 'react-nestable/dist/styles/index.css';

import Footer from '../components/footer';
import FormBuilder from '../components/formBuilder';
import Header from '../components/header/header';

const App: NextPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative bg-blue-50">
      <Head>
        <title>zkForms | Create form</title>
        <meta name="description" content="zkForms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto my-14 flex-1 px-5 md:px-0">
        <FormBuilder />
      </main>

      <Footer />
    </div>
  );
};

export default App;
