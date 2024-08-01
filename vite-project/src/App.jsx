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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductedRoute from "../ProductedRoute";
import { SocketPrivider } from "./Context/SocketPrivider";
import { HelmetProvider } from "react-helmet-async";
import UploadStatus from "./components/StatusPages/UploadStatus";
import AllStatus from "./components/StatusPages/AllStatus";
import ViewStatus from "./components/StatusPages/ViewStatus";
import ProtectedRoute from "../ProductedRoute";
import AddRequest from "./components/pages/AddRequest";
import { StatusProvider } from "./Context/StatusProvider";
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
      <ToastContainer />
      <BrowserRouter>
        <SocketPrivider>
          <StatusProvider>
            <HelmetProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <AllChat />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/profile"
                  element={
                    <ProductedRoute>
                      <Profile />
                    </ProductedRoute>
                  }
                />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/chat/:id"
                  element={isAuthenticatedUser ? <Chat /> : <Login />}
                />
                <Route
                  path="/upload/status"
                  element={isAuthenticatedUser ? <UploadStatus /> : <Login />}
                />
                <Route
                  path="/allstatus"
                  element={isAuthenticatedUser ? <AllStatus /> : <Login />}
                />
                <Route
                  path="/viewstatus/:id"
                  element={isAuthenticatedUser ? <ViewStatus /> : <Login />}
                />
                <Route
                  path="/addrequest"
                  element={isAuthenticatedUser ? <AddRequest /> : <Login />}
                />
              </Routes>
            </HelmetProvider>
          </StatusProvider>
        </SocketPrivider>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
