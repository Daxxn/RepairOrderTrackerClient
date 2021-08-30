import React from 'react';
import UserModel from '../../models/userModel';

const UserMenu = (): JSX.Element => {
  const user = UserModel.getUser();

  return (
    <div>
      {user ? (
        <>
          <p>{user.userName}</p>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
        </>
      ) : (
        <p>User not looged in.</p>
      )}
    </div>
  );
};

export default UserMenu;
