import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {register}from '../../Actions/authActions'
import {toast }from 'react-toastify'
import { clearError } from '../../Slices/authSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Register = () => {

  const {
    user = {},
    loading = false,
    isAuthenticatedUser = false,
    error = null,
  } = useSelector((state) => state.authState);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  // console.log(gender);

  const navigate=useNavigate()
const dispatch=useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
 const fromdata=new FormData()

 fromdata.append('name',name)
 fromdata.append('email',email)
 fromdata.append('password',password)
 fromdata.append('confirmPassword',confirmPassword)
 fromdata.append('gender',gender)
 fromdata.append('avatar',avatar)



    dispatch(register(fromdata))
  };

  const handlefiles=async(e)=>{
    const file=e.target.files[0];

    const reader=new FileReader()
    reader.onload=()=>{
      if (reader.readyState===2) {
        setAvatarPreview(reader.result)
        setAvatar(file)
      }
    }
 await   reader.readAsDataURL(file)
    // console.log(e.target.files[0]);
  }
useEffect(()=>{
if(isAuthenticatedUser){
  toast.success('Register Success')
  navigate('/')
}
if(error){
  toast.error(error,{onOpen:()=>{
    dispatch(clearError())
  }})
}
},[error,isAuthenticatedUser,dispatch])
// console.log(isAuthenticatedUser);


  return (
    <div className="h-100 row justify-content-center align-items-center p-4 m-1">
      <div className="row justify-content-center border">
        <div className="col-md-6 p-2">
          <h2 className="text-center m-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="from-group mt-2">
              <label>Name</label>
              <input
                type="text"
                className="form-control p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="from-group mt-2">
              <label>Email</label>
              <input
                type="email"
                className="form-control p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="from-group mt-2">
              <label>Password</label>
              <input
                type="password"
                className="form-control p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="from-group mt-2">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control p-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

          <div className="w-100 row form-gruop mt-3">
            {/* <label htmlFor="registeruploadFile">Choose File</label> */}
            <input type="file"className='form-control p-2 col-8' accept='png' onChange={(e)=>handlefiles(e)}  />
            <figure className="figure col-4 m-0 mt-1">
              <img src={avatarPreview} height={'50px'} width={'50px'} alt="preview image" className="figure-img img rounded" />
            </figure>
          </div>

            <div className="form-check m-2 p-2 ms-2">
              <input
                id='maleCheckBox'
                type="checkbox"
                className="form-check-input"
                
                checked={gender==="Male"}
                onChange={e=>setGender('Male')}
              />
              <label htmlFor='maleCheckBox' className='form-check-label'>Male</label>
            </div>
            <div className="form-check m-2 p-2 ms-2">
              <label htmlFor='famaleCheckbox' className='form-check-label'>Female</label>
              <input
                type="checkbox"
                id='famaleCheckbox'
                className="form-check-input"
                checked={gender==='Female'}
                onChange={e=>setGender('Female')}                
              />
            </div>
           
            <div className="row">
           <Link to={'/login'} className=' color-secondary mt-2 link-opacity-100-hover text-end' > login</Link>
            <div className="row justify-content-center align-items-center">
            <button  type="submit" className="btn btn-primary btn-block col-3 mt-3">
              Submit
            </button>
            </div>
           </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
