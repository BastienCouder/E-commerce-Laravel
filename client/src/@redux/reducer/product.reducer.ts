import { Product } from "@/types/Product";
import {
  READ_PRODUCT_REQUEST,
  READ_PRODUCT_SUCCESS,
  READ_PRODUCT_ERROR,
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

export type ProductAction =
  | ReadProductRequestAction
  | ReadProductSuccessAction
  | ReadProductErrorAction;

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

    default:
      return state;
  }
}
