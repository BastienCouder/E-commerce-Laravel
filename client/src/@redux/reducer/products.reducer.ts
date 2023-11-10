import { Product } from "@/types/Product";
import {
  READ_ALL_PRODUCTS_REQUEST,
  READ_ALL_PRODUCTS_SUCCESS,
  READ_ALL_PRODUCTS_ERROR,
} from "../action/products.action";
import { AnyAction } from "redux";

// Type de l'état initial
export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// État initial
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Type d'action
interface ProductsAction {
  type: string;
  payload?: Product[];
}

export default function productsReducer(
  state: ProductsState = initialState,
  action: ProductsAction | AnyAction
): ProductsState {
  switch (action.type) {
    case READ_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case READ_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    case READ_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
