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
    </div>
  );
};

export default Search;
