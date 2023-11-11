import { User } from "@/types/User";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../action/auth.action";

// Type de l'état initial
export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Type d'action
interface AuthActionBase {
  type: string;
  payload?: any;
}

type AuthAction =
  | AuthActionBase
  | {
      type: typeof LOGIN_SUCCESS | typeof REGISTER_SUCCESS;
      payload: { user: User; token: string };
    }
  | {
      type:
        | typeof LOGIN_FAILURE
        | typeof REGISTER_FAILURE
        | typeof LOGOUT_FAILURE;
      payload: string;
    }
  | {
      type:
        | typeof LOGIN_REQUEST
        | typeof REGISTER_REQUEST
        | typeof LOGOUT_REQUEST;
    }
  | { type: typeof LOGOUT_SUCCESS };

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        ...initialState, // Réinitialisez l'état à sa valeur initiale lors de la déconnexion
      };

    default:
      return state;
  }
};

export default authReducer;
