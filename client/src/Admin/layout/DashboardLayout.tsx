import { Sidebar } from "@/Admin/components/Sidebar";
import { useAuth } from "@/context/authContext";
import { authToken } from "@/lib/token";
import { Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const { state } = useAuth();
  const navigate = useNavigate();

  if ((state.user?.account && state.user.account !== "admin") || !authToken) {
    navigate("/");
  }

  return (
    <div id="dashboardLayout">
      <div className="content">
        <main className="flex">
          <header className="w-96">
            <Sidebar />
          </header>
          <div className="w-4/5 p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
