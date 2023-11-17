import axiosClient from "@/lib/axios-client";
import { authToken } from "@/lib/token";
import { OrderItem } from "@/types/Order";
import { Dispatch } from "redux";

export const READ_ALL_ORDER_ITEMS_REQUEST = "READ_ALL_ORDER_ITEMS_REQUEST";
export const READ_ALL_ORDER_ITEMS_SUCCESS = "READ_ALL_ORDER_ITEMS_SUCCESS";
export const READ_ALL_ORDER_ITEMS_ERROR = "READ_ALL_ORDER_ITEMS_ERROR";

interface ReadAllOrderItemsRequestAction {
  type: typeof READ_ALL_ORDER_ITEMS_REQUEST;
}

interface ReadAllOrderItemsSuccessAction {
  type: typeof READ_ALL_ORDER_ITEMS_SUCCESS;
  payload: OrderItem[];
}

interface ReadAllOrderItemsErrorAction {
  type: typeof READ_ALL_ORDER_ITEMS_ERROR;
  payload: string;
}

export type OrderItemAction =
  | ReadAllOrderItemsRequestAction
  | ReadAllOrderItemsSuccessAction
  | ReadAllOrderItemsErrorAction;

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

export const readAllOrderItems = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(readAllOrderItemsRequest());

      const response = await axiosClient.get("/order/allOrderItems");

      dispatch(readAllOrderItemsSuccess(response.data));
    } catch (error: any) {
      dispatch(readAllOrderItemsError(error.message));
      console.error("Error fetching all order items:", error);
    }
  };
};

//UPDATE
export const UPDATE_ORDER_ITEM_STATUS_REQUEST =
  "UPDATE_ORDER_ITEM_STATUS_REQUEST";
export const UPDATE_ORDER_ITEM_STATUS_SUCCESS =
  "UPDATE_ORDER_ITEM_STATUS_SUCCESS";
export const UPDATE_ORDER_ITEM_STATUS_ERROR = "UPDATE_ORDER_ITEM_STATUS_ERROR";

interface UpdateOrderItemStatusRequestAction {
  type: typeof UPDATE_ORDER_ITEM_STATUS_REQUEST;
}

interface UpdateOrderItemStatusSuccessAction {
  type: typeof UPDATE_ORDER_ITEM_STATUS_SUCCESS;
}

interface UpdateOrderItemStatusErrorAction {
  type: typeof UPDATE_ORDER_ITEM_STATUS_ERROR;
  payload: string;
}

export type UpdateOrderItemStatusAction =
  | UpdateOrderItemStatusRequestAction
  | UpdateOrderItemStatusSuccessAction
  | UpdateOrderItemStatusErrorAction;

export const updateOrderItemStatusRequest =
  (): UpdateOrderItemStatusRequestAction => ({
    type: UPDATE_ORDER_ITEM_STATUS_REQUEST,
  });

export const updateOrderItemStatusSuccess =
  (): UpdateOrderItemStatusSuccessAction => ({
    type: UPDATE_ORDER_ITEM_STATUS_SUCCESS,
  });

export const updateOrderItemStatusError = (
  payload: string
): UpdateOrderItemStatusErrorAction => ({
  type: UPDATE_ORDER_ITEM_STATUS_ERROR,
  payload,
});

export const updateOrderItemStatus = (
  orderId: number,
  newStatus: string
): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateOrderItemStatusRequest());

      await axiosClient.patch(
        `/order/update-status/${orderId}`,
        {
          newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      dispatch(updateOrderItemStatusSuccess());
      dispatch(readAllOrderItems());
    } catch (error: any) {
      dispatch(updateOrderItemStatusError(error.message));
      console.error("Error updating order item status:", error);
    }
  };
};
