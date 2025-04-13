import './sass/app.scss';
import AppRoutes from './routes';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { TenantProvider } from './contexts/TenantContext.tsx';

const App: React.FC = () => {
  console.log(window.location.hostname);
  
  return (
    <Router>
      <TenantProvider>
        <AppRoutes />
      </TenantProvider>
    </Router >
  )
}

export default App;
