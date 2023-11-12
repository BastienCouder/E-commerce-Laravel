import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {
  const { state } = useAuth();

  if (state.user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div id="guestLayout">
      <Outlet />
    </div>
  );
}
