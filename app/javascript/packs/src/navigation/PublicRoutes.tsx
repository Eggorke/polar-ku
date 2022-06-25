interface route {
  path: string
}

interface routes {
  home: route
  login: route
  registration: route
}

const PublicRoutes: routes = {
  home: {
    path: '/'
  },
  login: {
    path: 'login'
  },
  registration: {
    path: 'registration'
  }
}

export default PublicRoutes
