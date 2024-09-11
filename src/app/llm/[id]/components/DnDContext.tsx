import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";

interface DndContextProps {
  type: string | null;
  setType: (type: string) => void;
}

interface DnDProviderProps {
  children: ReactElement;
}

const initContextValue = {
  type: null,
  setType: () => {},
};

export const DnDContext = createContext<DndContextProps>(initContextValue);

export const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={{ type, setType }}>
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = () => {
  return useContext(DnDContext);
};
