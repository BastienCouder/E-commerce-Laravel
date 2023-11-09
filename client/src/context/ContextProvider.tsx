import { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    token: string | null;
    setToken: (token: string | null) => void;
    notification: string;
    setNotification: (message: string) => void;
}

const StateContext = createContext<ContextProps>({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {},
    notification: "",
    setNotification: () => {},
});

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<any>({});
    const [token, _setToken] = useState<string | null>(
        localStorage.getItem("ACCESS_TOKEN")
    );
    const [notification, _setNotification] = useState<string>("");

    const setToken = (newToken: string | null) => {
        _setToken(newToken);
        if (newToken) {
            localStorage.setItem("ACCESS_TOKEN", newToken);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setNotification = (message: string) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = (): ContextProps => useContext(StateContext);
