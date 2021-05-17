import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const AppNavbar = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const firebase = useFirebase();

  const logoutClick = () => {
    firebase.logout();
  };

  console.log(auth);
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-primary mb-4'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          ClientPanel
        </Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarMain'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarMain'>
          <ul className='navbar-nav me-auto'>
            {auth.uid ? (
              <li className='nav-item'>
                <Link to='/' className='nav-link'>
                  Dashboard
                </Link>
              </li>
            ) : null}
          </ul>
          {auth.uid ? (
            <ul className='navbar-nav float-end'>
              <li className='nav-item'>
                <span className='nav-link text-center text-white'>{auth.email}</span>
              </li>
              <li className='nav-item'>
                <button href='#' className='nav-link btn btn-danger text-light btn-sm px-5' onClick={logoutClick}>
                  <i class='bi bi-box-arrow-left'></i> {'        '}
                  {'     '}LOGOUT
                </button>
              </li>
            </ul>
          ) : (
            <Link to='/register' className='btn text-white btn-dark px-5 float-end mt-2'>
              SIGN UP
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
