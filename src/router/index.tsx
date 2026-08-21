import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@layouts';
import { HomePage, NotFoundPage } from '@pages';

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
      // Thêm các route khác ở đây
    ]
  }
]);

const AppRoute: React.FC = () => {
  return React.createElement(RouterProvider, { router: routes });
};

export default AppRoute;
