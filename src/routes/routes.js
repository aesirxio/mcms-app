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
const EditCategories = lazy(() => import('../containers/Categories/edit'));
const EditItems = lazy(() => import('../containers/DashboardItems/edit'));
const EditFields = lazy(() => import('../containers/FieldsPage/edit'));
const EditFieldsGroup = lazy(() => import('../containers/FieldsGroupPage/edit'));
const EditContent = lazy(() => import('../containers/ContentPage/edit'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage />,
  },
];

const mainRoutes = [
  {
    path: ['/'],
    exact: true,
    main: () => <DashboardPage />,
  },
  {
    path: '/items-edit/:id',
    exact: true,
    main: ({ match }) => <EditItems match={match} />,
  },
  {
    path: '/items-create',
    exact: true,
    main: () => <EditItems />,
  },
  {
    path: '/categories',
    exact: true,
    main: () => <CategoriesPage />,
  },
  {
    path: '/categories-edit/:id',
    exact: true,
    main: ({ match }) => <EditCategories match={match} />,
  },
  {
    path: '/categories-create',
    exact: true,
    main: () => <EditCategories />,
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
    path: '/fields-edit/:id',
    exact: true,
    main: ({ match }) => <EditFields match={match} />,
  },
  {
    path: '/fields-create',
    exact: true,
    main: () => <EditFields />,
  },
  {
    path: '/fields-group',
    exact: true,
    main: () => <FieldsGroupPage />,
  },
  {
    path: '/fields-group-edit/:id',
    exact: true,
    main: ({ match }) => <EditFieldsGroup match={match} />,
  },
  {
    path: '/fields-group-create',
    exact: true,
    main: () => <EditFieldsGroup />,
  },
  {
    path: '/content',
    exact: true,
    main: () => <ContentPage />,
  },
  {
    path: '/content-edit/:id',
    exact: true,
    main: ({ match }) => <EditContent match={match} />,
  },
  {
    path: '/content-create',
    exact: true,
    main: () => <EditContent />,
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
