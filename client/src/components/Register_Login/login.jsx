import React, { useState } from 'react';
import FormField from '../shared/formField';
import {
  updateField,
  generateData,
  isFormValid
} from '../../utils/formActions';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/userActions';
import { withRouter } from 'react-router-dom';

const Login = props => {
  const [state, setState] = useState({
    formError: false,
    formSuccess: '',
    formdata: {
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
      }
    }
  });

  const handleChange = el => {
    const formdata = updateField(el, state.formdata, 'login');
    setState({
      ...state,
      formError: false,
      formdata
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let dataToSubmit = generateData(state.formdata, 'login');
    let formIsValid = isFormValid(state.formdata, 'login');

    if (formIsValid) {
      props.dispatch(loginUser(dataToSubmit)).then(res => {
        if (res.payload.loginSuccess) {
          // console.log(res.payload);
          props.history.push('/user/dashboard');
        }
      });
    } else {
      setState({
        ...state,
        formError: true
      });
    }
  };

  return (
    <div className="signin_wrapper">
      <form onSubmit={e => handleSubmit(e)}>
        <FormField
          id={'email'}
          formdata={state.formdata.email}
          onchange={el => handleChange(el)}
        />
        <FormField
          id={'password'}
          formdata={state.formdata.password}
          onchange={el => handleChange(el)}
        />
        {state.formError && (
          <div className="error_label">
            Something is wrong, please check your data.
          </div>
        )}
        <button onClick={e => handleSubmit(e)}>Log In</button>
      </form>
    </div>
  );
};

export default connect()(withRouter(Login));
