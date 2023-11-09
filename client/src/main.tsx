import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "@/store/reducer";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./context/ContextProvider.tsx";

// DevTools
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App.tsx";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <ContextProvider>
                    <RouterProvider router={router} />
                    <App />
                </ContextProvider>
            </Provider>
        </React.StrictMode>
    );
} else {
    console.error("L'élément 'root' n'a pas été trouvé dans le DOM.");
}
