import { useAuth } from "@/context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

export default function GuestLayout() {
  const { state } = useAuth();
  const navigate = useNavigate();

  if (!state.user) {
    navigate("/auth");
  }

  return (
    <div id="guestLayout">
      <Header />
      <Outlet />
    </div>
  );
}
