import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBox = () => {
  return (
    <div
      className="hidden sm:flex ml-5  cursor-pointer items-center 
    h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500"
    >
      <input
        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md 
        focus:outline-none px-4"
        type="text"
      />
      <MagnifyingGlassIcon className="h-12 p-4" />
    </div>
  );
};

export default SearchBox;
