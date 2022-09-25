const NoAccessHeader = ({ type }: { type: string }) => {
  const getType = () => {
    switch (type) {
      case 'no-access':
        return [
          'You do not have access to this form.',
          'Try contacting the owner, if you think this is a mistake.',
        ];

      case 'no-access-owner':
        return [
          'You are not permissioned to access the details of this form.',
          'Try contacting the owner, if you think this is a mistake.',
        ];

      case 'not-responded':
        return [
          'User have not yet responded to this form.',
          `Try sending this form to the user.`,
        ];

      default:
        return ['', ''];
    }
  };
  return (
    <div className="relative w-full md:w-1/2 mx-auto">
      <div className="shadow-md rounded-md bg-white p-4">
        <h2 className="text-2xl font-medium">{getType()[0]}</h2>

        <p className="text-gray-700 my-4 text-base">{getType()[1]}</p>
      </div>
    </div>
  );
};

export default NoAccessHeader;
