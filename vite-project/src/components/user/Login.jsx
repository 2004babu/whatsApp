import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../../Actions/authActions";
import { toast } from "react-toastify";
import { clearError } from "../../Slices/authSlice";

const Login = () => {
  const navigate=useNavigate()
  const {
    user = {},
    loading = false,
    isAuthenticatedUser = false,
    error = null,
  } = useSelector((state) => state.authState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    dispatch(login({ email, password }));
    // console.log({ email, password });
  };

  useEffect(() => {
    if ( isAuthenticatedUser) {
      
      navigate('/')
    }
    if (error) {
      toast.error(error, {
        onOpen: () => {
          dispatch(clearError());
        },
      });
    }
  }, [isAuthenticatedUser, error, dispatch]);
  return (
    <div className=" h-100 row justify-content-center align-items-center">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <h2 className="text-center m-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-5">
              <label className="from-label" htmlFor="loginemail">
                Email
              </label>
              <input
                id="loginemail"
                type="email"
                className="form-control p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="from-label" htmlFor="loginpassword">
                Password
              </label>
              <input
                id="loginpassword"
                type="password"
                className="form-control p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="row">
              <Link
                to={"/register"}
                className=" color-secondary mt-2 link-opacity-100-hover"
              >
                {" "}
                new User
              </Link>
              <div className="row justify-content-center align-items-center">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary btn-block col-3 mt-3"
                >
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

export default Login;
