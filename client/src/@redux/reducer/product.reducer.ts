import { Product } from "@/types/Product";
import {
  READ_PRODUCT_REQUEST,
  READ_PRODUCT_SUCCESS,
  READ_PRODUCT_ERROR,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from "../action/product.action";

// Type de l'état initial
export interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

// Type d'action
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

interface CreateProductRequestAction {
  type: typeof CREATE_PRODUCT_REQUEST;
}

interface CreateProductSuccessAction {
  type: typeof CREATE_PRODUCT_SUCCESS;
  payload: Product;
}

interface CreateProductErrorAction {
  type: typeof CREATE_PRODUCT_ERROR;
  payload: string;
}

interface UpdateProductRequestAction {
  type: typeof UPDATE_PRODUCT_REQUEST;
}

interface UpdateProductSuccessAction {
  type: typeof UPDATE_PRODUCT_SUCCESS;
  payload: Product;
}

interface UpdateProductErrorAction {
  type: typeof UPDATE_PRODUCT_ERROR;
  payload: string;
}

interface DeleteProductRequestAction {
  type: typeof DELETE_PRODUCT_REQUEST;
}

interface DeleteProductSuccessAction {
  type: typeof DELETE_PRODUCT_SUCCESS;
}

interface DeleteProductErrorAction {
  type: typeof DELETE_PRODUCT_ERROR;
  payload: string;
}

export type ProductAction =
  | ReadProductRequestAction
  | ReadProductSuccessAction
  | ReadProductErrorAction
  | CreateProductRequestAction
  | CreateProductSuccessAction
  | CreateProductErrorAction
  | UpdateProductRequestAction
  | UpdateProductSuccessAction
  | UpdateProductErrorAction
  | DeleteProductRequestAction
  | DeleteProductSuccessAction
  | DeleteProductErrorAction;

// État initial
const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

export default function productReducer(
  state: ProductState = initialState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case READ_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case READ_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        error: null,
      };

    case READ_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        error: null,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: null,
        loading: false,
        error: null,
      };

    case CREATE_PRODUCT_ERROR:
    case UPDATE_PRODUCT_ERROR:
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
