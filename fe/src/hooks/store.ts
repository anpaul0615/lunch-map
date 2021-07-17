import { useSelector } from "react-redux";

import type {RootState} from "../types";

export function useStore() {
  const storeState = useSelector((s:RootState) => s.StoreState);

  return {storeState};
}
