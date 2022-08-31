import { memo, createContext, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './router';
import { AuthProvider } from './router/Auth';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import Permission from './common/Permission';



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Permission>
            <Routers />
          </Permission>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
