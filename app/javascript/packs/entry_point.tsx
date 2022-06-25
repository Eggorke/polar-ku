import * as React from 'react'
import { createRoot } from 'react-dom/client';
import App from './src/App';
import { BrowserRouter } from 'react-router-dom'
import './src/assets/scss/fonts.scss'
import createStore from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

export const store = createStore().store;
const persistor = createStore().persistor;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('application');
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
})

