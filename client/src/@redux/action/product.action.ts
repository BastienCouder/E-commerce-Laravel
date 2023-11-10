import { Dispatch } from "redux";
import axiosClient from "@/lib/axios-client";
import { Product } from "@/types/Product";

// Action type constants
export const READ_PRODUCT_REQUEST = "READ_PRODUCT_REQUEST";
export const READ_PRODUCT_SUCCESS = "READ_PRODUCT_SUCCESS";
export const READ_PRODUCT_ERROR = "READ_PRODUCT_ERROR";

// Action interface
interface ReadProductRequestAction {
  type: typeof READ_PRODUCT_REQUEST;
}

interface ReadProductSuccessAction {
  type: typeof READ_PRODUCT_SUCCESS;
  payload: Product;
}

interface ReadProductErrorAction {
  type: typeof READ_PRODUCT_ERROR;
  payload: string;
}

// Action creator functions
export const readProductRequest = (): ReadProductRequestAction => ({
  type: READ_PRODUCT_REQUEST,
});

export const readProductSuccess = (
  payload: Product
): ReadProductSuccessAction => ({
  type: READ_PRODUCT_SUCCESS,
  payload,
});

export const readProductError = (payload: string): ReadProductErrorAction => ({
  type: READ_PRODUCT_ERROR,
  payload,
});

// Async action creator function
export const readProduct = (productId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(readProductRequest());

      const response = await axiosClient.get<Product>(`/products/${productId}`);
      dispatch(readProductSuccess(response.data));
    } catch (error: any) {
      dispatch(readProductError(error.message));
      console.error("Error fetching products:", error);
    }
  };
};
