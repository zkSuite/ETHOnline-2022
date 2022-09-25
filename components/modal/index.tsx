import React from 'react';

const Modal = ({
  isOpen,
  title,
  children,
  customBtn,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  customBtn: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <>
      {isOpen ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/20">
            <div className="relative mx-auto w-11/12 md:w-1/3 max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-base md:text-xl font-semibold">
                    {title}
                  </h3>
                  <button
                    className="bg-gray-200 rounded-full float-right h-7 w-7 flex item-center justify-center "
                    onClick={onClose}
                  >
                    <span className="text-black text-center">x</span>
                  </button>
                </div>
                {children}
                <div className="flex items-center justify-end px-4 py-2 border-t border-solid border-blueGray-200 rounded-b">
                  {customBtn ?? (
                    <button
                      className="btn bg-purple-800 hover:bg-purple-700 text-white"
                      onClick={onSubmit}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
