import { logout } from "@/@redux/action/auth.action";
import { useAppDispatch } from "@/hook";

export default function Logout() {
  const dispatch = useAppDispatch();

  const onLogout = async (e: any) => {
    e.preventDefault();

    try {
      await dispatch(logout());
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  return (
    <span onClick={onLogout} className="capitalize cursor-pointer text-sm">
      déconnexion
    </span>
  );
}
