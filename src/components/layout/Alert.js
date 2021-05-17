import React from 'react';

const Alert = (props) => {
  const { message, messageType } = props;

  if (messageType === 'success') {
    return <div className='alert alert-success'>{message}</div>;
  } else {
    return <div className='alert alert-danger'>{message}</div>;
  }
};

export default Alert;
