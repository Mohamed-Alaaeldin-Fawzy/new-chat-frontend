import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchBar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: any;
}) => {
  return (
    <div className="flex max-w-56">
      <input
        type="text"
        placeholder="search..."
        className="w-full rounded-l-lg border border-r-0 border-gray-300 p-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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

export default SearchBar;
