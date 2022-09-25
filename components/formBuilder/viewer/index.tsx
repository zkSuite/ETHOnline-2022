import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import Link from 'next/link';

import Header from './header';
import { storeResponse, getMetadata } from '../../../utils/ipfs';
import { useRouter } from 'next/router';
import ProofModal from './proofModal';

const FormBuilder = () => {
  const router = useRouter();
  const { query } = router;
  const { address } = useAccount();

  const [isOpen, setIsOpen] = useState(false);
  const [isProofValid, setIsProofValid] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({ data: [] });

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const cid = query.cid as string;
        const res = await getMetadata(cid);
        setData(res);
      } catch (error) {
        toast.error('Some error occured. Please refresh the page');
        console.error(error);
      }
    };
    if (query?.cid) fetchFormDetails();
  }, [query]);

  const renderElements = (item: any) => {
    switch (item.type) {
      case 'text':
        return (
          <input
            type="text"
            className="input-answer"
            placeholder="Your answer"
            value={value[item.id]}
            required={item.required}
            onChange={(e) =>
              setValue((prev: any) => ({
                ...prev,
                [item.id]: e.target.value,
              }))
            }
          />
        );
      case 'number':
        return (
          <input
            type="number"
            className="input-answer"
            placeholder="Your answer"
            value={value[item.id]}
            required={item.required}
            onChange={(e) =>
              setValue((prev: any) => ({
                ...prev,
                [item.id]: e.target.value,
              }))
            }
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
                  checked={value[item.id] === option.value}
                  onChange={() =>
                    setValue((prev: any) => ({
                      ...prev,
                      [item.id]: option.value,
                    }))
                  }
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

  const isFormValid = () => {
    const filled = data?.data?.filter(
      (item: any) => item.required && !value[item.id]
    );
    return filled.length === 0;
  };

  const submitResponse = async () => {
    setIsLoading(true);
    const details: any = {
      form: [data.owner, data.title, data.timestamp].join('-'),
      data: [],
      user: address,
      timestamp: Date.now(),
    };

    for (let i of Object.keys(value)) {
      data.data.forEach((item: any) => {
        if (item.id === i) {
          details.data.push({ ...item, response: value[i] });
        }
      });
    }

    try {
      const res = await storeResponse(details);
      console.log(res);
      setValue({});
      setIsLoading(false);
      toast.success('Response submitted successfully');
      router.replace(`/forms/responded?cid=${query?.cid}`);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error('Some error occured. Please refresh the page');
    }
  };

  return (
    <div className="relative w-full md:w-1/2 mx-auto px-5 md:px-0">
      <Header
        title={data.title}
        deadline={data.deadline}
        description={data.description}
        image={data.image}
        owner={data.owner}
        isResponseView={false}
        responseAddress={''}
        isRestricted={data.restricted?.length > 0}
      />

      {data?.data?.map((item: any) => (
        <div key={item.id} className="my-5 shadow p-4 rounded-md bg-white">
          <h1 className="text-lg">
            {item.value}
            {item.required && <span className="text-red-600"> *</span>}
          </h1>
          <div className="mt-4">{renderElements(item)}</div>
        </div>
      ))}

      <div className="my-5 flex justify-between">
        {data.restricted?.length > 0 && !isProofValid ? (
          <button
            className="btn bg-purple-800 hover:bg-purple-700 text-white !font-normal text-sm"
            onClick={() => {
              if (!address) {
                toast.error('Please connect your wallet');
                return;
              }
              setIsOpen(true);
            }}
          >
            {isSubmitting ? 'Generating...' : 'Generate Proof'}
          </button>
        ) : (
          <button
            className="btn bg-purple-800 hover:bg-purple-700 text-white !font-normal text-sm"
            onClick={() => {
              if (!address) {
                toast.error('Please connect your wallet');
                return;
              }
              if (!isFormValid()) {
                toast.error('Please fill all required fields');
                return;
              }

              submitResponse();
            }}
            disabled={isLoading || !address}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        )}
        <button
          className="btn text-purple-800 hover:text-purple-700 hover:bg-purple-200 transition-all !font-medium !shadow-none text-sm"
          onClick={() => {
            setValue({});
            // window.location.reload();
          }}
        >
          Clear form
        </button>
      </div>

      <p className="text-xs text-center mt-8 text-gray-600">
        Never submit passwords through zkForms. This content is neither created
        nor endorsed by zkForms.
      </p>
      <div className="text-center my-5">
        <Link href={process.env.NEXT_PUBLIC_HOST!}>
          <a target="_blank" className="text-2xl font-light text-gray-500">
            Created with <span className="font-medium">zkForms</span>
          </a>
        </Link>
      </div>

      <ProofModal
        isOpen={isOpen}
        setIsProofValid={setIsProofValid}
        setIsOpen={setIsOpen}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        restricted={data.restricted ? data.restricted.split(',') : []}
        formId={data.formId || '0x0'}
      />
    </div>
  );
};
export default FormBuilder;
