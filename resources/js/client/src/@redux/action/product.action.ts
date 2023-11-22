import { Dispatch } from "redux";
import axiosClient from "@/lib/axios-client";
import { Product } from "@/types/Product";
import { readAllProducts } from "./products.action";

// READ
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
  error: string;
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

export const readProductError = (error: string): ReadProductErrorAction => ({
  type: READ_PRODUCT_ERROR,
  error,
});

export const readProduct = (productId: number): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(readProductRequest());

      const response = await axiosClient.get<Product>(`/products/${productId}`);

      dispatch(readProductSuccess(response.data));
    } catch (error: any) {
      dispatch(readProductError(error.message));
      console.error("Error reading product:", error);
    }
  };
};

// CREATE
// Action type constants
export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_ERROR = "CREATE_PRODUCT_ERROR";

// Action interface
interface CreateProductRequestAction {
  type: typeof CREATE_PRODUCT_REQUEST;
}

interface CreateProductSuccessAction {
  type: typeof CREATE_PRODUCT_SUCCESS;
  payload: Product;
}

interface CreateProductErrorAction {
  type: typeof CREATE_PRODUCT_ERROR;
  error: string;
}

export type CreateProductAction =
  | CreateProductRequestAction
  | CreateProductSuccessAction
  | CreateProductErrorAction;

// Action creator functions
export const createProductRequest = (): CreateProductRequestAction => ({
  type: CREATE_PRODUCT_REQUEST,
});

export const createProductSuccess = (
  payload: Product
): CreateProductSuccessAction => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload,
});

export const createProductError = (
  error: string
): CreateProductErrorAction => ({
  type: CREATE_PRODUCT_ERROR,
  error,
});

//Async action creator functions
export const createProduct = (productData: any): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(createProductRequest());

      const response = await axiosClient.post<Product>(
        "/products",
        productData
      );

      dispatch(createProductSuccess(response.data));
      dispatch(readAllProducts());
    } catch (error: any) {
      dispatch(createProductError(error.message));
      console.error("Error creating product:", error);
    }
  };
};

//UPDATE
// Action type constants
export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_ERROR = "UPDATE_PRODUCT_ERROR";

// Action interface
interface UpdateProductRequestAction {
  type: typeof UPDATE_PRODUCT_REQUEST;
}

interface UpdateProductSuccessAction {
  type: typeof UPDATE_PRODUCT_SUCCESS;
  payload: Product;
}

interface UpdateProductErrorAction {
  type: typeof UPDATE_PRODUCT_ERROR;
  error: string;
}

// Action creator functions
export const updateProductRequest = (): UpdateProductRequestAction => ({
  type: UPDATE_PRODUCT_REQUEST,
});

export const updateProductSuccess = (
  payload: Product
): UpdateProductSuccessAction => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload,
});

export const updateProductError = (
  error: string
): UpdateProductErrorAction => ({
  type: UPDATE_PRODUCT_ERROR,
  error,
});

export const updateProduct = (productId: number, productData: any): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateProductRequest());

      const response = await axiosClient.put<Product>(
        `/products/${productId}`,
        productData
      );
      console.log(response);

      dispatch(updateProductSuccess(response.data));
      dispatch(readAllProducts());
    } catch (error: any) {
      dispatch(updateProductError(error.message));
      console.error("Error updating product:", error);
    }
  };
};

//DELETE
// Action type constants
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";

// Action interface
interface DeleteProductRequestAction {
  type: typeof DELETE_PRODUCT_REQUEST;
}

interface DeleteProductSuccessAction {
  type: typeof DELETE_PRODUCT_SUCCESS;
  productId: number;
}

interface DeleteProductErrorAction {
  type: typeof DELETE_PRODUCT_ERROR;
  error: string;
}

// Action creator functions
export const deleteProductRequest = (): DeleteProductRequestAction => ({
  type: DELETE_PRODUCT_REQUEST,
});

export const deleteProductSuccess = (
  productId: number
): DeleteProductSuccessAction => ({
  type: DELETE_PRODUCT_SUCCESS,
  productId,
});

export const deleteProductError = (
  error: string
): DeleteProductErrorAction => ({
  type: DELETE_PRODUCT_ERROR,
  error,
});

export const deleteProduct = (productId: number): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(deleteProductRequest());

      await axiosClient.delete(`/products/${productId}`);

      dispatch(deleteProductSuccess(productId));
      dispatch(readAllProducts());
    } catch (error: any) {
      dispatch(deleteProductError(error.message));
      console.error("Error deleting product:", error);
    }
  };
};

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
  payload: Product;
}

interface UpdateQuantityErrorAction {
  type: typeof UPDATE_QUANTITY_ERROR;
  error: string;
}

// Action creator functions
export const updateQuantityRequest = (): UpdateQuantityRequestAction => ({
  type: UPDATE_QUANTITY_REQUEST,
});

export const updateQuantitySuccess = (
  payload: Product
): UpdateQuantitySuccessAction => ({
  type: UPDATE_QUANTITY_SUCCESS,
  payload,
});

export const updateQuantityError = (
  error: string
): UpdateQuantityErrorAction => ({
  type: UPDATE_QUANTITY_ERROR,
  error,
});

export const updateQuantity = (productId: number, newQuantity: number): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateQuantityRequest());
      console.log("quantyty" + newQuantity);

      const response = await axiosClient.patch<Product>(
        `/products/update-quantity/${productId}`,
        { newQuantity: newQuantity }
      );
      console.log(response.data);

      dispatch(updateQuantitySuccess(response.data));
      dispatch(readAllProducts());
    } catch (error: any) {
      dispatch(updateQuantityError(error.message));
      console.error("Error updating quantity:", error);
    }
  };
};
