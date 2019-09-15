import React, { useState, useEffect } from "react";
import FormField from "../shared/formField";
import {
  updateField,
  generateData,
  isFormValid,
  populateFields
} from "../../utils/formActions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { updateProfile, clearUserData } from "../../store/actions/userActions";

const UpdateUserInfo = props => {
  const [state, setState] = useState({
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter your lastname"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  });

  useEffect(() => {
    const newFormData = populateFields(state.formdata, props.user.userData);

    setState({
      ...state,
      formdata: newFormData
    })
  },[])

  const handleChange = el => {
    const formdata = updateField(el, state.formdata, "update_user");
    setState({
      ...state,
      formError: false,
      formdata
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let dataToSubmit = generateData(state.formdata, "update_user");
    let formIsValid = isFormValid(state.formdata, "update_user");

    if (formIsValid) {
      props.dispatch(updateProfile(dataToSubmit)).then((res) => {
        if(res.payload.success){
          setState({
            ...state,
            formSuccess: true
          })
          setTimeout(() => {
            props.dispatch(clearUserData());
            setState({
              ...state,
              formSuccess: false
            });
            props.history.push('/user/dashboard')
          }, 1200)
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
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <h2>Personal Information</h2>
        <div className="form_block_three">
          <div className="block">
            <FormField
              id={"name"}
              formdata={state.formdata.name}
              onchange={el => handleChange(el)}
            />
          </div>
          <div className="block">
            <FormField
              id={"lastname"}
              formdata={state.formdata.lastname}
              onchange={el => handleChange(el)}
            />
          </div>
          <div className="block">
            <FormField
              id={"email"}
              formdata={state.formdata.email}
              onchange={el => handleChange(el)}
            />
          </div>
        </div>
        <div>
          {state.formSuccess && 
            <div className="form_success">
              Updated successfully.
            </div>
          }
          {state.formError && 
            <div className="error_label">
              Something is wrong, please check your data.
            </div>
          }
          <button onClick={e => handleSubmit(e)}>Update Account</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(UpdateUserInfo));
