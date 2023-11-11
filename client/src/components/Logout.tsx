import { logout } from "@/@redux/action/auth.action";
import { useStateContext } from "@/context/ContextProvider";
import { useAppDispatch } from "@/hook";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = async (e: any) => {
    e.preventDefault();

    try {
      dispatch(logout());
      setUser({});
      setToken(null);
    } catch (error: any) {
      console.error(error.response.data);
    }
    navigate("/");
  };

  return (
    <span onClick={onLogout} className="capitalize cursor-pointer text-sm">
      deconnexion
    </span>
  );
}
