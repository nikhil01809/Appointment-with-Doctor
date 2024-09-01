import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Table, message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Appointments = () => {
    const [appoinments,setAppointments]=useState([]);
    const {user}=useSelector(state=>state.user);
    const getAppointments=async()=>{
        try{
            const result=await axios.get("/api/v1/user/appointments",{
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
    const column=[
        {
            title:"ID",
            dataIndex:"_id"
        },
        {
            title:"Doctor Name",
            dataIndex:"name",
            render:(text,record)=>(
                <span>Dr. {record.doctorInfo.firstname && record.doctorInfo.firstname.toUpperCase()} {record.doctorInfo.lastname && record.doctorInfo.lastname.toUpperCase()}</span>
            )
        },
        {
            title:"Phone",
            dataIndex:"phone",
            render:(text,record)=>(
                <span>{record.doctorInfo.phone} </span>
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
        }
    ]
  return (
    <Layout>
        <h1>APPOINTMENTS</h1>
        <Table columns={column} dataSource={appoinments}/>
    </Layout>
  )
}

export default Appointments
