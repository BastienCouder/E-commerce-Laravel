import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome, AiOutlineAppstoreAdd } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Logout from "@/components/Logout";
import { BiSearch } from "react-icons/bi";
import UidContext from "@/services/AppContext";

const Navigation = () => {
    const uid = useContext(UidContext);

    return (
        <header className="fixed bg-black bottom-0 left-0 w-full flex items-star justify-between items-end pt-3 pb-2 sm:relative sm:items-start sm:py-10  sm:h-full sm:w-52 lg:w-60  after:content[''] after:absolute after:w-screen after:h-px after:bg-grey after:top-0 after:right-0  sm:after:content[''] sm:after:absolute sm:after:h-screen sm:after:w-px sm:after:bg-grey sm:after:top-0 sm:after:right-0 ">
            {/* <ul className="flex flex-row justify-evenly w-full sm:flex-col gap-2 sm:gap-4 sm:ms-3 sm:me-4 sm:ms-4 text-2xl">
                <NavLink to="/">
                    <li className="flex items-center w-full me-4 ps-4 py-3 rounded-2xl hover:bg-blackHover">
                        <AiFillHome />
                        <span className="ms-4 text-base sm:block hidden">
                            Accueil
                        </span>
                    </li>
                </NavLink>
                <NavLink to="/search">
                    <li className="flex items-center w-full me-4  ps-4 py-3 rounded-2xl hover:bg-blackHover">
                        <BiSearch />
                        <span className="ms-4 text-base sm:block hidden">
                            Rechercher
                        </span>
                    </li>
                </NavLink>
                {uid ? (
                    <NavLink to="/new-post">
                        <li className="flex items-center w-full me-4 ps-4  py-3 rounded-2xl hover:bg-blackHover">
                            <AiOutlineAppstoreAdd />
                            <span className="ms-4 text-base sm:block hidden">
                                Nouveau post
                            </span>
                        </li>
                    </NavLink>
                ) : null}
                <NavLink to="/profil">
                    <li className="flex items-center w-full me-4 ps-4  py-3 rounded-2xl hover:bg-blackHover">
                        <FaUserCircle />
                        <span className="ms-4 text-base sm:block hidden">
                            Profil
                        </span>
                    </li>
                </NavLink>
                {uid ? (
                    <NavLink to="/">
                        <Logout />
                    </NavLink>
                ) : null}
            </ul> */}
        </header>
    );
};

export default Navigation;
