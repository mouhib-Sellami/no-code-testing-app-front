import './sass/app.scss';
import AppRoutes from './routes';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { TenantProvider } from './contexts/TenantContext.tsx';

const App: React.FC = () => {

  return (
    <Router>
      <TenantProvider>
        <AppRoutes />
      </TenantProvider>
    </Router >
  )
}

export default App;
