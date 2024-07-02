import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../layouts/Footer';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const {
    user = {},
    loading = false,
    isAuthenticatedUser = false,
    error = null,
  } = useSelector((state) => state.authState);
  
  // console.log(user);
  return (
    <Fragment>
      {!loading&&<div className=" m-5  row justify-content-center">
        <div onClick={()=>navigate('/')} className="col-1 w-100"><i className="fa-solid fa-arrow-left"></i></div>
        <div className="col-11 card mt-5 p-2 w-100" >
          <img height={'50%'} width={'50%'} src={user?.avatar?user.avatar:'/unknown.png'} className="card-img-top rounded-circle" alt="..cakee."/>
          <div className="card-body ">
            <h5 className="card-title">{user?.name}</h5>
            <p className="card-text">{user?.email}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Gender: {user?.gender}
            </li>
            {/* <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li> */}
          </ul>
        </div>
      </div>}
      <Footer/>
    </Fragment>
  )
}

export default Profile
