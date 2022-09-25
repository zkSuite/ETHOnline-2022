import Container from './Container';

const NumberInput = ({
  item,
  handleValue,
  deleteEl,
  handleRequired,
  handleElType,
  duplicateElement,
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
}) => {
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
      <input
        placeholder="Your answer"
        disabled
        className="input cursor-not-allowed bg-gray-200"
        type="number"
      />
    </Container>
  );
};

export default NumberInput;
