import React, { lazy } from 'react';

//异常页面
const NoFoundPage = lazy(() => import('./occur/nofound'));

//登录页面
const LoginPage = lazy(() => import('./login/index'));

//业务页面
const IndexPage = lazy(() => import('./pages/index'));
const ListPage = lazy(() => import('./pages/list/index'));

const RouteMaps =  [
    {
        name: 'IndexPage',
        path: '/',
        component: IndexPage,
    },
    {
        name: 'ListPage',
        path: '/listview',
        component: ListPage,
    },
    {
        name: 'NoFoundPage',
        path: '/404',
        component: NoFoundPage,
    },
    {
        name: 'LoginPage',
        path: '/login',
        component: LoginPage,
    },
]
    
export default RouteMaps;