export const validate = (el, formdata=[]) => {
  let error = [true, ''];

  if(el.validation.email){
    const valid = /\S+@\S+\.\S+/.test(el.value);
    const msg = `${!valid ? 'Email is not valid' : ''}`;
    error = !valid ? [valid,msg] : error;
  }
  
  if(el.validation.confirm){
    const valid = el.value.trim() === formdata[el.validation.confirm].value.trim();
    const msg = `${!valid ? 'Passwords don\'t match' : ''}`;
    error = !valid ? [valid,msg] : error;
  }

  if(el.validation.required){
    const valid = el.value.trim() !== '';
    const msg = `${!valid ? 'The filed is required' : ''}`;
    error = !valid ? [valid,msg] : error;
  }
  return error;
}

export const updateField = (el, formdata, formName) => {
  const newFormdata = { ...formdata };
  const newElement = { ...newFormdata[el.id] };

  newElement.value = el.e.target.value;
  if(el.blur){
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = el.blur;
  newFormdata[el.id] = newElement;

  return newFormdata;
}

export const generateData = (formdata, formName) => {
  let dataToSubmit = {};

  for(let key in formdata){
    if(key !== 'confirmPassword'){
      dataToSubmit[key] = formdata[key].value;
    }
  }
  return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
  let isValid = true;

  for(let key in formdata){
    isValid = formdata[key].valid && isValid;
  }
  return isValid;
}

export const populateOptionFields = (formdata, arrayData=[], field) => {
  const newArray = [];
  const newFormdata = {...formdata};

  arrayData.forEach(item => {
    newArray.push({key:item._id, value:item.name})
  });

  newFormdata[field].config.options = newArray;
  return newFormdata;
}

export const resetFields = (formdata, formName) => {
  const newFormdata = {...formdata};

  for(let key in newFormdata) {
    if(key === 'images') {
      newFormdata[key].value = [];
    } else {
      newFormdata[key].value = '';
    }
    
    newFormdata[key].valid = false;
    newFormdata[key].touched = false;
    newFormdata[key].validationMessage = '';
  }
  return newFormdata;
}

export const populateFields = (formData, userData) => {
  for(let key in formData){
    formData[key].value = userData[key];
    formData[key].valid = true;
    formData[key].touched = true;
    formData[key].validationMessage = ''
  }
  return formData;
}