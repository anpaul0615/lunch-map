import type { StoreState } from './store';
import type { ReviewState } from './review';

export type RootState = {
  StoreState: StoreState;
  ReviewState: ReviewState;
};
