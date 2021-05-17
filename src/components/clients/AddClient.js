import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';

const AddClient = () => {
  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '',
  });

  const firestore = useFirestore();
  const history = useHistory();

  const onChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newClient = client;

    if (newClient.balance === '') {
      newClient.balance = '0';
    }

    firestore.add({ collection: 'clients' }, newClient).then(() => {
      history.push('/');
    });
  };
  return (
    <div>
      <div className='row'>
        <div className='col md-6'>
          <Link to='/' className='btn btn-primary btn-block mb-3'>
            <i className='bi bi-arrow-90deg-left'></i> Back to Dashboard
          </Link>
        </div>
      </div>
      <div className='card'>
        <div className='card-header'>Add Client</div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                className='form-control'
                name='firstName'
                minLength='2'
                required
                onChange={onChange}
                value={client.firstName}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                className='form-control'
                name='lastName'
                minLength='2'
                required
                onChange={onChange}
                value={client.lastName}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                className='form-control'
                name='email'
                required
                onChange={onChange}
                value={client.email}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Phone</label>
              <input
                type='number'
                className='form-control'
                name='phone'
                minLength='10'
                required
                onChange={onChange}
                value={client.phone}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='balance'>Balance</label>
              <input type='text' className='form-control' name='balance' onChange={onChange} value={client.balance} />
            </div>
            <input type='submit' value='Submit' className='btn btn-primary btn-lg mt-3' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
