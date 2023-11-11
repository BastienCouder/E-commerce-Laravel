import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div id="dashboardLayout">
      <div className="content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
