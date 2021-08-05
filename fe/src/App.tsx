import React from 'react';

import { Provider } from 'react-redux';
import configureStore from './store';

import AppTemplate from './AppTemplate';

import MapPanel from "./components/MapPanel";
import CalendarPanel from "./components/CalendarPanel";
import RankingPanel from "./components/RankingPanel";

import './App.css';

/* App */
function App() {
  return (
    <Provider store={configureStore()}>
      <AppTemplate
        mapPanel={<MapPanel />}
        calendarPanel={<CalendarPanel />}
        rankingPanel={<RankingPanel />}
      />
    </Provider>
  );
}

export default App;
