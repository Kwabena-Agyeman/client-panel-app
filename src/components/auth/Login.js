import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { notifyUser, clearAlert } from '../../Redux/NotifyActions';
import Alert from '../layout/Alert';

const Login = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  let notify = useSelector((state) => state.notify);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    firebase
      .login({
        email: state.email,
        password: state.password,
      })
      .catch((error) => {
        dispatch(notifyUser('Invalid Login Credentials', 'error'));

        setTimeout(function () {
          dispatch(clearAlert());
        }, 3000);
      });
  };

  return (
    <div className='row'>
      <div className='col-md-6 mx-auto'>
        <div className='card'>
          <div className='card-body'>
            {notify.message ? <Alert message={notify.message} messageType={notify.messageType} /> : null}
            <h1 className='text-center mt-4 mb-3'>
              <span className='text-primary'>
                <i className='bi bi-shield-lock'></i>
                {'  '}
                LOGIN
              </span>
            </h1>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  className='form-control'
                  name='email'
                  required
                  value={state.email}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  required
                  value={state.password}
                  onChange={onChange}
                />
              </div>
              <div className='form-group text-center'>
                <input type='submit' value='LOGIN' className='btn btn-primary btn-lg mt-3 btn-block px-5 text-center' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
