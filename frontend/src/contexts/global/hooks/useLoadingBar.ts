import { useContext } from "react";
import { GlobalContext } from "../global-context";

export function useLoadingBar() {
    const { loadingBarRef } = useContext(GlobalContext);
  
    return loadingBarRef?.current;
  }