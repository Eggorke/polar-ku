import * as React from 'react'
import { userSignIn } from '../../actions'
import { connect } from 'react-redux'
import { authInitialStateI, profileInitialStateI } from '../../reducers/interfaces'
import ApiService from '../../lib/services/api-service'
import { useNavigate } from 'react-router-dom'
import PrivateRoutes from '../../navigation/PrivateRoutes'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import PublicRoutes from '../../navigation/PublicRoutes'
import toast from 'react-hot-toast';
import { Config } from '../../config'

interface registrationPropsI {
  state: {
    auth: authInitialStateI
    profile: profileInitialStateI
  }
  userSignIn: ({}) => {type: string, payload: {}}
}

interface responseI {
  status: number
  headers: authInitialStateI
  data: {
    errors: string[]
  }
}

const apiService = new ApiService()

const Login: React.FC = (props: registrationPropsI) => {
  const { state, userSignIn } = props
  const { isAuthenticated } = state.profile
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(PrivateRoutes.app.path)
    }
  }, [isAuthenticated])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      apiService.signIn(values)
        .then((response: responseI) => {
          if (response.status !== 200) {
            toast.error(response.data.errors[0], { duration: Config.NOTIFICATION_DEFAULT_DURATION })
          } else {
            userSignIn({
              accessToken: response.headers['access-token'],
              accessClient: response.headers['client'],
              accessUID: response.headers['uid']
            })
            toast.success('Добро пожаловать', { duration: Config.NOTIFICATION_DEFAULT_DURATION })
          }
        })
        .catch(error => {
          console.log(error)
          toast.error(error, { duration: Config.NOTIFICATION_DEFAULT_DURATION })
        })
    }
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <input
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Электронная почта'
          value={formik.values.email}
          required={true}>
        </input>
        <input
          id='password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Пароль'
          value={formik.values.password}
          required={true}>
        </input>
        <button type='submit'>
          Войти
        </button>
        <Link to={`../${PublicRoutes.registration.path}`}>Dont have an account?</Link>
      </form>
    </div>
  )
}

const mapStateToProps = (state: {}) => {
  return { state }
}

const mapDispatchToProps = {
  userSignIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
