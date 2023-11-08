import { Input } from "@/components/ui/input";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchProps {
    // searchTerm: string;
    // onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search() {
    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     onSearchChange(e);
    // };

    return (
        <div className="space-y-1 relative">
            <Input
                className="w-full h-[2rem] md:w-[20rem] p-2 border-none outline-none"
                type="text"
                // value={searchTerm}
                // onChange={handleSearchChange}
                placeholder="Rechercher..."
            />
            <div className="absolute top-1 right-0 px-2 outline-none text-xl cursor-pointer">
                <AiOutlineSearch size={18} className="mr-1" />
            </div>
        </div>
    );
}
