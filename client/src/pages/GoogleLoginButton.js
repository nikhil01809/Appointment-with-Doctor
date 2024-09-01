// GoogleLoginButton.js

import React ,{useEffect} from 'react';
import { Button, message } from 'antd';
import axios from 'axios';
import { useNavigate ,useParams} from 'react-router-dom';
import Layout from '../components/Layout';
const GoogleLoginButton = () => {
  const params=useParams();
  const navigate=useNavigate();
//   useEffect(() => {
//     const token=params.token;
//     console.log(token)
//     if(token){
//       localStorage.setItem('token', token);
//       console.log(token);
//     }
//     window.location.reload();
// }, []);
const getToken=async()=>{
  try{
    const result=await axios.post("/api/v1/user/gettoken");
    if(result.data.success){
      localStorage.setItem("token",result.data.token);
      navigate('/');
      window.location.reload();
    }
  }
  catch(error){
    message.error("something went wrong")
    console.log(error);
    }
}
useEffect(()=>{
  getToken();
},[])
  return (
    <Layout></Layout>
  );
};

export default GoogleLoginButton;
