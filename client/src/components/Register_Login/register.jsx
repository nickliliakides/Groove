import React, { useState } from 'react';
import FormField from '../shared/formField';
import Dialog from '@material-ui/core/Dialog'
import{ updateField, generateData, isFormValid } from '../../utils/formActions'
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/userActions'

const Register = props => {
  const [state, setState] = useState({
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter your lastname'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirmPassword_input',
          type: 'password',
          placeholder: 'Confirm your password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  })


  const handleChange = el => {
    const formdata = updateField(el, state.formdata, 'register');
    setState({
      ...state,
      formError: false,
      formdata
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    let dataToSubmit = generateData(state.formdata, 'register');
    let formIsValid = isFormValid(state.formdata, 'register');

    if(formIsValid){
      props.dispatch(registerUser(dataToSubmit)).then(res => {
        if(res.payload.success){
          setState({
            ...state,
            formError: false,
            formSuccess: true
          });
          setTimeout(() => {
            props.history.push('/register_login');
          },3000)
        } else {
          setState({ ...state, formError: true })
        }
      }).catch(err => {
        setState({ ...state, formError: true })
      })
    } else {
      setState({
        ...state,
        formError: true
      })
    }
  }

  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
          <form onSubmit={e=>handleSubmit(e)}>
            <h2>Personal Information</h2>
            <div className="form_block_two">
              <div className="block">
                <FormField
                  id={'name'}
                  formdata={state.formdata.name}
                  onchange={el=>handleChange(el)}
                />
              </div>
              <div className="block">
                <FormField
                  id={'lastname'}
                  formdata={state.formdata.lastname}
                  onchange={el=>handleChange(el)}
                />
              </div>
            </div>
            <div>
              <FormField
                id={'email'}
                formdata={state.formdata.email}
                onchange={el=>handleChange(el)}
              />
            </div>
            <h2>Verify password</h2>
            <div className="form_block_two">
            <div className="block">
                <FormField
                  id={'password'}
                  formdata={state.formdata.password}
                  onchange={el=>handleChange(el)}
                />
              </div>
              <div className="block">
                <FormField
                  id={'confirmPassword'}
                  formdata={state.formdata.confirmPassword}
                  onchange={el=>handleChange(el)}
                />
              </div>
            </div>
              <div>
                { state.formError && 
                  <div className="error_label">
                    Something is wrong, please check your data.
                  </div>
                }
                <button onClick={e => handleSubmit(e) }>Create Account</button>
              </div>
          </form>
          </div>
        </div>
      </div>
      <Dialog open={state.formSuccess}>
        <div className="dialog_alert">
          <p>Congratulations!!!</p>
          <p>You have registered successfully...</p>
        </div>
      </Dialog>
    </div>
  )
}

export default connect()(Register);
