import { Dispatch } from "redux";
import axiosClient from "@/lib/axios-client";
import { Cart } from "@/types/Cart";
import { authToken } from "@/lib/token";
import Cookies from "js-cookie";

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
export const readCart = (state: any): any => {
  return async (dispatch: Dispatch) => {
    try {
      const cartId = Cookies.get("cart_id");
      dispatch(readCartRequest());

      let response;

      if (state) {
        response = await axiosClient.get<Cart>("/cart", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } else {
        response = await axiosClient.get<Cart>("/cart/public", {
          params: { cartId },
        });
      }

      dispatch(readCartSuccess(response.data));
    } catch (error: any) {
      dispatch(readCartError(error.message));
      console.error("Error fetching cart:", error);
    }
  };
};

// CREATE
// Action type constants
export const CREATE_CART_ITEM_REQUEST = "CREATE_CART_ITEM_REQUEST";
export const CREATE_CART_ITEM_SUCCESS = "CREATE_CART_ITEM_SUCCESS";
export const CREATE_CART_ITEM_ERROR = "CREATE_CART_ITEM_ERROR";

// Action interface
interface CreateCartItemRequestAction {
  type: typeof CREATE_CART_ITEM_REQUEST;
}

interface CreateCartItemSuccessAction {
  type: typeof CREATE_CART_ITEM_SUCCESS;
  payload: Cart; // Assurez-vous que le type Cart est correct
}

interface CreateCartItemErrorAction {
  type: typeof CREATE_CART_ITEM_ERROR;
  payload: string;
}

export type CreateCartItemAction =
  | CreateCartItemRequestAction
  | CreateCartItemSuccessAction
  | CreateCartItemErrorAction;

// Action creator functions
export const createCartItemRequest = (): CreateCartItemRequestAction => ({
  type: CREATE_CART_ITEM_REQUEST,
});

export const createCartItemSuccess = (
  payload: Cart
): CreateCartItemSuccessAction => ({
  type: CREATE_CART_ITEM_SUCCESS,
  payload,
});

export const createCartItemError = (
  payload: string
): CreateCartItemErrorAction => ({
  type: CREATE_CART_ITEM_ERROR,
  payload,
});

// Async action creator function
export const createCartItem = (productId: string, state: any): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(createCartItemRequest());
      const cartId = Cookies.get("cart_id");
      let response;

      if (state) {
        response = await axiosClient.post(
          "/cart",
          {
            productId,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      } else {
        response = await axiosClient.post("/cart/public", {
          productId,
          cartId,
        });
        if (!cartId) {
          const newCartId = response.data.cart?.id;
          Cookies.set("cart_id", newCartId, { expires: 30 });
        }
      }

      dispatch(createCartItemSuccess(response.data));
      dispatch(readCart(state));
    } catch (error: any) {
      dispatch(createCartItemError(error.message));
      console.error("Erreur lors de la création du CartItem :", error);
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
  newQuantity: number,
  state: any
): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateQuantityRequest());
      const cartId = Cookies.get("cart_id");

      let response;

      if (state) {
        response = await axiosClient.put(
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
      } else {
        response = await axiosClient.put(
          `/cart/public/update-quantity/${cartItemId}`,
          {
            cartId,
            quantity: newQuantity,
          }
        );
      }

      dispatch(updateQuantitySuccess(response.data));
      dispatch(readCart(state));
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
export const deleteCartItem = (cartItemId: number, state: any): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(deleteCartItemRequest());

      const cartId = Cookies.get("cart_id");

      let response;

      if (state) {
        response = await axiosClient.delete(`/cart/${cartItemId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } else {
        response = await axiosClient.delete(`/cart/public/${cartItemId}`, {
          params: { cartId },
        });
      }

      dispatch(deleteCartItemSuccess(response.data));
      dispatch(readCart(state));
    } catch (error: any) {
      dispatch(deleteCartItemError(error.message));
      console.error(
        "Erreur lors de la suppression d'un article du panier :",
        error
      );
    }
  };
};

//MERGE
// Action type constants
export const MERGE_CART_REQUEST = "MERGE_CART_REQUEST";
export const MERGE_CART_SUCCESS = "MERGE_CART_SUCCESS";
export const MERGE_CART_ERROR = "MERGE_CART_ERROR";

// Action interface
interface MergeCartRequestAction {
  type: typeof MERGE_CART_REQUEST;
}

interface MergeCartSuccessAction {
  type: typeof MERGE_CART_SUCCESS;
}

interface MergeCartErrorAction {
  type: typeof MERGE_CART_ERROR;
  payload: string;
}

// Action creator functions
export const mergeCartRequest = (): MergeCartRequestAction => ({
  type: MERGE_CART_REQUEST,
});

export const mergeCartSuccess = (): MergeCartSuccessAction => ({
  type: MERGE_CART_SUCCESS,
});

export const mergeCartError = (payload: string): MergeCartErrorAction => ({
  type: MERGE_CART_ERROR,
  payload,
});

export const mergeCart = (cartId: string, authToken: string): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(mergeCartRequest());

      const response = await axiosClient.post(
        "cart/merge-cart",
        { cartId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response.data.message);

      dispatch(mergeCartSuccess());
    } catch (error: any) {
      console.error("Error merging carts:", error);
      dispatch(mergeCartError(error.message));
    }
  };
};
