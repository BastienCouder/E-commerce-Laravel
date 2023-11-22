import { Delivery } from "@/types/Delivery";
import {
  CREATE_DELIVERY_ITEM_ERROR,
  CREATE_DELIVERY_ITEM_REQUEST,
  CREATE_DELIVERY_ITEM_SUCCESS,
  DELETE_DELIVERY_ITEM_ERROR,
  DELETE_DELIVERY_ITEM_REQUEST,
  DELETE_DELIVERY_ITEM_SUCCESS,
  READ_DELIVERY_ERROR,
  READ_DELIVERY_REQUEST,
  READ_DELIVERY_SUCCESS,
  UPDATE_DEFAULT_DELIVERY_ITEM_ERROR,
  UPDATE_DEFAULT_DELIVERY_ITEM_REQUEST,
  UPDATE_DEFAULT_DELIVERY_ITEM_SUCCESS,
} from "../action/delivery.action";

// Type de l'état initial
export interface deliveryState {
  delivery: Delivery | null;
  loading: boolean;
  error: string | null;
}

// Type d'action
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

interface CreateDeliveryItemRequestAction {
  type: typeof CREATE_DELIVERY_ITEM_REQUEST;
}

interface CreateDeliveryItemSuccessAction {
  type: typeof CREATE_DELIVERY_ITEM_SUCCESS;
  payload: Delivery;
}

interface CreateDeliveryItemErrorAction {
  type: typeof CREATE_DELIVERY_ITEM_ERROR;
  payload: string;
}

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

export type DeliveryAction =
  | ReadDeliveryRequestAction
  | ReadDeliverySuccessAction
  | ReadDeliveryErrorAction
  | CreateDeliveryItemRequestAction
  | CreateDeliveryItemSuccessAction
  | CreateDeliveryItemErrorAction
  | DeleteDeliveryItemRequestAction
  | DeleteDeliveryItemSuccessAction
  | DeleteDeliveryItemErrorAction
  | UpdateDefaultDeliveryItemRequestAction
  | UpdateDefaultDeliveryItemSuccessAction
  | UpdateDefaultDeliveryItemErrorAction;

// État initial
const initialState: deliveryState = {
  delivery: null,
  loading: false,
  error: null,
};

export default function deliveryReducer(
  state: deliveryState = initialState,
  action: DeliveryAction
): deliveryState {
  switch (action.type) {
    case READ_DELIVERY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case READ_DELIVERY_SUCCESS:
      return {
        ...state,
        delivery: action.payload,
        loading: false,
        error: null,
      };

    case READ_DELIVERY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_DELIVERY_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_DELIVERY_ITEM_SUCCESS:
      return {
        ...state,
        delivery: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_DELIVERY_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DELIVERY_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_DELIVERY_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_DELIVERY_ITEM_SUCCESS:
      return {
        ...state,
        delivery: action.payload,
        loading: false,
        error: null,
      };

    case UPDATE_DEFAULT_DELIVERY_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_DEFAULT_DELIVERY_ITEM_SUCCESS:
      return {
        ...state,
        delivery: action.payload,
        loading: false,
        error: null,
      };

    case UPDATE_DEFAULT_DELIVERY_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
