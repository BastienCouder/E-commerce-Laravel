import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

import { User } from "@/types/User";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  loading: boolean;
}

type AuthAction =
  | { type: "SET_USER"; payload: User }
  | { type: "CLEAR_USER" }
  | { type: "SET_LOADING"; payload: boolean };

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "CLEAR_USER":
      return { ...state, user: null, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });

  const checkAuth = async () => {
    try {
      const authToken = Cookies.get("authToken");
      dispatch({ type: "SET_LOADING", payload: true });

      if (!authToken) {
        dispatch({ type: "CLEAR_USER" });
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

      dispatch({ type: "SET_USER", payload: response.data });
    } catch (error) {
      dispatch({ type: "CLEAR_USER" });
      console.error("Check Auth error:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
