import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useParams, useHistory } from 'react-router-dom';
import Gif from '../../assets/loading.gif';

const ClientDetails = () => {
  const [state, setState] = useState({
    showBalanceUpdate: false,
    balanceUpdateAmount: '',
  });

  const firestore = useFirestore();
  const { id } = useParams();
  const history = useHistory();

  useFirestoreConnect({ collection: `clients`, storeAs: 'singleUser', doc: `${id}` });
  let loading = useSelector((state) => state.firestore.status.requested.singleUser);
  const singleUser = useSelector((state) => state.firestore.data.singleUser);

  const { showBalanceUpdate, balanceUpdateAmount } = state;
  let balanceForm = '';

  const balanceChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const balanceSubmit = (e) => {
    e.preventDefault();

    const updatedClient = {
      balance: parseFloat(balanceUpdateAmount),
    };

    firestore.update({ collection: 'clients', doc: `${id}` }, updatedClient);
  };

  const deleteClient = () => {
    firestore.delete({ collection: 'clients', doc: `${id}` });
    history.push('/');
  };

  if (showBalanceUpdate) {
    balanceForm = (
      <form
        onSubmit={(e) => {
          balanceSubmit(e);
        }}
      >
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            name='balanceUpdateAmount'
            placeholder='Add New Balance'
            value={state.balanceUpdateAmount}
            onChange={(e) => {
              balanceChange(e);
            }}
          />
          <div className='input-group-append'>
            <input type='submit' value='Update' className='btn btn-outline-dark' />
          </div>
        </div>
      </form>
    );
  } else {
    balanceForm = null;
  }

  if (!loading) {
    return (
      <div style={{ width: '200px', margin: 'auto', display: 'block' }}>
        <img src={Gif} alt='Loading' />
      </div>
    );
  } else {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/' className='btn btn-primary btn-block mb-3'>
              <i className='bi bi-arrow-90deg-left'></i> Back to Dashboard
            </Link>
          </div>
          <div className='col-md-6'>
            <div className='btn-group float-end'>
              <Link to={`/client/edit/${id}`} className='btn btn-dark'>
                Edit
              </Link>
              <button
                className='btn btn-danger'
                onClick={() => {
                  deleteClient();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className='card'>
          <h3 className='card-header'>
            {singleUser.firstName} {singleUser.lastName}
          </h3>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-8 col-sm-6'>
                <h4>
                  Client ID: <span className='text-secondary'>{singleUser.id}</span>{' '}
                </h4>
              </div>
              <div className='col-md-4 col-sm-6'>
                <h3 className='float-end'>
                  Balance: $
                  <span className={singleUser.balance > 0 ? 'text-danger ' : 'text-success '}>
                    {parseFloat(singleUser.balance).toFixed(2)}
                  </span>
                  {'   '}
                  <small>
                    <button
                      className='btn btn-primary mb-2'
                      onClick={() => {
                        setState({ ...state, showBalanceUpdate: !state.showBalanceUpdate });
                      }}
                    >
                      <i className='bi bi-pencil-fill mb-2'></i>
                    </button>
                  </small>
                </h3>
                {balanceForm}
              </div>
            </div>
            <hr />
            <ul className='list-group'>
              <li className='list-group-item'>Contact Email : {singleUser.email}</li>
              <li className='list-group-item'>Contact Phone : {singleUser.phone}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default ClientDetails;
