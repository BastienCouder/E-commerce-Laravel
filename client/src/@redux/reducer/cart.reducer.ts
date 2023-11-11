import { Cart } from "@/types/Cart";
import {
  READ_CART_REQUEST,
  READ_CART_SUCCESS,
  READ_CART_ERROR,
} from "../action/cart.action";

// Type de l'état initial
export interface cartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

// Type d'action
interface ReadcartRequestAction {
  type: typeof READ_CART_REQUEST;
}

interface ReadcartSuccessAction {
  type: typeof READ_CART_SUCCESS;
  payload: Cart;
}

interface ReadcartErrorAction {
  type: typeof READ_CART_ERROR;
  payload: string;
}

export type cartAction =
  | ReadcartRequestAction
  | ReadcartSuccessAction
  | ReadcartErrorAction
  | UpdateQuantityRequestAction
  | UpdateQuantitySuccessAction
  | UpdateQuantityErrorAction;

// État initial
const initialState: cartState = {
  cart: null,
  loading: false,
  error: null,
};

export default function cartReducer(
  state: cartState = initialState,
  action: cartAction
): cartState {
  switch (action.type) {
    case READ_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case READ_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };

    case READ_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_QUANTITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_QUANTITY_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };

    case UPDATE_QUANTITY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
