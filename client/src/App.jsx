import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { AppRoutes } from './routes/AppRoutes';
import { ToastStack } from './components/ToastStack';
import { NotificationProvider } from './context/NotificationContext.jsx';

import { AppProvider } from './context/AppContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AppProvider>
            <AppRoutes />
            <ToastStack />
          </AppProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
