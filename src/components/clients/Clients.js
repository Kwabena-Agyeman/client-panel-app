import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Gif from '../../assets/loading.gif';

const Clients = () => {
  useFirestoreConnect([{ collection: 'clients' }]);
  const clients = useSelector((state) => state.firestore.ordered.clients);

  if (!isLoaded(clients)) {
    return (
      <div style={{ width: '200px', margin: 'auto', display: 'block' }}>
        <img src={Gif} alt='Loading' />
      </div>
    );
  }

  if (isEmpty(clients)) {
    return <div>No Clients Exist</div>;
  }

  const CalcTotal = clients.reduce((total, client) => {
    return total + parseFloat(client.balance);
  }, 0);

  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <h2>
            {' '}
            <i className='bi bi-people-fill'></i> Clients{' '}
          </h2>
        </div>
        <div className='col-md-6'>
          <h5 className='text-right text-secondary float-end mt-2'>
            Total Owed <span className='text-primary'>${CalcTotal.toFixed(2)}</span>
          </h5>
        </div>
      </div>
      <table className='table table-striped'>
        <thead className='thead-inverse'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            return (
              <tr key={client.id}>
                <td>
                  {client.firstName} {client.lastName}
                </td>
                <td>{client.email}</td>
                <td>$ {parseFloat(client.balance).toFixed(2)}</td>
                <td>
                  <Link to={`/client/${client.id}`} className='btn btn-danger btn-sm'>
                    <i className='bi bi-arrow-right-circle'></i> Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
