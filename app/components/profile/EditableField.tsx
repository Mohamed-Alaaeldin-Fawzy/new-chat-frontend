'use client';
import React, { useState } from 'react';
import cls from 'classnames';
import { FaPen } from 'react-icons/fa';
import { FaCheck, FaXmark } from 'react-icons/fa6';

interface EditableFieldProps {
  label: string;
  value?: string;
  id: string;

  handleUserDataChange: React.Dispatch<
    React.SetStateAction<{
      name: string | undefined;
      email: string | undefined;
      image: string;
    }>
  >;

  onSave: () => Promise<void>;
}

const EditableField: React.FC<EditableFieldProps> = ({
  id,
  label,
  value,
  handleUserDataChange,
  onSave,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    handleUserDataChange((prev) => ({ ...prev, [id]: value }));
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="my-2 w-full px-10">
      <p className={cls('mb-4 text-lg', { hidden: isEditing })}>{label}</p>
      <div className="flex w-full justify-between">
        <p className={cls('text-lg', { hidden: isEditing })}>{value}</p>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>
            <FaPen size={15} />
          </button>
        )}
      </div>
      {isEditing && (
        <>
          <label htmlFor={id}>{label}</label>
          <div className="flex w-full items-end justify-between">
            <input
              type="text"
              id={id}
              onChange={handleChange}
              className="mt-4 block w-full origin-left border-b-2 border-white bg-gray-200 p-2 outline-none transition-colors duration-500 focus:border-blue-500"
              value={value}
            />
            <div className="-ml-10 flex gap-2">
              <button
                className="py-2 text-gray-700"
                onClick={async () => {
                  await onSave();
                  setIsEditing(false);
                }}
              >
                <FaCheck size={18} />
              </button>
              <button
                className="py-2 text-gray-700"
                onClick={() => setIsEditing(false)}
              >
                <FaXmark size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditableField;
