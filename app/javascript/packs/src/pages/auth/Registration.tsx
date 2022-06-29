import * as React from 'react'
import { userSignUp } from '../../actions'
import { connect } from 'react-redux'
import { authInitialStateI, profileInitialStateI } from '../../reducers/interfaces'
import ApiService from '../../lib/services/api-service'
import { Link, useNavigate } from 'react-router-dom'
import PrivateRoutes from '../../navigation/PrivateRoutes'
import { useFormik } from 'formik'
import PublicRoutes from '../../navigation/PublicRoutes'
import toast from 'react-hot-toast';
import { Config } from '../../config'

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
  data: {
    errors: {
      full_messages: string[]
    }
  }
}

interface organizationI {
  id: string
  attributes: {
    address: string
    email: string
    name: string
    phone: string
  }
}

interface organizationsResponseI {
  data: {
    data: organizationI[]
  }
}

const apiService = new ApiService()

const Registration: React.FC = (props: registrationPropsI) => {

  const [organizationsArr, setOrganizationsArr] = React.useState<[] | organizationI[]>([])

  const { state, userSignUp } = props
  const { isAuthenticated } = state.profile
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(PrivateRoutes.app.path)
    }
  }, [isAuthenticated])

  React.useEffect(() => {
    apiService.getAllOrganizations()
      .then((response: organizationsResponseI) => {
        return response.data
      })
      .then(data => {
        setOrganizationsArr(data.data)
      })
  }, [])

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      organization_id: ''
    },
    onSubmit: (values) => {
      apiService.signUp(values)
        .then((response: responseI) => {
          if (response.status !== 200) {
            toast.error(response.data.errors.full_messages[0], {  duration: Config.NOTIFICATION_DEFAULT_DURATION })
          } else {
            userSignUp({
              accessToken: response.headers['access-token'],
              accessClient: response.headers['client'],
              accessUID: response.headers['uid']
            })
            toast.success('Добро пожаловать', {  duration: Config.NOTIFICATION_DEFAULT_DURATION })
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
        <select
          id='organization_id'
          name='organization_id'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='auth-input'
          placeholder='Организация'
          required={true}
          defaultValue={''}
        >
          <option disabled value={''}>Выберите организацию из списка</option>
          {organizationsArr.length > 0 ?
            organizationsArr.map((el: organizationI) => {
              return (
                <option value={el.id} key={el.id}>{el.attributes.name}</option>
              )
            }) : null
          }
        </select>
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
