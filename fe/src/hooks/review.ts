import { useSelector } from "react-redux";

import type { RootState } from "../types";

export function useReview() {
  const reviewState = useSelector((s: RootState) => s.ReviewState);

  return {reviewState};
}
