import { Dispatch } from "redux";
import axiosClient from "@/lib/axios-client";
import { Delivery } from "@/types/Delivery";
import { authToken } from "@/lib/token";

// READ
// Action type constants
export const READ_DELIVERY_REQUEST = "READ_DELIVERY_REQUEST";
export const READ_DELIVERY_SUCCESS = "READ_DELIVERY_SUCCESS";
export const READ_DELIVERY_ERROR = "READ_DELIVERY_ERROR";

// Action interfaces
interface ReadDeliveryRequestAction {
  type: typeof READ_DELIVERY_REQUEST;
}

interface ReadDeliverySuccessAction {
  type: typeof READ_DELIVERY_SUCCESS;
  payload: Delivery;
}

interface ReadDeliveryErrorAction {
  type: typeof READ_DELIVERY_ERROR;
  payload: string;
}

// Action creator functions
export const readDeliveryRequest = (): ReadDeliveryRequestAction => ({
  type: READ_DELIVERY_REQUEST,
});

export const readDeliverySuccess = (
  payload: Delivery
): ReadDeliverySuccessAction => ({
  type: READ_DELIVERY_SUCCESS,
  payload,
});

export const readDeliveryError = (
  payload: string
): ReadDeliveryErrorAction => ({
  type: READ_DELIVERY_ERROR,
  payload,
});

export type DeliveryAction =
  | ReadDeliveryRequestAction
  | ReadDeliverySuccessAction
  | ReadDeliveryErrorAction;

// Async action creator function
export const readDelivery = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(readDeliveryRequest());

      const response = await axiosClient.get<Delivery>("/delivery", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      dispatch(readDeliverySuccess(response.data));
    } catch (error: any) {
      dispatch(readDeliveryError(error.message));
      console.error("Error fetching delivery:", error);
    }
  };
};

// CREATE
// Action type constants
export const CREATE_DELIVERY_ITEM_REQUEST = "CREATE_DELIVERY_ITEM_REQUEST";
export const CREATE_DELIVERY_ITEM_SUCCESS = "CREATE_DELIVERY_ITEM_SUCCESS";
export const CREATE_DELIVERY_ITEM_ERROR = "CREATE_DELIVERY_ITEM_ERROR";

// Action interfaces
interface CreateDeliveryItemRequestAction {
  type: typeof CREATE_DELIVERY_ITEM_REQUEST;
}

interface CreateDeliveryItemSuccessAction {
  type: typeof CREATE_DELIVERY_ITEM_SUCCESS;
  payload: Delivery; // Assurez-vous que le type Delivery est correct
}

interface CreateDeliveryItemErrorAction {
  type: typeof CREATE_DELIVERY_ITEM_ERROR;
  payload: string;
}

export type CreateDeliveryItemAction =
  | CreateDeliveryItemRequestAction
  | CreateDeliveryItemSuccessAction
  | CreateDeliveryItemErrorAction;

// Action creator functions
export const createDeliveryItemRequest =
  (): CreateDeliveryItemRequestAction => ({
    type: CREATE_DELIVERY_ITEM_REQUEST,
  });

export const createDeliveryItemSuccess = (
  payload: Delivery
): CreateDeliveryItemSuccessAction => ({
  type: CREATE_DELIVERY_ITEM_SUCCESS,
  payload,
});

export const createDeliveryItemError = (
  payload: string
): CreateDeliveryItemErrorAction => ({
  type: CREATE_DELIVERY_ITEM_ERROR,
  payload,
});

// Async action creator function
export const createDeliveryItem = (deliveryData: any): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(createDeliveryItemRequest());

      const response = await axiosClient.post("/delivery", deliveryData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      dispatch(createDeliveryItemSuccess(response.data));
      dispatch(readDelivery());
    } catch (error: any) {
      dispatch(createDeliveryItemError(error.message));
      console.error("Erreur lors de la création de la livraison :", error);
    }
  };
};

// DELETE
// Action type constants
export const DELETE_DELIVERY_ITEM_REQUEST = "DELETE_DELIVERY_ITEM_REQUEST";
export const DELETE_DELIVERY_ITEM_SUCCESS = "DELETE_DELIVERY_ITEM_SUCCESS";
export const DELETE_DELIVERY_ITEM_ERROR = "DELETE_DELIVERY_ITEM_ERROR";

// Action interface
interface DeleteDeliveryItemRequestAction {
  type: typeof DELETE_DELIVERY_ITEM_REQUEST;
}

