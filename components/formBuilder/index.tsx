import { useState } from 'react';
import Nestable from 'react-nestable';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';

import { TextArea, NumberInput, OptionInput } from './elements';
import Header from './header';
import { generateRandomId } from '../../utils';
import { storeFile } from '../../utils/ipfs';
import Modal from '../modal';
import { isAddress } from 'ethers/lib/utils';

const FormBuilder = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [deadline, setDeadline] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [restricted, setRestricted] = useState<string>('');
  const [data, setData] = useState<any[]>([
    {
      id: generateRandomId(),
      value: null,
      type: 'text',
      required: false,
    },
  ]);
  const [formData, setFormData] = useState('text');

  const { address } = useAccount();

  const addElement = () => {
    const newData = {
      id: generateRandomId(),
      value: null,
      type: formData,
      required: false,
    };

    setData((prev: any) => [...prev, newData]);
    setFormData('text');
  };

  const deleteEl = (id: string) => {
    const temp = data.filter((el: any) => el.id !== id);
    setData(temp);
  };

  const addAfter = (
    elArray: any[],
    index: number,
    newEl: { id: string; value: string | null; type: any; required: boolean }
  ) => {
    return [...elArray.slice(0, index + 1), newEl, ...elArray.slice(index + 1)];
  };

  const duplicateElement = (elId: string, elType: any) => {
    const elIdx = data.findIndex((el: { id: string }) => el.id === elId);
    const newEl = {
      id: generateRandomId(),
      value: null,
      type: elType,
      required: false,
    };
    const newArr = addAfter(data, elIdx, newEl);
    setData(newArr);
  };

  const handleOnChangeSort = ({ items }: { items: any[] }) => {
    setData(items);
  };

  const handleValue = (id: any, e: { target: { value: any } }) => {
    const newArr = data.map((el: { id: any }) => {
      if (el.id == id) {
        return { ...el, value: e.target.value };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const handleRequired = (id: any) => {
    const newArr = data.map((el: { id: any; required: any }) => {
      if (el.id == id) {
        return { ...el, required: !el.required };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const handleElType = (id: any, type: any) => {
    const newArr = data.map((el: { id: any }) => {
      if (el.id == id) {
        return { ...el, type: type };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const addOption = (id: any, newOption: any) => {
    const newArr = data.map((el: { id: any; options: any }) => {
      if (el.id == id) {
        const objVal = 'options' in el ? el?.options : [];
        return { ...el, options: [...objVal, newOption] };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const handleOptionValues = (elId: any, optionId: any, optionVal: any) => {
    const newArr = data.map((el: { id: any; options: any[] }) => {
      if (el.id == elId) {
        el?.options &&
          el?.options.map((opt: { id: any; value: any }) => {
            if (opt.id == optionId) {
              opt.value = optionVal;
            }
          });
        return el;
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const deleteOption = (elId: any, optionId: any) => {
    const newArr = data.map((el: { id: any; options: any[] }) => {
      if (el.id == elId) {
        const newOptions =
          el?.options &&
          el?.options.filter((opt: { id: any }) => opt.id != optionId);
        return { ...el, options: newOptions };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const renderElements = ({ item }: { item: any }) => {
    switch (item.type) {
      case 'text':
        return (
          <TextArea
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case 'number':
        return (
          <NumberInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case 'option':
        return (
          <OptionInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
          />
        );
      default:
        return <></>;
    }
  };

  const createForm = async () => {
    setIsLoading(true);

    const details = {
      formId: generateRandomId(),
      title,
      description,
      data,
      imageFile: image,
      owner: address,
      timestamp: Date.now(),
      deadline,
      restricted: isError ? null : restricted,
    };

    try {
      // @ts-ignore
      const res = await storeFile(details);
      console.log(res);
      toast.success('Form created successfully');
      setTitle('');
      setDescription('');
      setImage(null);
      setDeadline(new Date().toISOString().split('T')[0]);
      setIsError(false);
      setRestricted('');
      setData([
        {
          id: generateRandomId(),
          value: null,
          type: 'text',
          required: false,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error creating form');
      console.log(error);
    }
  };

  const onSubmit = () => {
    let sum = 0;

    const restrictedAddresses = restricted
      .split(',')
      .map((addr: string) => {
        if (isAddress(addr.trim())) {
          return addr.trim();
        }
        sum += 1;
        return null;
      })
      .filter(Boolean)
      .slice(0, 10)
      .join(',');

    if (sum > 0) {
      setIsLoading(false);
      setIsError(true);
      toast.error(`${sum} invalid addresses found`);
      return;
    }

    setIsError(false);
    setRestricted(restrictedAddresses);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-1/2 mx-auto">
      <div className="flex items-start">
        <div className="flex-1">
          <Header
            title={title}
            setTitle={setTitle}
            setImage={setImage}
            deadline={deadline}
            setDeadline={setDeadline}
            description={description}
            setDescription={setDescription}
          />
          <p className="text-center my-10 text-gray-400 underline">
            Form Elements
          </p>

          <Nestable
            items={data}
            renderItem={renderElements}
            maxDepth={1}
            onChange={handleOnChangeSort}
          />

          <div className="mt-5 flex justify-between">
            <button
              className="btn bg-[#804A00] hover:bg-[#804A00]/90 text-white !font-normal"
              onClick={() => setIsOpen(true)}
            >
              Restrict Access
            </button>
            <button
              className="btn bg-purple-800 hover:bg-purple-700 text-white !font-normal"
              disabled={isLoading}
              onClick={() => {
                if (!address) {
                  toast.error('Please connect your wallet');
                } else {
                  createForm();
                }
              }}
            >
              {isLoading ? 'Loading...' : 'Create Form'}
            </button>
          </div>
        </div>
        <button
          onClick={addElement}
          className="mt-5 ml-5 border border-primary/70 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#43a04b"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>

      <Modal
        title="Restrict Access"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={onSubmit}
        customBtn={null}
      >
        <div className="p-5">
          <p className="font-medium">
            Add wallet address to restrict access (Max 10)
          </p>

          <div className="mt-4">
            <textarea
              placeholder="Wallet addresses (Comma seperated)"
              className="input"
              value={restricted}
              onChange={(e) => setRestricted(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default FormBuilder;
