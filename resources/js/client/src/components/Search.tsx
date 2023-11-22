import { Input } from "@/components/ui/input";
import { useSearch } from "@/context/searchContext";
import { AiOutlineSearch } from "react-icons/ai";

export default function Search() {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="space-y-1 relative">
      <Input
        className="w-full h-[2rem] md:w-[20rem] p-2 border-none outline-none"
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="absolute top-1 right-0 px-2 outline-none text-xl cursor-pointer">
        <AiOutlineSearch size={18} className="mr-1" />
      </div>
    </div>
  );
}
