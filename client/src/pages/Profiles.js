import React,{useState} from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const Profiles = () => {
    const {user}=useSelector(state=>state.user);
    const navigate=useNavigate();
   
  return (
    <Layout>
        <div >
        <div >
        <h1 style={{textAlign:"center"}}><b>PROFILE</b></h1>

        <div style={{margin:"5px", fontSize:"150px",textAlign:"center" ,color:"indigo"}}>
            {user?.profileImage===""?(<i className="fa-solid fa-address-card" style={{ cursor:"pointer"}} onClick={()=>navigate('/upload-image')}></i>)
            :(<img src={user?.profileImage}   style={{ cursor:"pointer" ,width:"250px",height:"250px",borderRadius: "50%"}} onClick={()=>navigate('/upload-image')}></img>)}
</div>
        </div>

        <div><h3 style={{textAlign:"center"}}>Hi, {user?.name.toUpperCase()}</h3></div>
        <h2 style={{textAlign:"center" ,marginTop:"30px"}}> {user?.email}</h2>
        
        <div style={{ display: "flex", justifyContent: "center" ,margin:"50px"}}>
    <div className='card' style={{ width: "300px", marginBottom :"20px"}}>
        <div className='card-header'><h5 style={{ textAlign: "center" }}>Basic Details</h5></div>
        <div className='card-content' style={{ textAlign: "center" }}>
            <p><b>DOCTOR:</b> {user?.isDoctor? "Yes":"No"}</p>
            <p><b>ADMIN:</b> {user?.isAdmin? "Yes":"No"}</p>
           {user?.isDoctor && <p style={{cursor:"pointer" ,color:"blue"}} onClick={()=>navigate(`/doctor/profile/${user?._id}`)}> SEE MORE...</p>}
        </div>
    </div>
</div>
</div>

    </Layout>
  )
}

export default Profiles
