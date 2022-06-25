import * as React from 'react'
import { userSignIn } from '../../actions'
import { connect } from 'react-redux'
import { authInitialStateI, profileInitialStateI } from '../../reducers/interfaces'
import ApiService from '../../lib/services/api-service'
import { useNavigate } from 'react-router-dom'
import PrivateRoutes from '../../navigation/PrivateRoutes'
import { useFormik } from 'formik'

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
}

const apiService = new ApiService()

const Login: React.FC = (props: registrationPropsI) => {
  const { state, userSignIn } = props
  const { isAuthenticated } = state.profile
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(PrivateRoutes.dashboard.path)
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
            console.log('error')
          } else {
            userSignIn({
              accessToken: response.headers['access-token'],
              accessClient: response.headers['client'],
              accessUID: response.headers['uid']
            })
          }
        })
        .catch(error => {
          console.log(error)
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
