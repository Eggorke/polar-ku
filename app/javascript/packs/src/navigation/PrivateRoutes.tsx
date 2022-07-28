interface route {
  path: string
}

interface routes {
  root: route
  app: route
  orders: route
  newOrder: route
  order: route
  reports: route
  settings: route
}

const PrivateRoutes: routes = {
  root: {
    path: '/app/*'
  },
  app: {
    path: '/app'
  },
  orders: {
    path: '/orders'
  },
  newOrder: {
    path: '/orders/new-order'
  },
  order: {
    path: '/orders/:id'
  },
  reports: {
    path: '/reports'
  },
  settings: {
    path: '/settings'
  }
}

export default PrivateRoutes
