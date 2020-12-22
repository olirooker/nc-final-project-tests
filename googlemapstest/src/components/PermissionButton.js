import React from 'react';

const PermissionButton = (props) => {
  return (
    <button className='permissionButton' onClick={props.permissionClick}>
      {' '}
      CLLICK ONCE PERMISSION IS GRANTED
    </button>
  );
};

export default PermissionButton;
