import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import App from './App';
import './index.css';

// create Redux store
const store = configureStore({
  reducer: rootReducer,
})

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RouterProvider>
  </Provider>
)
