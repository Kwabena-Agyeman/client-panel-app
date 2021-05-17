import React from 'react';
import Gif from '../../assets/loading.gif';

const Spinner = () => {
  return (
    <div style={{ width: '200px', margin: 'auto', display: 'block' }}>
      <img src={Gif} alt='' />
    </div>
  );
};

export default Spinner;
