import { BrowserRouter } from 'react-router-dom';
import Routers from './router';
import { AuthProvider, RequireAuth } from './router/Auth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Routers />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
