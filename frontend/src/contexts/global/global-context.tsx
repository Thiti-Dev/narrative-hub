import { ReactNode, createContext } from "react";
import { LoadingBarRef } from "react-top-loading-bar";

type IProps={
    loadingBarRef: React.RefObject<LoadingBarRef> | null
    children: ReactNode[]
}

export const GlobalContext = createContext<Omit<IProps,'children'>>({loadingBarRef:null})

export function GlobalProvider(props:IProps) {
    const { loadingBarRef, children } = props;
  
    return (
        <GlobalContext.Provider value={{loadingBarRef}}>
            {children}
        </GlobalContext.Provider>
    );
  }