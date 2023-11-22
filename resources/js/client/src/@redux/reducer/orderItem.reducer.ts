// orderItemReducer.ts

import { OrderItem } from "@/types/Order";
import {
  READ_ALL_ORDER_ITEMS_ERROR,
  READ_ALL_ORDER_ITEMS_REQUEST,
  READ_ALL_ORDER_ITEMS_SUCCESS,
  UPDATE_ORDER_ITEM_STATUS_ERROR,
  UPDATE_ORDER_ITEM_STATUS_REQUEST,
  UPDATE_ORDER_ITEM_STATUS_SUCCESS,
} from "../action/orderItems.action";

interface OrderItemState {
  orderItems: OrderItem[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderItemState = {
  orderItems: [],
  loading: false,
  error: null,
};

export interface ReadAllOrderItemsRequestAction {
  type: typeof READ_ALL_ORDER_ITEMS_REQUEST;
}

export interface ReadAllOrderItemsSuccessAction {
  type: typeof READ_ALL_ORDER_ITEMS_SUCCESS;
  payload: OrderItem[];
}

export interface ReadAllOrderItemsErrorAction {
  type: typeof READ_ALL_ORDER_ITEMS_ERROR;
  payload: string;
}

export interface UpdateOrderItemStatusRequestAction {
  type: typeof UPDATE_ORDER_ITEM_STATUS_REQUEST;
}

export interface UpdateOrderItemStatusSuccessAction {
  type: typeof UPDATE_ORDER_ITEM_STATUS_SUCCESS;
}

export interface UpdateOrderItemStatusErrorAction {
  type: typeof UPDATE_ORDER_ITEM_STATUS_ERROR;
  payload: string;
}

export type OrderItemAction =
  | ReadAllOrderItemsRequestAction
  | ReadAllOrderItemsSuccessAction
  | ReadAllOrderItemsErrorAction
  | UpdateOrderItemStatusRequestAction
  | UpdateOrderItemStatusSuccessAction
  | UpdateOrderItemStatusErrorAction;

const orderItemReducer = (
  state: OrderItemState = initialState,
  action: OrderItemAction
): OrderItemState => {
  switch (action.type) {
    case READ_ALL_ORDER_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case READ_ALL_ORDER_ITEMS_SUCCESS:
      return {
        ...state,
        orderItems: action.payload,
        loading: false,
        error: null,
      };

    case READ_ALL_ORDER_ITEMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ORDER_ITEM_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_ORDER_ITEM_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case UPDATE_ORDER_ITEM_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderItemReducer;
