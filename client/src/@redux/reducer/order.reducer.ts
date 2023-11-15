import {
  READ_ORDER_REQUEST,
  READ_ORDER_SUCCESS,
  READ_ORDER_ERROR,
  CREATE_ORDER_ITEM_REQUEST,
  CREATE_ORDER_ITEM_SUCCESS,
  CREATE_ORDER_ITEM_ERROR,
} from "../action/order.action";
import { Order } from "@/types/Order";

// Type de l'état initial
export interface OrderState {
  order: Order | null;
  loading: boolean;
  error: string | null;
}

// Type d'action
interface ReadOrderRequestAction {
  type: typeof READ_ORDER_REQUEST;
}

interface ReadOrderSuccessAction {
  type: typeof READ_ORDER_SUCCESS;
  payload: Order;
}

interface ReadOrderErrorAction {
  type: typeof READ_ORDER_ERROR;
  payload: string;
}

interface CreateOrderRequestAction {
  type: typeof CREATE_ORDER_ITEM_REQUEST;
}

interface CreateOrderSuccessAction {
  type: typeof CREATE_ORDER_ITEM_SUCCESS;
  payload: Order;
}

interface CreateOrderErrorAction {
  type: typeof CREATE_ORDER_ITEM_ERROR;
  payload: string;
}

export type OrderAction =
  | ReadOrderRequestAction
  | ReadOrderSuccessAction
  | ReadOrderErrorAction
  | CreateOrderRequestAction
  | CreateOrderSuccessAction
  | CreateOrderErrorAction;

// État initial
const initialState: OrderState = {
  order: null,
  loading: false,
  error: null,
};

export default function orderReducer(
  state: OrderState = initialState,
  action: OrderAction
): OrderState {
  switch (action.type) {
    case READ_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case READ_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: null,
      };

    case READ_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_ORDER_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_ORDER_ITEM_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_ORDER_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
