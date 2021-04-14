import React from 'react';
import { AppContextProvider } from '../context/AppContext';
import { Main } from './Main';

export const App = () => {
  return (
    <AppContextProvider>
      <div className="App">
        <Main />
      </div>
    </AppContextProvider>
  );
};
