import React from 'react';
import cls from 'classnames';

interface EditableFieldProps {
  label: string;
  value?: string;
  id: string;
  isEditing: boolean;
  handleUserDataChange: React.Dispatch<
    React.SetStateAction<{
      name: string | undefined;
      email: string | undefined;
      image: string | undefined;
    }>
  >;
}

const EditableField: React.FC<EditableFieldProps> = ({
  id,
  label,
  value,
  isEditing,
  handleUserDataChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    handleUserDataChange((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="my-2">
      <div className="flex">
        <p className={cls('mr-1 text-lg', { hidden: isEditing })}>{label}:</p>
        <p className={cls('text-lg', { hidden: isEditing })}>{value}</p>
      </div>
      {isEditing && (
        <>
          <label htmlFor={id}>{label}</label>
          <input
            type="text"
            id={id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={value}
          />
        </>
      )}
    </div>
  );
};

export default EditableField;
