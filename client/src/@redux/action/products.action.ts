import { Dispatch } from "redux";
import axiosClient from "@/lib/axios-client";
import { Product } from "@/types/Product";

// Action type constant
export const READ_ALLPRODUCTS = "READ_ALLPRODUCTS";

// Action interface
interface ReadAllProductsAction {
  type: typeof READ_ALLPRODUCTS;
  payload: Product[];
}

// Action creator function
export const readAllProducts = () => {
  return async (dispatch: Dispatch<ReadAllProductsAction>) => {
    try {
      const response = await axiosClient.get<Product[]>(`/products`);
      dispatch({ type: READ_ALLPRODUCTS, payload: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};
