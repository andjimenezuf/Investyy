// app/components/SearchBar.tsx
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

interface SearchBarProps {
  onSearch: (symbol: string) => void;
  onVisualize: (symbol: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onVisualize }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm) {
      onSearch(searchTerm.toUpperCase());
      setSearchTerm("");
    } else {
      alert("Please enter a stock symbol (e.g., AAPL).");
    }
  };

  const handleVisualize = () => {
    if (searchTerm) {
      onVisualize(searchTerm.toUpperCase());
    } else {
      alert("Please enter a stock symbol (e.g., AAPL).");
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
      <div className="flex items-center w-full max-w-lg space-x-4">
        <Input
          label="Search for assets like stock tickers"
          isClearable
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toUpperCase())} // Convert input to uppercase
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Button
          color="primary"
          variant="shadow"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-9 rounded-full ml-4"
          onClick={handleSearch}
        >
          Search Asset
        </Button>
        <Button
          color="secondary"
          variant="shadow"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-10 rounded-full ml-2"
          onClick={handleVisualize}
        >
          Visualize Asset
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
