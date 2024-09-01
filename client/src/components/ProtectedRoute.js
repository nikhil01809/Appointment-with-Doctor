import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';

const ProtectedRoute = ({children}) => {
  const dispatch=useDispatch();
  const {user}=useSelector(state=>state.user)
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        localStorage.clear();
        <Navigate to="/login" />;
        
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
      localStorage.clear();
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user,getUser]);
  if(localStorage.getItem("token"))  return children;
  else{
   return <Navigate to="/login"/>;
  }
}

export default ProtectedRoute;
