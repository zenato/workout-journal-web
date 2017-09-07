import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import store from 'redux/store';
import App from 'shared/App';
import AuthProvider from 'shared/AuthProvider';

const accessToken = Cookies.get('accessToken');

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider accessToken={accessToken}>
        <App />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);

export default Root;
