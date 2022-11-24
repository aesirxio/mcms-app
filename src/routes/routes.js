// import { isLogin } from 'auth';

import React, { lazy } from "react";
// import { Redirect } from 'react-router-dom';

const LoginPage = lazy(() => import("../containers/LoginPage"));

const WelcomePage = lazy(() => import("../containers/WelcomePage"));
const DashboardPage = lazy(() => import("../containers/Dashboard"));

const ProfilePage = lazy(() => import("../containers/ProfilePage"));

const authRoutes = [
  {
    path: "/login",
    exact: true,
    main: () => <LoginPage />,
  },
];

const mainRoutes = [
  {
    path: ["/data-:domain", "/"],
    exact: true,
    main: () => <DashboardPage />,
  },
];

const settingRoutes = [
  {
    path: "/profile",
    exact: false,
    main: ({ match, location }) => (
      <ProfilePage match={match} location={location} />
    ),
  },
  {
    path: "/welcome",
    exact: true,
    main: () => <WelcomePage />,
  },
];

export { authRoutes, mainRoutes, settingRoutes };
