import { Search, X } from "lucide-react";
import { useState } from "react";

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  const clearSearch = () => setQuery("");

  return (
    <div className="relative group transition-all w-full sm:max-w-xs">
      {/* Search Icon */}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-blue-400"
        size={20}
      />

      {/* Input Box */}
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-800
                   bg-transparent text-gray-700 placeholder-gray-400 shadow-sm
                   hover:shadow-md
                   transition-all duration-300 ease-in-out
                   focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300
                   sm:pl-12 sm:pr-12"
      />

      {/* Clear Button (shows only when query exists) */}
      {query && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors duration-300"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBox;