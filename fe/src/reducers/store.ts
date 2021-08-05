import {createAction, createAsyncThunk, createReducer} from '@reduxjs/toolkit';

import type {EditableStoreProperties, Store, StoreState} from '../types/store';

/**
 * Namespace
 */
export const namespace = 'StoreState';

/**
 * Initial State
 */
const initialState: StoreState = {
  stores: [],
  registration: {
    isOpen: false,
    input: {
      name: '',
      description: '',
      locationWKT: '',
    }
  }
};

/**
 * Actions
 */
export const loadRegisteredStores = createAsyncThunk<{ stores: Array<Store>; }, void>(
  `${namespace}/loadRegisteredStores`,
  async () => {
    const stores = await Promise.resolve<Array<Store>>([]);
    return { stores };
  },
);
export const toggleStoreForm = createAction<{ isOpen?: boolean; }>(
  `${namespace}/toggleStoreForm`,
);
export const setStoreFormInput = createAction<{ input: Partial<EditableStoreProperties>; }>(
  `${namespace}/setStoreFormInput`,
);
export const appendNewStore = createAsyncThunk<{ store: Store; }, { input: EditableStoreProperties; }>(
  `${namespace}/appendNewStore`,
  async ({ input }) => {
    const store = await Promise.resolve<Store>({
      id: `${(new Date()).getTime()}`,
      ...input,
    });
    return { store };
  },
);

/**
 * Reducers
 */
export default createReducer(initialState, (builder) =>
  builder
    .addCase(loadRegisteredStores.fulfilled, (state, { payload }) => {
      const { stores } = payload;
      state.stores = stores;
      return state;
    })
    .addCase(toggleStoreForm, (state, { payload }) => {
      const { isOpen } = payload;
      state.registration.isOpen = isOpen === undefined
        ? state.registration.isOpen 
        : isOpen;
      return state;
    })
    .addCase(setStoreFormInput, (state, { payload }) => {
      const { input } = payload;
      
      console.log(JSON.stringify(state.registration.input), input);
      
      state.registration.input = {
        ...state.registration.input,
        ...input,
      };

      console.log(JSON.stringify(state.registration.input), input);

      return state;
    })
    .addCase(appendNewStore.fulfilled, (state, { payload }) => {
      const { store } = payload;
      state.stores.push(store);
      state.registration = initialState.registration;
      return state;
    })
);
