import { Dispatch } from "redux";
import axiosClient from "@/lib/axios-client";
import { Product } from "@/types/Product";

// Action type constants
export const READ_ALL_PRODUCTS_REQUEST = "READ_ALL_PRODUCTS_REQUEST";
export const READ_ALL_PRODUCTS_SUCCESS = "READ_ALL_PRODUCTS_SUCCESS";
export const READ_ALL_PRODUCTS_ERROR = "READ_ALL_PRODUCTS_ERROR";

// Action interface
interface ReadAllProductsRequestAction {
  type: typeof READ_ALL_PRODUCTS_REQUEST;
}

interface ReadAllProductsSuccessAction {
  type: typeof READ_ALL_PRODUCTS_SUCCESS;
  payload: Product[];
}

interface ReadAllProductsErrorAction {
  type: typeof READ_ALL_PRODUCTS_ERROR;
  error: string;
}

// Action creator functions
export const readAllProductsRequest = (): ReadAllProductsRequestAction => ({
  type: READ_ALL_PRODUCTS_REQUEST,
});

export const readAllProductsSuccess = (
  payload: Product[]
): ReadAllProductsSuccessAction => ({
  type: READ_ALL_PRODUCTS_SUCCESS,
  payload,
});

export const readAllProductsError = (
  error: string
): ReadAllProductsErrorAction => ({
  type: READ_ALL_PRODUCTS_ERROR,
  error,
});

// Async action creator function
export const readAllProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(readAllProductsRequest());

      const response = await axiosClient.get<Product[]>("/products");
      dispatch(readAllProductsSuccess(response.data));
    } catch (error: any) {
      dispatch(readAllProductsError(error.message));
      console.error("Error fetching products:", error);
    }
  };
};
