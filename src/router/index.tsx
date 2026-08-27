import { MainLayout } from '@layouts';
import { HomePage, NotFoundPage } from '@pages';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Layout chung
    errorElement: <NotFoundPage />, // Trang lỗi chung cho các route con
    children: [
      {
        index: true, // Route mặc định của cha ('/')
        element: <HomePage />
      }
    ]
  }
]);

const AppRoute: React.FC = () => {
  return React.createElement(RouterProvider, { router: routes });
};

export default AppRoute;
