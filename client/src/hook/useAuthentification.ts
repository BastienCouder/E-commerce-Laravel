import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  name: string;
  // Ajoutez d'autres propriétés de l'utilisateur selon votre besoin
}

const useCheckAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        console.log(authToken);
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      setUser(null);
      console.error("Check Auth error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { user, loading };
};

export default useCheckAuth;
