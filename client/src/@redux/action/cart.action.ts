import { Dispatch } from "redux";
import axiosClient from "@/lib/axios-client";
import { Cart } from "@/types/Cart";
import { authToken } from "@/lib/token";

//READ
// Action type constants
export const READ_CART_REQUEST = "READ_CART_REQUEST";
export const READ_CART_SUCCESS = "READ_CART_SUCCESS";
export const READ_CART_ERROR = "READ_CART_ERROR";

// Action interface
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

// Action creator functions
export const readCartRequest = (): ReadCartRequestAction => ({
  type: READ_CART_REQUEST,
});

export const readCartSuccess = (payload: Cart): ReadCartSuccessAction => ({
  type: READ_CART_SUCCESS,
  payload,
});

export const readCartError = (payload: string): ReadCartErrorAction => ({
  type: READ_CART_ERROR,
  payload,
});

export type CartAction =
  | ReadCartRequestAction
  | ReadCartSuccessAction
  | ReadCartErrorAction;

// Async action creator function
export const readCart = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(readCartRequest());

      const response = await axiosClient.get<Cart>(`/cart`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      dispatch(readCartSuccess(response.data));
    } catch (error: any) {
      dispatch(readCartError(error.message));
      console.error("Error fetching products:", error);
    }
  };
};

//UPDATE
// Action type constants
export const UPDATE_QUANTITY_REQUEST = "UPDATE_QUANTITY_REQUEST";
export const UPDATE_QUANTITY_SUCCESS = "UPDATE_QUANTITY_SUCCESS";
export const UPDATE_QUANTITY_ERROR = "UPDATE_QUANTITY_ERROR";

// Action interface
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

// Action creator functions
export const updateQuantityRequest = (): UpdateQuantityRequestAction => ({
  type: UPDATE_QUANTITY_REQUEST,
});

export const updateQuantitySuccess = (
  payload: Cart
): UpdateQuantitySuccessAction => ({
  type: UPDATE_QUANTITY_SUCCESS,
  payload,
});

export const updateQuantityError = (
  payload: string
): UpdateQuantityErrorAction => ({
  type: UPDATE_QUANTITY_ERROR,
  payload,
});

export type UpdateQuantityAction =
  | UpdateQuantityRequestAction
  | UpdateQuantitySuccessAction
  | UpdateQuantityErrorAction;

// Async action creator function
export const updateQuantity = (
  cartItemId: number,
  newQuantity: number
): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateQuantityRequest());

      const response = await axiosClient.put<Cart>(
        `/cart/update-quantity/${cartItemId}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      dispatch(updateQuantitySuccess(response.data));
      dispatch(readCart());
    } catch (error: any) {
      dispatch(updateQuantityError(error.message));
      console.error("Erreur lors de la mise à jour de la quantité :", error);
    }
  };
};

// DELETE
// Action type constants
export const DELETE_CART_ITEM_REQUEST = "DELETE_CART_ITEM_REQUEST";
export const DELETE_CART_ITEM_SUCCESS = "DELETE_CART_ITEM_SUCCESS";
export const DELETE_CART_ITEM_ERROR = "DELETE_CART_ITEM_ERROR";

// Action interface
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

// Action creator functions
export const deleteCartItemRequest = (): DeleteCartItemRequestAction => ({
  type: DELETE_CART_ITEM_REQUEST,
});

export const deleteCartItemSuccess = (
  payload: Cart
): DeleteCartItemSuccessAction => ({
  type: DELETE_CART_ITEM_SUCCESS,
  payload,
});

export const deleteCartItemError = (
  payload: string
): DeleteCartItemErrorAction => ({
  type: DELETE_CART_ITEM_ERROR,
  payload,
});

export type DeleteCartItemAction =
  | DeleteCartItemRequestAction
  | DeleteCartItemSuccessAction
  | DeleteCartItemErrorAction;

// Async action creator function
export const deleteCartItem = (cartItemId: number): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(deleteCartItemRequest());

      const response = await axiosClient.delete<Cart>(`/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      dispatch(deleteCartItemSuccess(response.data));
      dispatch(readCart());
    } catch (error: any) {
      dispatch(deleteCartItemError(error.message));
      console.error(
        "Erreur lors de la suppression d'un article du panier :",
        error
      );
    }
  };
};