interface DeleteDeliveryItemSuccessAction {
  type: typeof DELETE_DELIVERY_ITEM_SUCCESS;
  payload: Delivery;
}

interface DeleteDeliveryItemErrorAction {
  type: typeof DELETE_DELIVERY_ITEM_ERROR;
  payload: string;
}

// Action creator functions
export const deleteDeliveryItemRequest =
  (): DeleteDeliveryItemRequestAction => ({
    type: DELETE_DELIVERY_ITEM_REQUEST,
  });

export const deleteDeliveryItemSuccess = (
  payload: Delivery
): DeleteDeliveryItemSuccessAction => ({
  type: DELETE_DELIVERY_ITEM_SUCCESS,
  payload,
});

export const deleteDeliveryItemError = (
  payload: string
): DeleteDeliveryItemErrorAction => ({
  type: DELETE_DELIVERY_ITEM_ERROR,
  payload,
});

export type DeleteDeliveryItemAction =
  | DeleteDeliveryItemRequestAction
  | DeleteDeliveryItemSuccessAction
  | DeleteDeliveryItemErrorAction;

// Async action creator function
export const deleteDeliveryItem = (deliveryItemId: number): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(deleteDeliveryItemRequest());

      // Utilisation d'authToken pour les requêtes
      const response = await axiosClient.delete(`/delivery/${deliveryItemId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      dispatch(deleteDeliveryItemSuccess(response.data));
      // Dispatch de la lecture de la livraison après la suppression d'un article
      dispatch(readDelivery());
    } catch (error: any) {
      dispatch(deleteDeliveryItemError(error.message));
      console.error(
        "Erreur lors de la suppression d'un article de la livraison :",
        error
      );
    }
  };
};

// UPDATE DEFAULT DELIVERY ITEM
// Action type constants
export const UPDATE_DEFAULT_DELIVERY_ITEM_REQUEST =
  "UPDATE_DEFAULT_DELIVERY_ITEM_REQUEST";
export const UPDATE_DEFAULT_DELIVERY_ITEM_SUCCESS =
  "UPDATE_DEFAULT_DELIVERY_ITEM_SUCCESS";
export const UPDATE_DEFAULT_DELIVERY_ITEM_ERROR =
  "UPDATE_DEFAULT_DELIVERY_ITEM_ERROR";

// Action interface
interface UpdateDefaultDeliveryItemRequestAction {
  type: typeof UPDATE_DEFAULT_DELIVERY_ITEM_REQUEST;
}

interface UpdateDefaultDeliveryItemSuccessAction {
  type: typeof UPDATE_DEFAULT_DELIVERY_ITEM_SUCCESS;
  payload: Delivery;
}

interface UpdateDefaultDeliveryItemErrorAction {
  type: typeof UPDATE_DEFAULT_DELIVERY_ITEM_ERROR;
  payload: string;
}

// Action creator functions
export const updateDefaultDeliveryItemRequest =
  (): UpdateDefaultDeliveryItemRequestAction => ({
    type: UPDATE_DEFAULT_DELIVERY_ITEM_REQUEST,
  });

export const updateDefaultDeliveryItemSuccess = (
  payload: Delivery
): UpdateDefaultDeliveryItemSuccessAction => ({
  type: UPDATE_DEFAULT_DELIVERY_ITEM_SUCCESS,
  payload,
});

export const updateDefaultDeliveryItemError = (
  payload: string
): UpdateDefaultDeliveryItemErrorAction => ({
  type: UPDATE_DEFAULT_DELIVERY_ITEM_ERROR,
  payload,
});

export type updateDefaultDeliveryItemAction =
  | UpdateDefaultDeliveryItemRequestAction
  | UpdateDefaultDeliveryItemSuccessAction
  | UpdateDefaultDeliveryItemErrorAction;

// Async action creator function
export const updateDefaultDeliveryItem = (deliveryItemId: number): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateDefaultDeliveryItemRequest());

      // Utilisation d'authToken pour les requêtes
      const response = await axiosClient.patch(
        `/update-deliveryDefault/${deliveryItemId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      dispatch(updateDefaultDeliveryItemSuccess(response.data));
      dispatch(readDelivery());
    } catch (error: any) {
      dispatch(updateDefaultDeliveryItemError(error.message));
      console.error(
        "Erreur lors de la mise à jour de l'article par défaut de la livraison :",
        error
      );
    }
  };
};
