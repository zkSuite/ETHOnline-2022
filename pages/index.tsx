/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Footer from '../components/footer';
import Header from '../components/header/header';

const H6 = ({ children }: { children: any }) => (
  <h6 className="mt-2 text-lg font-semibold">{children}</h6>
);

const Home: NextPage = () => {
  const [selectedCard, setSelectedCard] = useState<number[]>([]);

  const isSelected = (index: number) => {
    return selectedCard.includes(index);
  };

  const selectCard = (index: number) => {
    const temp = [...selectedCard];
    if (isSelected(index)) {
      temp.splice(selectedCard.indexOf(index), 1);
    } else {
      temp.push(index);
    }
    setSelectedCard(temp);
  };

  const FAQ = ({
    title,
    description,
    index,
  }: {
    title: string;
    description: string;
    index: number;
  }) => (
    <div className="py-8 border-b-2">
      <div className="w-full flex items-center mb-5">
        <h4 className="flex-1 text-base md:text-2xl font-medium">{title}</h4>
        {isSelected(index) ? (
          <img
            src="/static/minus.svg"
            alt="close"
            className="w-8 h-8 cursor-pointer hover:bg-primaryLight rounded-full transition-all duration-200 ease-in-out"
            onClick={() => selectCard(index)}
          />
        ) : (
          <img
            src="/static/plus.svg"
            alt="open"
            className="w-8 h-8 cursor-pointer hover:bg-primaryLight rounded-full transition-all duration-200 ease-in-out"
            onClick={() => selectCard(index)}
          />
        )}
      </div>
      <div
        className={`transition-all duration-200 ease-in-out answer_wrapper ${
          isSelected(index) ? 'open' : ''
        }`}
      >
        <p className="font-light text-sm md:text-base">{description}</p>
      </div>
    </div>
  );

  const faqData = [
    {
      title:
        'Is it possible to compromise the protocol and fill the restricted surveys?',
      description:
        'No, zkForms is a decentralized protocol based on zero knowledge proofs. Its smart contracts are immutable, have no admins, and the proofs are based on strong cryptography. Only the user possessing the allowed address is able to fill the form.',
    },
    {
      title: 'Do you collect data?',
      description:
        'The zkForms does not collect any user data. The UI is hosted in a decentralized way on IPFS and can be accessed using following link zkForms.crypto. Users can also run it locally.',
    },
    {
      title: 'Is the code open-source?',
      description: 'https://github.com/zkSuite/zkforms-frontend',
    },
  ];

  return (
    <div className="w-full">
      <Head>
        <title>zkForms | Home</title>
        <meta name="description" content="zkForms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-6 mb-20 md:px-0">
        <section className="grid grid-cols-1 md:grid-cols-2 py-14">
          <div className="my-10 md:my-16">
            <h1 className="text-4xl md:text-7xl font-medium">
              Secured Insights <br />
              Safest. Trusted.
            </h1>
            <p className="mt-5 w-full md:w-3/4 text-base md:text-2xl font-light text-gray-500">
              Easily create and share online forms in a censorship resistant
              decentralized environment
            </p>
            <div className="mt-10 w-full flex items-center">
              <Link href="/create">
                <a className="btn bg-black text-white">Start creating</a>
              </Link>
              <Link href="https://vimeo.com/manage/videos/740141988">
                <a target="_blank" className="ml-5 btn flex items-center">
                  <Image
                    src="/static/play.png"
                    alt="play"
                    width={30}
                    height={30}
                  />
                  <span className="ml-2">Watch Demo</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="w-full relative hidden md:block">
            <div className="relative w-full h-full">
              <Image
                src="/static/form.png"
                alt="illustration"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </section>

        <section
          id="supported"
          className="mt-10 md:mt-32 bg-primaryLight/60 py-14 md:py-20 rounded-xl"
        >
          <h2 className="mb-10 text-3xl md:text-5xl font-medium text-center">
            Supported Networks
          </h2>

          <div className="container flex flex-col md:flex-row items-center justify-around">
            <div className="my-5 flex flex-col justify-center hover:scale-105 transition-all duration-200 opacity-50">
              <Image
                src="/static/ethereum.png"
                alt="ethereum"
                width={100}
                height={120}
                objectFit="contain"
              />
              <H6>Ethereum Mainnet</H6>
              <H6>
                <p className="text-center">(Coming Soon)</p>
              </H6>
            </div>
            <div className="my-5 flex flex-col justify-center hover:scale-105 transition-all duration-200">
              <Image
                src="/static/polygon.png"
                alt="polygon"
                width={100}
                height={100}
                objectFit="contain"
              />
              <H6>Polygon Network</H6>
            </div>
            {/* <div className="my-5 flex flex-col justify-center hover:scale-105 transition-all duration-200">
              <Image
                src="/static/goerli.svg"
                alt="goerli"
                width={100}
                height={100}
                objectFit="contain"
              />
              <H6>Ethereum Goerli</H6>
            </div> */}
          </div>
        </section>

        <section id="how-it-works" className="mt-16 md:mt-48">
          <div className="w-full md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2">
            <div className="order-last md:order-first relative my-5 md:my-0 w-full h-full min-h-[200px]">
              <Image
                src="/static/lock.webp"
                alt="illustration"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div>
              <h5 className="text-2xl md:text-4xl font-medium mb-6">
                Zero Knowledge Proofs
              </h5>

              <p className="text-base md:text-xl text-gray-500 font-light">
                zkForms is a web3 native form builder which can be used to
                conduct open surveys to restricted anonymous surveys.
                <br />
                <br />
                Within the DAO&apos;s internal environment, which is solely
                accessible to its members, DAOs can carry out anonymous surveys
                accessible only to its members using Zero Knowledge Proofs.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 md:mt-48">
          <div className="w-full md:w-10/12 h-full mx-auto grid grid-cols-1 md:grid-cols-2">
            <div className="h-full">
              <h5 className="text-2xl md:text-4xl font-medium mb-6">
                Analyze responses with automatic details
              </h5>

              <p className="text-base md:text-xl text-gray-500 font-light">
                View detailed summaries with response information and improved
                analytics. Or view the specific wallet&apos;s responses.
              </p>
            </div>

            <div className="relative my-5 md:my-0 w-full h-full min-h-[200px]">
              <Image
                src="/static/growth.png"
                alt="illustration"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </section>

        <section className="mt-16 md:mt-48">
          <div className="w-full md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2">
            <div className="order-last md:order-first relative my-5 md:my-0 w-full h-full min-h-[200px]">
              <Image
                src="/static/survey.webp"
                alt="illustration"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div>
              <h5 className="text-2xl md:text-4xl font-medium mb-6">
                Create surveys and access them from anywhere
              </h5>

              <p className="text-base md:text-xl text-gray-500 font-light">
                zkForms is made to be user-friendly and accessible. All form
                information, including restrictions, analytics, and responses,
                is kept on IPFS and is thus accessible from anywhere.
                <br />
                <br />
                Open surveys can be accessed by anyone, but restricted surveys
                can be accesses by allowed members only by providing a valid
                Zero-Knowledge Proof (ZKP) proving that the user is a member of
                the DAO.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="mt-20 md:mt-48">
          <div className="w-full md:w-10/12 mx-auto">
            <h2 className="md:mb-10 text-2xl md:text-5xl font-medium md:text-center">
              Frequently asked questions
            </h2>

            {faqData.map((item, index) => (
              <FAQ
                key={index}
                index={index}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
