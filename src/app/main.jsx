import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import useLenis from '../shared/hooks/useLenis';
import './index.css';

function LenisProvider({ children }) {
  useLenis();
  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LenisProvider>
          <App />
        </LenisProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);