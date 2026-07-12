import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { ToastStack } from './components/ToastStack';

function App() {
  return <BrowserRouter><AuthProvider><AppRoutes /><ToastStack /></AuthProvider></BrowserRouter>;
}

export default App;
