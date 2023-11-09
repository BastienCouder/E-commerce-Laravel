import { Product } from "@/types/Product";
import { READ_ALLPRODUCTS } from "../action/products.action";
import { AnyAction } from "redux";

// Type de l'état initial
interface ProductsState {
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
  payload: Product[];
}

export default function productsReducer(
  state: ProductsState = initialState,
  action: ProductsAction | AnyAction
) {
  switch (action.type) {
    case READ_ALLPRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
