import { Fragment, useEffect, useState } from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import AllChat from "./components/pages/AllChat";
import { io } from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/user/Profile";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/authActions";
import Chat from "./components/pages/Chat";
import Status from "./components/pages/Status";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispacth = useDispatch();
  const {
    user = {},
    loading = false,
    isAuthenticatedUser = false,
    error = null,
  } = useSelector((state) => state.authState);

  useEffect(() => {
    if (!isAuthenticatedUser) {
      dispacth(loadUser);
    }
  }, [isAuthenticatedUser, dispacth]);

  return (
    <Fragment>
        <ToastContainer/>
      <Routes>
          <Route
            path="/"
            element={isAuthenticatedUser ? <AllChat /> : <Login />}
          />
          <Route
            path="/login"
            element={ <Login />}
          />
          <Route
            path="/profile"
            element={isAuthenticatedUser ? <Profile /> : <Login />}
          />
          <Route
            path="/register"
            element={!isAuthenticatedUser ? <Register /> : <AllChat />}
          />
          <Route
            path="/chat/:id"
            element={isAuthenticatedUser ? <Chat /> : <Login />}
          />
          <Route
            path="/upload/status"
            element={isAuthenticatedUser ? <Status /> : <Login />}
          />
      </Routes>
       
    </Fragment>
  );
}

export default App;
