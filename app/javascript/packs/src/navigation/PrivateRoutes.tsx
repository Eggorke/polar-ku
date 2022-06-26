interface route {
  path: string
}

interface routes {
  root: route
  app: route
  orders: route
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
  }
}

export default PrivateRoutes
