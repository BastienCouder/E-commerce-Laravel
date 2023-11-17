import axiosClient from "@/lib/axios-client";
import { authToken } from "@/lib/token";
import { Order, OrderItem } from "@/types/Order";
import { Dispatch } from "redux";

export type OrderAction =
  | ReadOrderRequestAction
  | ReadOrderSuccessAction
  | ReadOrderErrorAction
  | CreateOrderItemRequestAction
  | CreateOrderItemSuccessAction
  | CreateOrderItemErrorAction
  | ReadAllOrderItemsRequestAction
  | ReadAllOrderItemsSuccessAction
  | ReadAllOrderItemsErrorAction;

// READ
// Action type constants
export const READ_ORDER_REQUEST = "READ_ORDER_REQUEST";
export const READ_ORDER_SUCCESS = "READ_ORDER_SUCCESS";
export const READ_ORDER_ERROR = "READ_ORDER_ERROR";

// Action interface
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

// Action creator functions
export const readOrderRequest = (): ReadOrderRequestAction => ({
  type: READ_ORDER_REQUEST,
});

export const readOrderSuccess = (payload: Order): ReadOrderSuccessAction => ({
  type: READ_ORDER_SUCCESS,
  payload,
});

export const readOrderError = (payload: string): ReadOrderErrorAction => ({
  type: READ_ORDER_ERROR,
  payload,
});

// Async action creator function
export const readOrder = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(readOrderRequest());

      let response;

      if (authToken) {
        response = await axiosClient.get("/order", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }
      dispatch(readOrderSuccess(response!.data));
    } catch (error: any) {
      dispatch(readOrderError(error.message));
      console.error("Error fetching order:", error);
    }
  };
};

// CREATE
// Action type constants
export const CREATE_ORDER_ITEM_REQUEST = "CREATE_ORDER_ITEM_REQUEST";
export const CREATE_ORDER_ITEM_SUCCESS = "CREATE_ORDER_ITEM_SUCCESS";
export const CREATE_ORDER_ITEM_ERROR = "CREATE_ORDER_ITEM_ERROR";

// Action interface
interface CreateOrderItemRequestAction {
  type: typeof CREATE_ORDER_ITEM_REQUEST;
}

interface CreateOrderItemSuccessAction {
  type: typeof CREATE_ORDER_ITEM_SUCCESS;
  payload: Order;
}

interface CreateOrderItemErrorAction {
  type: typeof CREATE_ORDER_ITEM_ERROR;
  payload: string;
}

// Action creator functions
export const createOrderItemRequest = (): CreateOrderItemRequestAction => ({
  type: CREATE_ORDER_ITEM_REQUEST,
});

export const createOrderItemSuccess = (
  payload: Order
): CreateOrderItemSuccessAction => ({
  type: CREATE_ORDER_ITEM_SUCCESS,
  payload,
});

export const createOrderItemError = (
  payload: string
): CreateOrderItemErrorAction => ({
  type: CREATE_ORDER_ITEM_ERROR,
  payload,
});

// Async action creator function
export const createOrderItem = (
  cartId: number,
  deliveryItemId: number
): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(createOrderItemRequest());

      let response;

      if (authToken) {
        response = await axiosClient.post(
          "/order",
          {
            cartId,
            deliveryItemId,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      }

      dispatch(createOrderItemSuccess(response!.data));
      dispatch(readOrder());
    } catch (error: any) {
      dispatch(createOrderItemError(error.message));
      console.error("Error creating order item:", error);
    }
  };
};

export const READ_ALL_ORDER_ITEMS_REQUEST = "READ_ALL_ORDER_ITEMS_REQUEST";
export const READ_ALL_ORDER_ITEMS_SUCCESS = "READ_ALL_ORDER_ITEMS_SUCCESS";
export const READ_ALL_ORDER_ITEMS_ERROR = "READ_ALL_ORDER_ITEMS_ERROR";

// Action interface
interface ReadAllOrderItemsRequestAction {
  type: typeof READ_ALL_ORDER_ITEMS_REQUEST;
}

interface ReadAllOrderItemsSuccessAction {
  type: typeof READ_ALL_ORDER_ITEMS_SUCCESS;
  payload: OrderItem[]; // Assurez-vous d'avoir le type approprié ici
}

interface ReadAllOrderItemsErrorAction {
  type: typeof READ_ALL_ORDER_ITEMS_ERROR;
  payload: string;
}

// Action creator functions
export const readAllOrderItemsRequest = (): ReadAllOrderItemsRequestAction => ({
  type: READ_ALL_ORDER_ITEMS_REQUEST,
});

export const readAllOrderItemsSuccess = (
  payload: OrderItem[]
): ReadAllOrderItemsSuccessAction => ({
  type: READ_ALL_ORDER_ITEMS_SUCCESS,
  payload,
});

export const readAllOrderItemsError = (
  payload: string
): ReadAllOrderItemsErrorAction => ({
  type: READ_ALL_ORDER_ITEMS_ERROR,
  payload,
});

// Async action creator function
export const readAllOrderItems = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(readAllOrderItemsRequest());

      const response = await axiosClient.get("/order/allOrderItems");
      console.log(response);

      dispatch(readAllOrderItemsSuccess(response.data));
    } catch (error: any) {
      dispatch(readAllOrderItemsError(error.message));
      console.error("Error fetching all order items:", error);
    }
  };
};
