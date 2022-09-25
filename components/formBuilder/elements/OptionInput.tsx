import ReactTooltip from 'react-tooltip';
import { generateRandomId } from '../../../utils';
import Container from './Container';

const OptionInput = ({
  item,
  handleValue,
  deleteEl,
  handleRequired,
  handleElType,
  duplicateElement,
  addOption,
  handleOptionValues,
  deleteOption,
}: {
  item: any;
  handleValue: (
    id: any,
    e: {
      target: {
        value: any;
      };
    }
  ) => void;
  deleteEl: (id: string) => void;
  handleRequired: (e: any) => void;
  handleElType: (id: any, type: any) => void;
  duplicateElement: (elId: string, elType: any) => void;
  addOption: (id: any, newOption: any) => void;
  handleOptionValues: (elId: any, optionId: any, optionVal: any) => void;
  deleteOption: (elId: any, optionId: any) => void;
}) => {
  const createNewOption = (id: any) => {
    const data = {
      id: generateRandomId(),
      value: '',
    };
    addOption(id, data);
  };
  return (
    <Container
      item={item}
      deleteEl={deleteEl}
      handleRequired={handleRequired}
      handleElType={handleElType}
      duplicateElement={duplicateElement}
    >
      <input
        value={item.value}
        onChange={(e) => handleValue(item.id, e)}
        required={item.required}
        placeholder="Title"
        className="input mb-2"
      />
      {item.options &&
        item.options.length > 0 &&
        item.options.map((opt: any, index: number) => (
          <div key={index} className="my-2 flex items-center">
            <input
              placeholder={`Option ${index + 1}`}
              value={opt?.value}
              key={opt?.id}
              className="input mr-2"
              onChange={(e) =>
                handleOptionValues(item?.id, opt?.id, e.target.value)
              }
            />
            <button
              data-tip="Delete"
              onClick={() => deleteOption(item.id, opt?.id)}
              className="btn text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      <button
        className="btn mt-2 text-blue-500"
        onClick={() => createNewOption(item.id)}
      >
        Add Option
      </button>
      <ReactTooltip place="bottom" />
    </Container>
  );
};

export default OptionInput;
