import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { ToastStack } from './components/ToastStack';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
          <ToastStack />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
