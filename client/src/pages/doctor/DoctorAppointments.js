import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux';
import { Table, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
const DoctorAppointments = () => {
    const [appoinments,setAppointments]=useState([]);
    const {user}=useSelector(state=>state.user);
    const getAppointments=async()=>{
        try{
            const result=await axios.get("/api/v1/doctor/doctor-appointment",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(result.data.success){
                setAppointments(result.data.data.reverse())
                
            }
        }
        catch(error){
            console.log(error);
            message.error("Something went wrong");
        }
    }
    useEffect(()=>{
        getAppointments();
    },[])
    const handleStatus=async(record,status)=>{
        try{
            const result=await axios.post("/api/v1/doctor/update-status",{appointmentsId:record._id,status,record},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(result.data.success){
                message.success(result.data.message)
                getAppointments();
            }
            else{
                message.success(result.data.message)
            }
        }
        catch(error){
            console.log(error);
            message.error("something went wrong")
        }
    }
    const handleDelete=async(record)=>{
        try{
            const result=await axios.post("api/v1/doctor/delete-appointment",{appointmentsId:record._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(result.data.success){
                message.success(result.data.message)
                getAppointments();
            }
        }
        catch(error){
            message.error("Something went wrong");
            console.log(error);
        }
    }
    const column=[
        {
            title:"ID",
            dataIndex:"_id"
        },
        {
            title:"Patient Name",
            dataIndex:"name",
            render:(text,record)=>(
                <span> {record.userInfo.name && record.userInfo.name.toUpperCase()}</span>
            )
        },
       
        {
            title:"Date",
            dataIndex:"date",
            render:(text,record)=>(
                <span>{moment(record.date).format("DD-MM-YYYY")} </span>
            )
        },
        {
            title:"Time",
            dataIndex:"time",
            render:(text,record)=>(
                <span>{moment(record.time).format("HH-mm")} </span>
            )
        },
        {
            title:"Status",
            dataIndex:"status"
        },
        {
            title:"Action",
            dataIndex:"action",
            render:(text,record)=>(
                <div className='d-flex'>
                    {record.status==="pending" ? (
                        <div className='d-flex'>
                            <button className='btn btn-primary m-2' onClick={()=>handleStatus(record,"approved")}>Approved</button>
                            <button className='btn btn-danger m-2' onClick={()=>handleStatus(record,"reject")}>Reject</button>
                        </div>
                    ):(<div className='d-flex'>
                        {record.status==="completed" || record.status==="reject"  ?
                        (<div className='d-flex'> 
                        <button className='btn btn-danger m-2' onClick={()=>handleDelete(record)}>Delete</button></div>)
                        :(<div className='d-flex'> 
                        <button className='btn btn-primary m-2' onClick={()=>handleStatus(record,"completed")}>Completed</button></div>)}
                   
                </div>)}
                </div>
            )
        }
    ]
  return (
   <Layout>
     <h1 style={{textAlign:"center"}}>APPOINTMENTS</h1>
        <Table columns={column} dataSource={appoinments}/>
   </Layout>
  )
}

export default DoctorAppointments
