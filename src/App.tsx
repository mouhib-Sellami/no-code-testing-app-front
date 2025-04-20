import './sass/app.scss';
import AppRoutes from './routes';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { TenantProvider } from './contexts/TenantContext.tsx';
import { SessionProvider } from './contexts/SessionContext.tsx';
import { AppConfigProvider } from './contexts/AppConfigContext.tsx';

const App: React.FC = () => {

  return (
    <Router>
      <TenantProvider>
        <SessionProvider>
          <AppConfigProvider>
            <AppRoutes />
          </AppConfigProvider>
        </SessionProvider>
      </TenantProvider>
    </Router >
  )
}

export default App;
