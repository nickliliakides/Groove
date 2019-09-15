import React, { useState, useEffect } from 'react'
import FormField from '../../shared/formField';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMinusCircle from '@fortawesome/fontawesome-free-solid/faMinusCircle';
import {
  updateField,
  generateData,
  resetFields,
  isFormValid
} from '../../../utils/formActions';
import { connect } from 'react-redux';
import {
  getWoods,
  addWood,
  removeWood
} from '../../../store/actions/productActions';

const ManageWoods = props => {
  const [state, setState] = useState({
    formError: false,
    formSuccess: false,
    successMessage: '',
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Wood name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter wood name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
    }
  })

  useEffect(() => {
    props.dispatch(getWoods());
  }, []);

  const delIconStyles = {
    color: 'red',
    opacity: '0.5',
    cursor: 'pointer'
  }

  const showCategories = () => (
    props.product.woods && 
      props.product.woods.map((w,i) => (
        <div key={w._id} className="category_item">
          <div>{w.name}</div>
          <div><FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => {
                props.dispatch(removeWood(w._id));
                setState({
                  ...state,
                  formSuccess:true,
                  successMessage: 'Wood deleted succefully!'
                })
                setTimeout(() => {
                  setState({
                    ...state,
                    formSuccess: false,
                    successMessage: ''
                  });
                }, 3000);
              }}
              style={delIconStyles}
            /></div>
        </div>
      ))
  )

  const handleChange = el => {
    const formdata = updateField(el, state.formdata, 'woods');
    setState({
      ...state,
      formError: false,
      formdata
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let dataToSubmit = generateData(state.formdata, 'woods');
    let formIsValid = isFormValid(state.formdata, 'woods');

    if (formIsValid) {
      try {
        props.dispatch(addWood(dataToSubmit, props.product.woods));
      } catch (error) {
        setState({
          ...state,
          formError: true
        });
        return;
      }
      handleResetFields();
    } else {
      setState({
        ...state,
        formError: true
      });
    }
  };

  const handleResetFields = () => {
    const newFormData = resetFields(state.formdata, 'woods');
  setState({
    ...state,
    formdata: newFormData,
    formSuccess: true,
    successMessage: 'Wood saved successfully!'
  });
  setTimeout(() => {
    setState({
      ...state,
      formSuccess: false,
      successMessage: ''
    });
  }, 3000);
};

  return (
    <div className="admin_category_wrapper">
      <h1>Woods</h1>
      <div className="admin_two_column">
        <div className="left">
          <div className="brands_container">
            {showCategories()}
          </div>
        </div>
        <div className="right">
          <form onSubmit={e => handleSubmit(e)}>
          <FormField
            id={'name'}
            formdata={state.formdata.name}
            onchange={el => handleChange(el)}
          />
          {state.formError && (
              <div className="error_label">
                Something is wrong, please check your data.
              </div>
            )}
            {state.formSuccess && (
              <div 
                className="form_success"
                style={state.successMessage === 'Wood saved successfully!' ? { background: '#4CAF50'} : {background: 'red'}}
              >{state.successMessage}</div>
            )}
            <button onClick={e => handleSubmit(e)}>Add wood</button>
          </form>
        </div>  
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(ManageWoods)
