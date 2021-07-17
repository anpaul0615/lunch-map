import {combineReducers, configureStore} from '@reduxjs/toolkit';

import storeReducer, { namespace as storeNamespace } from './reducers/store';
import reviewReducer, { namespace as reviewNamespace } from './reducers/review';

const configure = () => configureStore({
  reducer: combineReducers({
    [storeNamespace]: storeReducer,
    [reviewNamespace]: reviewReducer,
  }),
  devTools: process.env.NODE_ENV === 'development',
});

export default configure;
