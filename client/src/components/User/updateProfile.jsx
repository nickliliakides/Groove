import React from 'react'
import UserLayout from '../../hoc/user';
import UpdateUserInfo from './updateUserInfo';

const UpdateProfile = () => {
  return (
    <UserLayout>
      <h1>Profile</h1>
      <UpdateUserInfo/>
    </UserLayout>
  )
}

export default UpdateProfile
