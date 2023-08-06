import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/app/App';
import DarkModeProvider from 'context/dark-mode-context';
import { checkAuth } from 'store/user-slice/user-slice';
import { ToastContainer } from 'react-toastify';
import { StyledEngineProvider } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from 'components/scroll-to-top/scroll-to-top';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

store.dispatch(checkAuth());

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StyledEngineProvider injectFirst={true}>
          <DarkModeProvider>
            <HelmetProvider>
              {/* <ScrollToTop /> */}
              <ToastContainer
                limit={1}
                position="top-center"
                closeOnClick
                pauseOnHover
                theme="light"
              />
              <App />
            </HelmetProvider>
          </DarkModeProvider>
        </StyledEngineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
