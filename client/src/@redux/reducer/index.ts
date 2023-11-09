import { combineReducers } from "redux";
import productsReducer from "./products.reducer";
// Importez d'autres réducteurs si nécessaire

const rootReducer = combineReducers({
  products: productsReducer,
  // Autres réducteurs
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
