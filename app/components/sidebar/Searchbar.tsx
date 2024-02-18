import { FaMagnifyingGlass } from 'react-icons/fa6';

interface SearchbarProps {
  value: string;
  onChange: any;
}
const Searchbar = ({ value, onChange }: SearchbarProps) => {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="search..."
        className="w-full grow rounded-l-lg border border-r-0 border-gray-300 p-2"
        value={value}
        onChange={onChange}
      />
      <button
        type="submit"
        className="rounded-r-lg border border-gray-300 bg-gray-300 p-2 text-gray-700"
      >
        <FaMagnifyingGlass size={24} />
      </button>
    </div>
  );
};

export default Searchbar;