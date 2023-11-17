import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducer/auth.reducer";
import productsReducer from "./reducer/products.reducer";
import productReducer from "./reducer/product.reducer";
import cartReducer from "./reducer/cart.reducer";
import deliveryReducer from "./reducer/delivery.reducer";
import orderReducer from "./reducer/order.reducer";
import orderItemReducer from "./reducer/orderItem.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  delivery: deliveryReducer,
  order: orderReducer,
  products: productsReducer,
  product: productReducer,
  orderItem: orderItemReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
