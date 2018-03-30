import React from 'react'
import { Redirect } from 'react-router'
import Layout from 'views/Layout'
import Loadable from 'react-loadable'
import notFound from 'views/NotFound'

export default [
  {
    component: Layout,
    childRoutes: [
      {
        path: '/',
        exact: true,
        component: () => <Redirect to='/home' />
      },
      {
        path: '/home',
        component: Loadable({
          loader: () => import(`views/Home`),
          // if you have your own loading component,
          // you should consider add it here
          loading: () => null
        })
      },
      {
        path: '/login',
        component: Loadable({
          loader: () => import(`views/Login`),
          loading: () => null
        })
      },
      {
        path: '/detail/:id',
        component: Loadable({
          loader: () => import(`views/Detail`),
          loading: () => null
        })
      },
      {
        path: '*',
        component: notFound
      }
    ]
  }
]
