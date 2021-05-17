import React from 'react';
import Clients from '../clients/Clients';
import SideBar from '../layout/Sidebar';

const Dashboard = () => {
  return (
    <div className='card'>
      <div className='card-body px-5'>
        <div className='row'>
          <div className='col-md-10'>
            <Clients />
          </div>
          <div className='col-md-2'>
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
