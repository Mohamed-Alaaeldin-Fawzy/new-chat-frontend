'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface isSidebarOpenContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const IsSidebarOpenContext = createContext<isSidebarOpenContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export function IsSidebarOpenProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IsSidebarOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </IsSidebarOpenContext.Provider>
  );
}

export const useIsSidebarOpen = () => useContext(IsSidebarOpenContext);
