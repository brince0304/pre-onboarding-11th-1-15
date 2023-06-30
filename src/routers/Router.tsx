import React from 'react';
import { ReactElement } from 'react';
import { IndexRouteObject, NonIndexRouteObject, createBrowserRouter } from 'react-router-dom';
import App from 'App';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Todo from 'pages/Todo';
import Home from 'pages/Home';

type TCustomRouteObjectParams = {
  path?: string;
  name?: string;
  element?: ReactElement;
};

type TCustomIndexRouteObject = IndexRouteObject & TCustomRouteObjectParams;

type TCustomNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
  TCustomRouteObjectParams & {
    children?: (TCustomIndexRouteObject | TCustomNonIndexRouteObject)[];
  };

type TCustomRouteConfig = TCustomIndexRouteObject | TCustomNonIndexRouteObject;

const routeConfig: TCustomRouteConfig[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/',
        element: <Home />,
        name: '홈',
      },
      {
        path: '/signup',
        element: <SignUp />,
        name: '회원가입',
      },
      {
        path: '/signin',
        element: <SignIn />,
        name: '로그인',
      },
      {
        path: '/todo',
        element: <Todo />,
        name: '투두',
      },
    ],
  },
];

const Router = createBrowserRouter(routeConfig);

export default Router;
