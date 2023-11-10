import { combineReducers } from "redux";
import productsReducer from "./products.reducer";
import productReducer from "./product.reducer";
// Importez d'autres réducteurs si nécessaire

const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  // Autres réducteurs
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
