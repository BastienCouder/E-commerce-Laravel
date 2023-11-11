import { combineReducers } from "redux";
import productsReducer from "./products.reducer";
import productReducer from "./product.reducer";
import authReducer from "./auth.reducer";
// Importez d'autres réducteurs si nécessaire

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  product: productReducer,
  // Autres réducteurs
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
