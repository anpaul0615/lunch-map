import React from 'react';

import { Provider } from 'react-redux';
import configureStore from './store';

import MapPanel from "./components/MapPanel";

import './App.css';

/* Page */
const App: React.FC = () => (
  <Provider store={configureStore()}>
    <MapPanel />
  </Provider>
);

export default App;
