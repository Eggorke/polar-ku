interface route {
  path: string
}

interface routes {
  dashboard: route
}

const PrivateRoutes: routes = {
  dashboard: {
    path: '/app'
  }
}

export default PrivateRoutes
