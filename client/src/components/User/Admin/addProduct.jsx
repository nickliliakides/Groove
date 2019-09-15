import React, { useState, useEffect } from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../shared/formField';
import FileUpload from '../../shared/fileUpload';
import {
  updateField,
  generateData,
  resetFields,
  populateOptionFields,
  isFormValid
} from '../../../utils/formActions';
import { connect } from 'react-redux';
import {
  getBrands,
  getWoods,
  addProduct,
  clearProduct
} from '../../../store/actions/productActions';

const AddProduct = props => {
  const [state, setState] = useState({
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter description'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter price'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product brand',
          name: 'brand_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available in stock',
          name: 'available_input',
          options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood material',
          name: 'wood_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      strings: {
        element: 'select',
        value: '',
        config: {
          label: 'Strings number',
          name: 'strings_input',
          options: [
            { key: 4, value: 4 },
            { key: 5, value: 5 },
            { key: 6, value: 6 },
            { key: 8, value: 8 }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Published',
          name: 'publish_input',
          options: [
            { key: true, value: 'Public' },
            { key: false, value: 'Hidden' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showLabel: false
      }
    }
  });

  useEffect(() => {
    props.dispatch(getBrands());
    props.dispatch(getWoods());
  }, []);

  const formdata = state.formdata;
  populateOptionFields(formdata, props.product.brands, 'brand');
  populateOptionFields(formdata, props.product.woods, 'wood');

  const handleChange = el => {
    const formdata = updateField(el, state.formdata, 'products');
    setState({
      ...state,
      formError: false,
      formdata
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let dataToSubmit = generateData(state.formdata, 'products');
    let formIsValid = isFormValid(state.formdata, 'products');

    if (formIsValid) {
      try {
        props.dispatch(addProduct(dataToSubmit));
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
      const newFormData = resetFields(state.formdata, 'products');
    setState({
      ...state,
      formdata: newFormData,
      formSuccess: true
    });
    setTimeout(() => {
      setState({
        ...state,
        formSuccess: false
      });
      props.dispatch(clearProduct());
    }, 3000);
  };

  const imagesHandler = images => {
    const newFormData = {
      ...state.formdata
    }
    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    setState({
      ...state,
      formdata: newFormData
    })
  }

  return (
    <UserLayout>
      <div>
        <h1>Add product</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <FileUpload
            imgHandler={images => imagesHandler(images)}
            reset={state.formSuccess}
          />

          <FormField
            id={'name'}
            formdata={state.formdata.name}
            onchange={el => handleChange(el)}
          />
          <FormField
            id={'description'}
            formdata={state.formdata.description}
            onchange={el => handleChange(el)}
          />
          <FormField
            id={'price'}
            formdata={state.formdata.price}
            onchange={el => handleChange(el)}
          />

          <div className="form_devider" />

          <FormField
            id={'brand'}
            formdata={state.formdata.brand}
            onchange={el => handleChange(el)}
          />
          <FormField
            id={'shipping'}
            formdata={state.formdata.shipping}
            onchange={el => handleChange(el)}
          />
          <FormField
            id={'available'}
            formdata={state.formdata.available}
            onchange={el => handleChange(el)}
          />

          <div className="form_devider" />

          <FormField
            id={'wood'}
            formdata={state.formdata.wood}
            onchange={el => handleChange(el)}
          />
          <FormField
            id={'strings'}
            formdata={state.formdata.strings}
            onchange={el => handleChange(el)}
          />
          <FormField
            id={'publish'}
            formdata={state.formdata.publish}
            onchange={el => handleChange(el)}
          />
          <div>
            {state.formError && (
              <div className="error_label">
                Something is wrong, please check your data.
              </div>
            )}
            {state.formSuccess && (
              <div className="form_success">Product saved successfully!</div>
            )}
            <button onClick={e => handleSubmit(e)}>Add product</button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(AddProduct);
