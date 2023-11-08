import { Input } from "@/components/ui/input";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ searchTerm, onSearchChange }: SearchProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e);
  };

  return (
    <div className="space-y-1 relative">
      <Input
        className="w-full md:w-[20rem] bg-primary p-2 border-none outline-none text-white"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Rechercher..."
      />
      <div className="absolute text-zinc-900 top-1.5 right-0 px-2 outline-none text-xl cursor-pointer">
        <AiOutlineSearch size={20} className="text-white mr-1" />
      </div>
    </div>
  );
}