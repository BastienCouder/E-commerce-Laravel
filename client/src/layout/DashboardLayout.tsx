import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

import { useEffect } from "react";
import axiosClient from "@/axios-client";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();

    // if (!token) {
    //     return <Navigate to="/auth" />;
    // }

    const onLogout = (e: any) => {
        e.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/profile").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="dashboardLayout">
            <div className="content">
                <div>
                    {user.name} &nbsp; &nbsp;
                    <a onClick={onLogout} className="btn-logout" href="#">
                        Logout
                    </a>
                </div>

                <main>
                    <Outlet />
                </main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </div>
    );
}
