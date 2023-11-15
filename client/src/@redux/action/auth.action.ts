import { Dispatch } from "redux";
import { Auth, User } from "@/types/User";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import axiosClient from "@/lib/axios-client";

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

const config: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
};
const createAuthAction =
  <T>(type: string, url: string, userData: Auth): any =>
  async (dispatch: Dispatch<AuthAction<T>>) => {
    dispatch({ type });

    try {
      const response = await axios.post(url, userData, config);
      const token = response.data.message;

      // Stockez le token dans un cookie
      Cookies.set("authToken", token);

      if (response.data) {
        dispatch({ type: `${type}_SUCCESS`, payload: response.data });
        window.location.reload();
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
export const register = (userData: Auth) =>
  createAuthAction<AuthUser>(
    REGISTER_REQUEST,
    `${import.meta.env.VITE_API_URL}/api/register`,
    userData
  );

export const login = (userData: Auth) =>
  createAuthAction<AuthUser>(
    LOGIN_REQUEST,
    `${import.meta.env.VITE_API_URL}/api/login`,
    userData
  );

export const logout = (): any => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: LOGOUT_REQUEST });
      Cookies.remove("authToken");
      dispatch({ type: LOGOUT_SUCCESS });
      window.location.reload();
    } catch (error: any) {
      dispatch({ type: LOGOUT_FAILURE, error: error.message });
    }
  };
};

//CHECK AUTH
export const CHECK_AUTH_REQUEST = "CHECK_AUTH_REQUEST";
export const CHECK_AUTH_SUCCESS = "CHECK_AUTH_SUCCESS";
export const CHECK_AUTH_ERROR = "CHECK_AUTH_ERROR";

interface CheckAuthRequestAction {
  type: typeof CHECK_AUTH_REQUEST;
}

interface CheckAuthSuccessAction {
  type: typeof CHECK_AUTH_SUCCESS;
  payload: User; // Assurez-vous que le type User est correct
}

interface CheckAuthErrorAction {
  type: typeof CHECK_AUTH_ERROR;
  payload: string;
}

export const checkAuthRequest = (): CheckAuthRequestAction => ({
  type: CHECK_AUTH_REQUEST,
});

export const checkAuthSuccess = (payload: User): CheckAuthSuccessAction => ({
  type: CHECK_AUTH_SUCCESS,
  payload,
});

export const checkAuthError = (payload: string): CheckAuthErrorAction => ({
  type: CHECK_AUTH_ERROR,
  payload,
});

export const checkAuth = (): any => {
  return async (dispatch: Dispatch) => {
    dispatch(checkAuthRequest());

    try {
      const authToken = Cookies.get("authToken");

      if (!authToken) {
        dispatch(checkAuthError("Auth token not found"));
        return;
      }

      const response = await axiosClient.get(`/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      dispatch(checkAuthSuccess(response.data));
    } catch (error: any) {
      dispatch(checkAuthError(error.message));
      console.error("Check Auth error:", error);
    }
  };
};
