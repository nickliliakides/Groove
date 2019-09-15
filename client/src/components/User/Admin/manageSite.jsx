import React from 'react'
import UserLayout from '../../../hoc/user';
import UpdateSiteInfo from './updateSiteInfo'

const ManageSite = () => {
  return (
    <UserLayout>
      <h1>Site Information</h1>
      <UpdateSiteInfo/>
    </UserLayout>
  )
}

export default ManageSite
