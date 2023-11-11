import { Dispatch } from "redux";
import axiosClient from "@/lib/axios-client";
import { Auth, User } from "@/types/User";

// Types
interface AuthUser {
  user: any;
  token: string;
}

// Action Types
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

// Generic Action Interface
interface AuthAction<T = void> {
  type: string;
  payload?: T;
  error?: string;
}

// Action Creators
const createAuthAction =
  <T>(
    type: string,
    url: string,
    userData: Auth,
    setUser: (user: any) => void,
    setToken: (token: string) => void
  ): any =>
  async (dispatch: Dispatch<AuthAction<T>>) => {
    dispatch({ type });

    try {
      const response = await axiosClient.post(url, userData);

      if (response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        dispatch({ type: `${type}_SUCCESS`, payload: response.data });
      } else {
        console.error(
          `Response from ${url} does not contain expected data property:`,
          response
        );
        dispatch({
          type: `${type}_FAILURE`,
          error: `Unexpected response from ${url}`,
        });
      }
    } catch (error: any) {
      dispatch({
        type: `${type}_FAILURE`,
        error: error.response?.data || `An error occurred during ${url}`,
      });
      console.error(error.response?.data || `An error occurred during ${url}`);
      throw error;
    }
  };

// Actions
export const register = (
  userData: Auth,
  setUser: (user: User) => void,
  setToken: (token: string) => void
) =>
  createAuthAction<AuthUser>(
    REGISTER_REQUEST,
    "/register",
    userData,
    setUser,
    setToken
  );

export const login = (
  userData: Auth,
  setUser: (user: User) => void,
  setToken: (token: string) => void
) =>
  createAuthAction<AuthUser>(
    LOGIN_REQUEST,
    "/login",
    userData,
    setUser,
    setToken
  );

export const logout = (): any => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: LOGOUT_REQUEST });
      // Ajoutez ici toute logique de déconnexion nécessaire, comme la suppression du token, etc.
      // Exemple : localStorage.removeItem('token');
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error: any) {
      dispatch({ type: LOGOUT_FAILURE, error: error.message });
    }
  };
};
