import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import Footer from '../layouts/Footer';
import { logout } from '../../Actions/authActions';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user = {},
    loading = false,
    isAuthenticatedUser = false,
    error = null,
  } = useSelector((state) => state.authState);

  const handleLogout = () => {
    if (confirm('Want To logout ?')) {
      dispatch(logout);
      console.log(isAuthenticatedUser);
      if (!isAuthenticatedUser) {
        // navigate('/');
      }
    }
  };

  return (
    <Fragment>
      {!loading && (
        <div className="m-5 row justify-content-center">
          <div onClick={() => navigate('/')} className="col-1 w-100">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="col-11 card mt-5 p-2 d-flex justify-content-center align-items-center ">
            <img
              height={'250px'}
              width={'250px'}
              style={{borderRadius:"50%"}}
              src={user?.avatar ? user.avatar : '/unknown.png'}
              className=" rounded-circle mt-3"
              alt="..cakee."
            />
            <div className="card-body mt-2 p-2">
              <h5 className="card-title">{user?.name}</h5>
              <p className="card-text">{user?.email}</p>
              <p className="card-text">{user?._id}</p>
            </div>
            <ul className="list-group list-group-flush d-flex justify-content-center align-items-center">
              <li className="list-group-item">Gender: {user?.gender}</li>
              <li  onClick={handleLogout} className="list-group-item text-primary">
                logout  <i className="fa-solid fa-right-from-bracket"></i>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Footer />
    </Fragment>
  );
};

export default Profile;
