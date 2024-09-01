import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import DoctorList from '../components/DoctorList';
import { Row } from 'antd';
const Home = () => {
  const [doctors,setDoctors]=useState([]);
 const getDoctorData=async()=>{
    try{  
      const result=await axios.get("/api/v1/user/getAllDoctors ",{
        headers:{
          Authorization:"Bearer "+localStorage.getItem('token'),
        }
      })
      if(result.data.success){
        setDoctors(result.data.data);
      }
    }
    catch(error){
     console.log(error);
    }
 }
 useEffect(()=>{
  getDoctorData();
 },[])
  return (
   <Layout>
    <h1 style={{textAlign:"center"}}>DOCTOR AVAILABLE</h1>
    <Row>{doctors && doctors.map((doctor,ind)=> <DoctorList key={ind} doctor={doctor}/>)}</Row>
   </Layout>
  )
}

export default Home
