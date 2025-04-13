import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from "@redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { AppConfigProvider } from './contexts/AppConfigContext.tsx';
import SessionProvider from './contexts/SessionContext.tsx';

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SessionProvider>
        {/* <AppConfigProvider> */}
          <App />
        {/* </AppConfigProvider> */}
      </SessionProvider>
    </PersistGate>
  </ReduxProvider>
)
