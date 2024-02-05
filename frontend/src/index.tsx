import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.scss';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from './components/Loader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore;

root.render(

  <Provider store={store}>
    <Suspense fallback={<React.Fragment />}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>

);
