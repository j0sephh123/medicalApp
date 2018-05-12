import React from 'react';

export const inputClassNameFn = (stateErrors) => {
  let formControl = 'form-control';
  if(stateErrors === 'invalidLength'){
    return ({
      className: `${formControl} is-invalid`,
      message: <div className="invalid-feedback">Name must be between 4 and 15 characters</div>
    });
  } else if(stateErrors === 'empty') {
    return ({
      className: `${formControl} is-valid`,
      message: <div className="valid-feedback">Success</div>
    });
  } else {
    return formControl;
  }
} 

