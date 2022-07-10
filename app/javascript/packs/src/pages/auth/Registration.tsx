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
import classNames from "classnames";
import s from './styles.module.scss';


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
    if (!isAuthenticated) {
      apiService.getAllOrganizations({page: 1, per_page: 50})
          .then((response: organizationsResponseI) => {
            return response.data
          })
          .then(data => {
            setOrganizationsArr(data.data)
          })
    }
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
      <div className={classNames("banner", s.authContainer)}>
        <div className={s.formContainer}>
          <h2 className={s.oauthTitle}> Регистрация </h2>
          <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
          >
            <div className={s.inputWrapper}>
              <label className={s.label} htmlFor="first_name">Имя</label>
              <input className={s.input}
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
            </div>
            <div className={s.inputWrapper}>
              <label className={s.label} htmlFor="last_name">Фамилия</label>
              <input className={s.input}
                     id='last_name'
                     name='last_name'
                     type='text'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     placeholder='Фамилия'
                     value={formik.values.last_name}
                     required={true}>
              </input>
            </div>
            <div className={s.inputWrapper}>
              <label className={s.label} htmlFor="email">Электронная почта</label>
              <input className={s.input}
                     id='email'
                     name='email'
                     type='email'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     placeholder='Электронная почта'
                     value={formik.values.email}
                     required={true}>
              </input>
            </div>
            <div className={s.inputWrapper}>
              <label className={s.label} htmlFor="organization_id">Организация</label>
              <select
                  className={s.dropdown}
                  id='organization_id'
                  name='organization_id'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
            </div>

            <div className={s.inputWrapper}>
              <label className={s.label} htmlFor="password">Пароль</label>
              <input className={s.input}
                     id='password'
                     name='password'
                     type='password'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     placeholder='Пароль'
                     value={formik.values.password}
                     required={true}>
              </input>
            </div>
            <button className={s.signInButton} type='submit'>
              Зарегистрироваться
            </button>
            <Link className={s.label} to={`../${PublicRoutes.login.path}`}>Have account?</Link>
          </form>
        </div>
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
