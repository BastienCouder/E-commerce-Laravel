import { Cart } from "@/types/Cart";
import {
  READ_CART_REQUEST,
  READ_CART_SUCCESS,
  READ_CART_ERROR,
  UPDATE_QUANTITY_REQUEST,
  UPDATE_QUANTITY_SUCCESS,
  UPDATE_QUANTITY_ERROR,
  DELETE_CART_ITEM_ERROR,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  CREATE_CART_ITEM_ERROR,
  CREATE_CART_ITEM_SUCCESS,
  CREATE_CART_ITEM_REQUEST,
} from "../action/cart.action";

// Type de l'état initial
export interface cartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

// Type d'action
interface ReadCartRequestAction {
  type: typeof READ_CART_REQUEST;
}

interface ReadCartSuccessAction {
  type: typeof READ_CART_SUCCESS;
  payload: Cart;
}

interface ReadCartErrorAction {
  type: typeof READ_CART_ERROR;
  payload: string;
}

interface CreateCartItemRequestAction {
  type: typeof CREATE_CART_ITEM_REQUEST;
}

interface CreateCartItemSuccessAction {
  type: typeof CREATE_CART_ITEM_SUCCESS;
  payload: Cart;
}

interface CreateCartItemErrorAction {
  type: typeof CREATE_CART_ITEM_ERROR;
  payload: string;
}

interface UpdateQuantityRequestAction {
  type: typeof UPDATE_QUANTITY_REQUEST;
}

interface UpdateQuantitySuccessAction {
  type: typeof UPDATE_QUANTITY_SUCCESS;
  payload: Cart;
}

interface UpdateQuantityErrorAction {
  type: typeof UPDATE_QUANTITY_ERROR;
  payload: string;
}
interface DeleteCartItemRequestAction {
  type: typeof DELETE_CART_ITEM_REQUEST;
}

interface DeleteCartItemSuccessAction {
  type: typeof DELETE_CART_ITEM_SUCCESS;
  payload: Cart;
}

interface DeleteCartItemErrorAction {
  type: typeof DELETE_CART_ITEM_ERROR;
  payload: string;
}

export type CartAction =
  | ReadCartRequestAction
  | ReadCartSuccessAction
  | ReadCartErrorAction
  | CreateCartItemRequestAction
  | CreateCartItemSuccessAction
  | CreateCartItemErrorAction
  | UpdateQuantityRequestAction
  | UpdateQuantitySuccessAction
  | UpdateQuantityErrorAction
  | DeleteCartItemRequestAction
  | DeleteCartItemSuccessAction
  | DeleteCartItemErrorAction;

// État initial
const initialState: cartState = {
  cart: null,
  loading: false,
  error: null,
};

export default function cartReducer(
  state: cartState = initialState,
  action: CartAction
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

    case CREATE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_CART_ITEM_ERROR:
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

    case DELETE_CART_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_CART_ITEM_SUCCESS:
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
