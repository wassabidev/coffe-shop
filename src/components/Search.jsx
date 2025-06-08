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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Search;
