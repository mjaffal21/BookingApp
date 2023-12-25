import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useLogOutUserMutation } from '../slices/userApiSlice';

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logOutUser] = useLogOutUserMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = async() => {
    await logOutUser().unwrap()
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className="text-center max-w-lg mx-auto">
      Logged in as {userInfo.name} ({userInfo.email})<br />
      <button onClick={Logout} className="primary max-w-sm mt-2">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
