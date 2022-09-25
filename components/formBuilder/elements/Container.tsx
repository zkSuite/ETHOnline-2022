/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Select from 'react-select';
import { formEl } from '../constants';

const Container = ({
  item,
  deleteEl,
  handleRequired,
  handleElType,
  duplicateElement,
  children,
}: {
  item: any;
  deleteEl: (id: string) => void;
  handleRequired: (e: any) => void;
  handleElType: (id: any, type: any) => void;
  duplicateElement: (elId: string, elType: any) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="my-5 border-l-4 border-blue-300 shadow-md p-4 rounded-md bg-white">
      <div className="text-center">
        <button className="cusor-move">
          <img src="/static/drag.svg" alt="drag" className="w-8 h-8" />
        </button>
      </div>
      <div className="flex flex-col p-3">
        <div>{children}</div>
        <form className="w-full mt-5">
          <label className="text-sm">Type</label>
          <Select
            value={formEl.find((el: any) => el.value == item.type)}
            onChange={(option) => handleElType(item.id, option!.value)}
            options={formEl}
            defaultValue={formEl[0]}
            className="mt-2"
          />
        </form>
      </div>
      <hr className="mt-2 mb-5" />
      <div className="flex items-center">
        <button
          data-tip="Delete"
          className="btn mx-2 bg-red-400"
          onClick={() => deleteEl(item.id)}
        >
          <img src="/static/delete.svg" alt="delete" />
        </button>
        <button
          onClick={() => duplicateElement(item.id, item.type)}
          className="btn mx-2"
        >
          <img src="/static/copy.svg" alt="duplicate" />
        </button>

        <input
          id={item.id}
          type="radio"
          className="mx-2"
          onClick={() => {
            handleRequired(item.id);
          }}
          checked={item.required}
        />
        <label htmlFor={item.id} className="text-sm">
          Required
        </label>
      </div>
    </div>
  );
};

export default Container;
