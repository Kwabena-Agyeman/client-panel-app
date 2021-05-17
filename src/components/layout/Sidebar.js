import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Link to='/client/add' className='btn btn-success btn-block'>
      <i className='bi bi-plus-circle'></i> Add New Client
    </Link>
  );
};

export default Sidebar;
