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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

store.dispatch(checkAuth());

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StyledEngineProvider injectFirst={true}>
          <DarkModeProvider>
            <ToastContainer
              limit={1}
              position="top-center"
              closeOnClick
              pauseOnHover
              theme="light"
            />
            <App />
          </DarkModeProvider>
        </StyledEngineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
