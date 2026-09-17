import { MainLayout } from '@layouts';
import { HomePage, NotFoundPage, WebGPU } from '@pages';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTE } from '@/constants/router';

const routes = createBrowserRouter([
  {
    path: ROUTE.HOME,
    element: <MainLayout />, // Layout chung
    errorElement: <NotFoundPage />, // Trang lỗi chung cho các route con
    children: [
      {
        index: true, // Route mặc định của cha ('/')
        element: <HomePage />
      },
      {
        path: ROUTE.WEB_GPU, // Route mặc định của cha ('/')
        element: <WebGPU />
      }
    ]
  }
]);

const AppRoute: React.FC = () => {
  return React.createElement(RouterProvider, { router: routes });
};

export default AppRoute;
