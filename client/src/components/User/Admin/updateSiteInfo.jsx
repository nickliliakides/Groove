import React, { useState, useEffect } from "react";
import FormField from "../../shared/formField";
import {
  updateField,
  generateData,
  isFormValid,
  populateFields
} from "../../../utils/formActions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { getSiteInfo, updateSiteInfo } from "../../../store/actions/siteActions";

const UpdateSiteInfo = props => {
  const [state, setState] = useState({
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: "input",
        value: "",
        config: {
          label: "Address",
          name: "address_input",
          type: "text",
          placeholder: "Enter address"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      hours: {
        element: "input",
        value: "",
        config: {
          label: "Working hours",
          name: "hours_input",
          type: "text",
          placeholder: "Enter working hours"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      phone: {
        element: "input",
        value: "",
        config: {
          label: "Phone number",
          name: "phone_input",
          type: "text",
          placeholder: "Enter phone number"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      email: {
        element: "input",
        value: "",
        config: {
          label: "Email",
          name: "email_input",
          type: "email",
          placeholder: "Enter email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      }
    }
  });

  useEffect(() => {
    props.dispatch(getSiteInfo()).then(res => {
      const newFormData = populateFields(state.formdata, res.payload[0]);

      setState({
        ...state,
        formData: newFormData
      })
    })
  }, [])

  const handleChange = el => {
    const formdata = updateField(el, state.formdata, "site_info");
    setState({
      ...state,
      formError: false,
      formdata
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let dataToSubmit = generateData(state.formdata, "site_info");
    let formIsValid = isFormValid(state.formdata, "site_info");

    if (formIsValid) {
      props.dispatch(updateSiteInfo(dataToSubmit)).then((res) => {
        if(res.payload.success){
          setState({
            ...state,
            formSuccess: true
          })
          setTimeout(() => {
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
      <div className="form_block_three">
        <div className="block">
          <FormField
            id={"address"}
            formdata={state.formdata.address}
            onchange={el => handleChange(el)}
          />
        </div>
        <div className="block">
          <FormField
            id={"hours"}
            formdata={state.formdata.hours}
            onchange={el => handleChange(el)}
          />
        </div>
        <div className="block">
          <FormField
            id={"phone"}
            formdata={state.formdata.phone}
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
        <button onClick={e => handleSubmit(e)}>Update Info</button>
      </div>
    </form>
  </div>
  )
}

const mapStateToProps = state => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(withRouter(UpdateSiteInfo))
