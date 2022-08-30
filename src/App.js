import { BrowserRouter } from 'react-router-dom';
import Routers from './router';
import { AuthProvider } from './router/Auth';
import { Provider, useDispatch } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routers />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
