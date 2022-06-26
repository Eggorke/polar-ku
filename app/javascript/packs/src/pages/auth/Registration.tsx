import * as React from 'react'
import { userSignUp } from '../../actions'
import { connect } from 'react-redux'
import { authInitialStateI, profileInitialStateI } from '../../reducers/interfaces'
import ApiService from '../../lib/services/api-service'
import { Link, useNavigate } from 'react-router-dom'
import PrivateRoutes from '../../navigation/PrivateRoutes'
import { useFormik } from 'formik'
import PublicRoutes from '../../navigation/PublicRoutes'


interface registrationPropsI {
  state: {
    auth: authInitialStateI
    profile: profileInitialStateI
  }
  userSignUp: ({}) => {type: string, payload: {}}
}

interface responseI {
  status: number
  headers: authInitialStateI
}

const apiService = new ApiService()

const Registration: React.FC = (props: registrationPropsI) => {
  const { state, userSignUp } = props
  const { isAuthenticated } = state.profile
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(PrivateRoutes.app.path)
    }
  }, [isAuthenticated])

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      apiService.signUp(values)
        .then((response: responseI) => {
          if (response.status !== 200) {
            console.log('error')
          } else {
            userSignUp({
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
          id='first_name'
          name='first_name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Имя'
          value={formik.values.first_name}
          required={true}
        >
        </input>
        <input
          id='last_name'
          name='last_name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='auth-input'
          placeholder='Фамилия'
          value={formik.values.last_name}
          required={true}>
        </input>
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
          Зарегистрироваться
        </button>
        <Link to={`../${PublicRoutes.login.path}`}>Have account?</Link>
      </form>
    </div>
  )
}

const mapStateToProps = (state: {}) => {
  return { state }
}

const mapDispatchToProps = {
  userSignUp
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
