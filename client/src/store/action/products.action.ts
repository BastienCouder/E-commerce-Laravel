import { Product } from "@/types/Product";
import { env } from "@/lib/env";
import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";

export const READ_ALLPRODUCTS = "READ_ALLPRODUCTS";

interface ProductAction {
    type: typeof READ_ALLPRODUCTS;
    payload: Product[];
}

export const getProducts = () => {
    return (dispatch: Dispatch<ProductAction>) => {
        return axios
            .get(`${env.API_URL}/products`)
            .then((res: AxiosResponse) => {
                dispatch({ type: READ_ALLPRODUCTS, payload: res.data });
            })
            .catch((error) => console.log(error));
    };
};
