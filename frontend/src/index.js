import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications'
// import { Snack } from './styles'
import GlobalStyle from './styles';
import configureStore from './store';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const queryClient = new QueryClient();
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastProvider 
          autoDismiss 
          autoDismissTimeout={3000}
          // components= {{ Toast: Snack }}
          placement="top-center"
        >
          <Pages />
        </ToastProvider>
      </Provider>
      <GlobalStyle />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);