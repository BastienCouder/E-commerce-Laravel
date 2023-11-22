import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";

// DevTools
import { store } from "./@redux/store.ts";
import { AuthProvider } from "./context/authContext.tsx";
import { SearchProvider } from "./context/searchContext.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <SearchProvider>
            <RouterProvider router={router} />
          </SearchProvider>
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("L'élément 'root' n'a pas été trouvé dans le DOM.");
}
