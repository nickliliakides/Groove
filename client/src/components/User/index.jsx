import React from 'react'
import UserLayout from '../../hoc/user';
import MyButton from '../shared/button';
import UserHistoryBlock from './historyBlock';

const Dashboard = ({user: {userData}}) => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User Information</h1>
          <div>
            <span>{userData.name}</span>
            <span>{userData.lastname}</span>
            <span>{userData.email}</span>
          </div>
          <MyButton
            type="default"
            title="Edit account info"
            linkTo="/user/user_profile"
          />
        </div>
        <div className="user_nfo_panel">
          <h1>Purchase history</h1>
          <div className="user_product_block_wrapper">
            {userData.history ?
            <UserHistoryBlock 
              history={userData.history}
            />
             : 'No purchase history yet.'}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default Dashboard
