import { BiLogOut } from "react-icons/bi";
import { Button } from "./ui/button";
import { useStateContext } from "@/context/ContextProvider";
import axiosClient from "@/lib/axios-client";

export default function Logout() {
  const { setUser, setToken } = useStateContext();

  const logout = (e: any) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <Button
      onClick={logout}
      className="flex items-center w-full me-4 ps-4 lg:pe-16 sm:pe-5 py-3 rounded-2xl hover:bg-blackHover"
    >
      <BiLogOut />
      <span className="ms-4 text-base sm:block hidden">Deconnexion</span>
    </Button>
  );
}
