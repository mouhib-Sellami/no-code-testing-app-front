import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from "@redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { AppConfigProvider } from './contexts/AppConfigContext.tsx';
import { SessionProvider } from './contexts/SessionContext.tsx';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';
import { ModalsProvider } from "@mantine/modals";
import theme from './constants/AppTheme.ts';

createRoot(document.getElementById('root')!).render(
  <MantineProvider stylesTransform={emotionTransform} theme={theme} defaultColorScheme='dark'>
    <MantineEmotionProvider>
      <Notifications />
      <ModalsProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider>
              <AppConfigProvider>
                <App />
              </AppConfigProvider>
            </SessionProvider>
          </PersistGate>
        </ReduxProvider>
      </ModalsProvider>
    </MantineEmotionProvider>
  </MantineProvider >
)
