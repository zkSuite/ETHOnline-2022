import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

const Summary = ({
  formData,
  isRestricted,
}: {
  formData: any;
  isRestricted: boolean;
}) => {
  const [responses, setResponses] = useState<any>({});

  useEffect(() => {
    const calculateResponses = () => {
      const responses: any = {};

      formData.forEach((data: any) => {
        data.data.forEach((question: any) => {
          if (!responses[question.value]) {
            responses[question.value] = [question.response];
          } else {
            responses[question.value].push(question.response);
          }
        });
      });

      setResponses(responses);
    };

    calculateResponses();
  }, [formData]);

  const renderDownload = (item: any) => {
    // @ts-ignore
    if (Array.isArray(formData[item])) {
      // @ts-ignore
      const data = [[...formData[item]]];
      return (
        <div className="text-right">
          <CSVLink
            data={data}
            filename={`zkForms-wallets.csv`}
            target="_blank"
            className="text-blue-500"
          >
            Download
          </CSVLink>
        </div>
      );
    }
  };

  const renderDownloadResponses = (question: string) => {
    if (Array.isArray(responses[question])) {
      const data = [[...responses[question]]];
      return (
        <div className="text-right">
          <CSVLink
            data={data}
            filename={`zkForms-${question.replaceAll(' ', '-')}.csv`}
            target="_blank"
            className="text-blue-500"
          >
            Download
          </CSVLink>
        </div>
      );
    }
  };

  return (
    <>
      {!isRestricted && (
        <div className="my-5 shadow rounded-md bg-white">
          <h1 className="text-lg border-b p-4">Who has responded?</h1>
          <div className="mt-2 p-4">
            <p className="text-sm text-gray-800">
              {formData?.length} wallet addresses
            </p>
            <ul className="my-2">
              {formData?.slice(0, 5).map((data: any, index: number) => (
                <li
                  key={index}
                  className="p-2 my-2 bg-gray-100 rounded-lg  truncate"
                >
                  {data.user}
                </li>
              ))}
            </ul>
            {renderDownload('walletAddress')}
          </div>
        </div>
      )}

      {Object.keys(responses)?.map((question: any, index: number) => (
        <div key={index} className="my-5 shadow rounded-md bg-white">
          <h1 className="text-lg p-4 pb-0">{question}</h1>
          <p className="mt-1 px-4 text-sm text-gray-800">
            {responses[question]?.length} responses
          </p>
          <div className="mt-2 p-4">
            <ul className="my-2">
              {responses[question]
                ?.slice(0, 5)
                .map((address: string, index: number) => (
                  <li key={index} className="p-2 my-2 bg-gray-100 rounded-lg">
                    {address}
                  </li>
                ))}
            </ul>
            {renderDownloadResponses(question)}
          </div>
        </div>
      ))}
    </>
  );
};

export default Summary;
