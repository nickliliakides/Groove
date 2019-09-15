import React from 'react'
import UserLayout from '../../../hoc/user';
import ManageBrands from './manageBrands';
import ManageWoods from './manageWoods';

const ManageCategories = props => {
  return (
    <UserLayout>
      <ManageBrands/>
      <ManageWoods/>
    </UserLayout>
  )
}

export default ManageCategories
