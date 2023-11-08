import axios from "axios";
import cookie from "js-cookie";
import { BiLogOut } from "react-icons/bi";
import { Button } from "./ui/button";

export default function Logout() {
    // const removeCookie = (key) => {
    //     if (window !== "undefined") {
    //         cookie.remove(key, { expires: 1 });
    //     }
    // };

    // const logout = async () => {
    //     await axios({
    //         method: "get",
    //         url: `${apiUrl}/auth/logout`,
    //         withCredentials: true,
    //     })
    //         .then(() => removeCookie("jwt"))
    //         .catch((err) => console.log(err));

    //     window.location = "/";
    // };

    return (
        <Button
            // onClick={logout}
            className="flex items-center w-full me-4 ps-4 lg:pe-16 sm:pe-5 py-3 rounded-2xl hover:bg-blackHover"
        >
            <BiLogOut />
            <span className="ms-4 text-base sm:block hidden">Deconnexion</span>
        </Button>
    );
}
