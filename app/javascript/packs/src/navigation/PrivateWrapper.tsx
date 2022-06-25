import * as React from 'react'
import { Route, Navigate } from 'react-router'
import { store } from '../../entry_point'
import PublicRoutes from './PublicRoutes'

const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = store.getState().profile

  return isAuthenticated ? children : <Navigate to={PublicRoutes.home.path} replace />;
}

export default PrivateWrapper
