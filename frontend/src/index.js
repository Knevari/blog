import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from 'react-redux';
import GlobalStyle from './styles';
import configureStore from './store';

const queryClient = new QueryClient();
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Pages />
      </Provider>
      <GlobalStyle />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);