// import { isLogin } from 'auth';
import React, { lazy } from 'react';

const LoginPage = lazy(() => import('../containers/LoginPage'));
const WelcomePage = lazy(() => import('../containers/WelcomePage'));
const DashboardPage = lazy(() => import('../containers/DashboardItems'));
const ProfilePage = lazy(() => import('../containers/ProfilePage'));
const CategoriesPage = lazy(() => import('../containers/Categories'));
const DamPage = lazy(() => import('../containers/DamPage'));
const FieldsPage = lazy(() => import('../containers/FieldsPage'));
const FieldsGroupPage = lazy(() => import('../containers/FieldsGroupPage'));
const ContentPage = lazy(() => import('../containers/ContentPage'));
const SettingPage = lazy(() => import('../containers/DashboardItems'));
const HelpCenterPage = lazy(() => import('../containers/DashboardItems'));
const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage />,
  },
];

const mainRoutes = [
  {
    path: ['/', '/items-create', '/items-edit/:id'],
    exact: true,
    main: () => <DashboardPage />,
  },
  {
    path: ['/categories', '/categories-create', '/categories-edit/:id'],
    exact: true,
    main: () => <CategoriesPage />,
  },
  {
    path: '/dam',
    exact: true,
    main: () => <DamPage />,
  },
  {
    path: '/fields',
    exact: true,
    main: () => <FieldsPage />,
  },
  {
    path: '/fields-gr',
    exact: true,
    main: () => <FieldsGroupPage />,
  },
  {
    path: '/content',
    exact: true,
    main: () => <ContentPage />,
  },
  {
    path: '/setting',
    exact: true,
    main: () => <SettingPage />,
  },
  {
    path: '/help-center',
    exact: true,
    main: () => <HelpCenterPage />,
  },
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: ({ match, location }) => <ProfilePage match={match} location={location} />,
  },
  {
    path: '/welcome',
    exact: true,
    main: () => <WelcomePage />,
  },
];

export { authRoutes, mainRoutes, settingRoutes };
