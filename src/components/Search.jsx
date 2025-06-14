import { X } from "lucide-react";
const Search = ({ searchTerm, setSearchTerm, resetTerm, className }) => {
  const handleSeach = (e) => {
    setSearchTerm(e.toLowerCase());
    resetTerm("");
  };
  return (
    <div className={className}>
      <input
        type="text"
        value={searchTerm}
        placeholder="Buscar por nombre..."
        onChange={(e) => handleSeach(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2 focus:border-gray-500 focus:ring-gray-500"
      />
      <button
        onClick={() => handleSeach("")}
        className="cursor-pointer absolute top-[20%] right-1 ml-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
      >
        <X />
      </button>
    </div>
  );
};

export default Search;
