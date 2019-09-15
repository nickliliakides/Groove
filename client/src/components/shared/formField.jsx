import React from 'react'

const FormFIeld = ({ id, formdata, onchange }) => {
  const renderTemplate = () => {
    let formTemplate = null;

    switch(formdata.element){
      case('input'):
        formTemplate = (
          <div className="formBlock">
          { formdata.showlabel && 
          <div className="label_inputs">{formdata.config.label}</div>}
            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={ e => onchange({e,id,blur:true})}
              onChange={ e => onchange({e,id})}
            />
            {showError()}
          </div>
        )
      break;
      case('textarea'):
        formTemplate = (
          <div className="formBlock">
          { formdata.showlabel && 
          <div className="label_inputs">{formdata.config.label}</div>}
            <textarea
              {...formdata.config}
              value={formdata.value}
              onBlur={ e => onchange({e,id,blur:true})}
              onChange={ e => onchange({e,id})}
            />
            {showError()}
          </div>
        )
      break;
      case('select'):
        formTemplate = (
          <div className="formBlock">
          { formdata.showlabel && 
          <div className="label_inputs">{formdata.config.label}</div>}
            <select
              value={formdata.value}
              onBlur={ e => onchange({e,id,blur:true})}
              onChange={ e => onchange({e,id})}
            >
              <option value="">Select One</option>
              {
                formdata.config.options.map(o => (
                  <option 
                    key={o.key}
                    value={o.key}
                  >
                    {o.value}
                  </option>
                ))
              }
            </select>
            {showError()}
          </div>
        )
      break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  }

  const showError = () => {
    let errorMessage = null;

    if(formdata.validation && !formdata.valid){
      errorMessage = (
        <div className="error_label">
          {formdata.validationMessage}
        </div>
      )
    }
    return errorMessage;
  }

  return (
    <div>
      {renderTemplate()}
    </div>
  )
}

export default FormFIeld
