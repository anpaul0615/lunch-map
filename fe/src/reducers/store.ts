import {createAction, createAsyncThunk, createReducer} from '@reduxjs/toolkit';

import type {StoreState} from '../types/store';
import type {RootState} from '../types';

/**
 * Namespace
 */
export const namespace = 'StoreState';

/**
 * Initial State
 */
const initialState: StoreState = {
  value: null,
  values: [],
};

/**
 * Actions
 */
export const asyncAction = createAsyncThunk<any, string, { state: RootState }>(
  `${namespace}/asyncAction`,
  async (arg, thunkAPI) => ({}),
);
export const normalAction = createAction<{ [key:string]:any; }>(
  `${namespace}/normalAction`,
);

/**
 * Reducers
 */
export default createReducer(initialState, {
  [normalAction.type]: (state, { payload }) => state,
  [asyncAction.pending.type]: (state, { payload }) => { /* todo */ },
  [asyncAction.fulfilled.type]: (state, { payload }) => state,
  [asyncAction.rejected.type]: (state, { payload }) => { /* todo */ },
});
