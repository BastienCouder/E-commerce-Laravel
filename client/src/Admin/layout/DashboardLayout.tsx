import { Sidebar } from "@/Admin/components/Sidebar";
import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { state } = useAuth();

  if (state.user?.account && state.user.account !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div id="dashboardLayout">
      <div className="content">
        <main className="flex">
          <header className="w-1/5">
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
