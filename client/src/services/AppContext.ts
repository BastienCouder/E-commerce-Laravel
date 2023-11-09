import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface UidContextType {
  uid: string | null;
  setUid: Dispatch<SetStateAction<string | null>>;
}

const UidContext = createContext<UidContextType | undefined>(undefined);

export const useUid = () => {
  const context = useContext(UidContext);
  if (!context) {
    throw new Error("useUid must be used within a UidProvider");
  }
  return context;
};

export default UidContext;
