import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import NoAccessHeader from '../../../header/noAccess';
import Header from '../../viewer/header';

const Responses = ({ formData, search }: { formData: any; search: string }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const searchData = () => {
      const details = formData.details.filter(
        (detail: any) => detail.user.toLowerCase() === search.toLowerCase()
      );

      setData(details);
    };
    if (ethers.utils.isAddress(search)) {
      searchData();
    } else {
      setData(null);
    }
  }, [search]);

  const renderElements = (item: any) => {
    switch (item.type) {
      case 'text':
        return (
          <input
            type="text"
            className="input-answer disabled:bg-white"
            placeholder="Your answer"
            value={item.response}
            disabled
          />
        );
      case 'number':
        return (
          <input
            type="number"
            className="input-answer disabled:bg-white"
            placeholder="Your answer"
            value={item.response}
            disabled
          />
        );
      case 'option':
        return (
          <div className="w-fit">
            {item?.options?.map((option: any, index: number) => (
              <div key={index} className="flex items-center relative my-2">
                <input
                  id={option.id}
                  type="radio"
                  className="input-answer mx-4 !w-fit"
                  value={option.value}
                  checked={option.value === item.response}
                  readOnly
                />
                <label htmlFor={option.id} className="text-base">
                  {option.value}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="mt-5">
      {data && search && (
        <>
          {data.length === 0 ? (
            <div className="not-responded">
              <NoAccessHeader type="not-responded" />
            </div>
          ) : (
            <Header
              title={formData?.metadata?.title}
              deadline={formData?.metadata?.deadline}
              description={formData?.metadata?.description}
              image={formData?.metadata?.image}
              owner={formData?.metadata?.owner}
              isResponseView={true}
              responseAddress={search}
              isRestricted={false}
            />
          )}

          {data[0]?.data?.map((item: any) => (
            <div key={item.id} className="my-5 shadow p-4 rounded-md bg-white">
              <h1 className="text-lg">
                {item.value}
                {item.required && <span className="text-red-600"> *</span>}
              </h1>
              <div className="mt-4">{renderElements(item)}</div>
            </div>
          ))}

          {data?.[0]?.timestamp && (
            <p className="text-xs text-gray-500 text-right font-normal">
              Submitted on:{' '}
              {new Date(data[0]?.timestamp).toISOString().split('T')[0]}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Responses;
