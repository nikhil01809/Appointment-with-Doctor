import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

const BookingPage = () => {
    const params=useParams();
    const [doctor,setDoctor]=useState();
    const [date,setDate]=useState();
    const [time,setTime]=useState();
    const [isAvailable,setIsAvailable]=useState(false);
    const {user}=useSelector(state=>state.user)
    const [userd,setUserd]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    // const getUser=async()=>{
    //   try{
    //     console.log("doctor",doctor);
    //     const result=await axios.post('/api/v1/user/getUser2',{userdId:doctor?.userId},{
    //       headers:{
    //         Authorization:`Bearer ${localStorage.getItem('token')}`
    //     }
    //     })
    //     if(result.data.success){
    //       setUserd(result.data.data);
    //       console.log(result.data.data);
    //       console.log(userd);
    //     }
    //   }
    //   catch(error){
    //     console.log(error);
    //   }
    // }
    const getDoctorData = async () => {
        try {
          const res = await axios.post(
            "/api/v1/doctor/getDoctorById",
            { doctorId: params.doctorId },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          if (res.data.success) {
            setDoctor(res.data.data);
            console.log(doctor)
            //  getUser();
          }
    
        } catch (error) {
          console.log(error);
        }
      };
      
      const handleBooking=async()=>{
        try{
          if(!date && !time){
            return alert("date & time required");
          }
            dispatch(showLoading())
            const result=await axios.post('/api/v1/user/book-appointment',{
                doctorId:params.doctorId,
                userId:user._id,
                doctorInfo:doctor,
                userInfo:user,
                date:date,
                time:time,
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(result.data.success){
                message.success(result.data.message);
                navigate('/appointments')
            }
        }
        catch(error){
            console.log(error);
            dispatch(hideLoading())
            message.error("something went error")
        }
      }
      const handleAvailable=async()=>{
        try{
          dispatch(showLoading);
          const result = await axios.post('/api/v1/user/checkavailability',{doctorId:params.doctorId,date,time,doctorInfo:doctor},{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })
          dispatch(hideLoading);
          if(result.data.success){
            setIsAvailable(true);
            message.success("SLOT AVAILABLE")
          }
          else{
            message.success(result.data.message)
          }
        }
        catch(error){
          dispatch(hideLoading);
          console.log(error);
          message.error("something went wrong");
        }
      }
 useEffect(()=>{
  getDoctorData();

 },[])
  return (
    <Layout>
        <h3 style={{textAlign:"center"}}>BOOKING PAGE</h3>
        <div style={{display:"flex"}}>
        <div style={{margin:"1px",textAlign:"center" ,color:"indigo"}}>
            {doctor?.profileImage===""?(<i className="fa-solid fa-address-card" ></i>)
            :(<img src={doctor?.profileImage}   style={{ width:"150px",height:"150px",borderRadius: "50%",margin:"5px",marginTop:"45px"}}></img>)}
</div>
       <div style={{width:"800px"}}>
       
       
        <div className='container m-5'>
            {doctor && (<div>
                <h4>Dr. {doctor && doctor.firstname.toUpperCase()} {doctor && doctor.lastname.toUpperCase()}</h4>
                <h4>Fees: RS {doctor.feesPerCunsalation}</h4>
                <h4>Timing: {doctor?.timing[0]}-{doctor?.timing[1]}</h4>
                <div className='d-flex flex-column w-50'>
                    <DatePicker  className="m-2" format="DD-MM-YYYY"
                    onChange={(value)=>{
                      setIsAvailable(false);
                      if(value) setDate(moment(value)?._i.format("DD-MM-YYYY"))}}/>
                     <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
                onChange={(value) => {
                  setIsAvailable(false);
                  if(value) setTime(moment(value)?._i.format("HH:mm"));
                }}
              />
              
                    <button className='btn btn-primary m-2' onClick={handleAvailable}>
                        Check Availability
                    </button>
                   { isAvailable && <button className='btn btn-dark m-2' onClick={handleBooking}>
                       BOOK NOW
                    </button>}
                     </div>
           </div> )}
        </div>
        </div>
        <div className='card' style={{width:"300px",minHeight:"50px",marginRight:"20px"}}>
          <h4 className='card-header' style={{textAlign:"center"}}>DOCTOR PROFILE</h4>
          <div className='card-Body' >
            <p className='m-3'><b>NAME</b>: {doctor && doctor.firstname.toUpperCase()} {doctor && doctor.lastname.toUpperCase()}</p>
            <p className='m-3'><b>EMAIL</b>: {doctor?.email}</p>
            <p className='m-3'><b>PHONE</b>: {doctor?.phone}</p>
            {doctor?.website && <p className='m-3'><b>WEBSITE</b>: {doctor?.website}</p>}
            <p className='m-3'><b>ADDRESS</b>: {doctor?.address}</p>
            <p className='m-3'><b>SPECIALIZATION</b>: {doctor?.specialization}</p>
            <p className='m-3'><b>EXPERIENCE</b>: {doctor?.experience}</p>
            <p className='m-3'><b>DURATION</b>: 30 MINUTES</p>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default BookingPage
