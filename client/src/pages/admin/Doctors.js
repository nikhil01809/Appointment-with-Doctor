import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import { Table, message } from 'antd';
const Doctors = () => {
    const [doctors,setDoctors]=useState([]);
    const getDoctors=async()=>{
      try{
        const result=await axios.get('/api/v1/admin/getAllDoctors',{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        if(result.data.success){
          setDoctors(result.data.data.reverse());
        }
      }
      catch(error){
        console.log(error);
        message.error("something went wrong")
      }
    }
    const handleDeleteDoctor=async(record)=>{
      try{
        // console.log(record._id);
        const result=await axios.post('/api/v1/admin/delete-doctor',{doctorId:record._id,userId: record.userId},{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        if(result.data.success){
          message.success(result.data.message);
          getDoctors();
        }
      }
      catch(error){
        console.log(error)
        message.error("something went wrong")
      }
    }
    const handleAccountStatus = async (record, status) => {
      try {
        const res = await axios.post(
          "/api/v1/admin/changeAccountStatus",
          { doctorId: record._id, userId: record.userId, status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          message.success(res.data.message);
          getDoctors();
        }
      } catch (error) {
        message.error("Something Went Wrong");
        console.log(error);
      }
    };
    useEffect(()=>{
      getDoctors();
    },[])
    const columns = [
      {
          title: 'Name',
          dataIndex: "name",
          render:(text,record)=>(
            <span>{record.firstname.toUpperCase()} {record.lastname.toUpperCase()}</span>
          )
      },
      {
          title: "Status",
          dataIndex: "status",
          render: (text, record) => (
              <span>{record.status}</span>
          )
      },
      {
        title: 'Phone',
        dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <div className='d-flex'>
            <button
              className="btn btn-success m-2"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
            <button className="btn btn-danger m-2"  onClick={() => handleAccountStatus(record, "rejected")}>Reject</button>
            </div>
          ) : (
            record.status === "approved" ?(<button className="btn btn-danger"  onClick={() => handleAccountStatus(record, "block")}>Block</button>)
            :(record.status==="block"?(<div className='d-flex'><button className="btn btn-primary" style={{height:"45px"}}  onClick={() => handleAccountStatus(record, "approved")}>UnBlock</button>
            <button className="btn btn-danger m-2"  onClick={() => handleDeleteDoctor(record)}>Delete</button></div>)
            :(<button className="btn btn-danger m-2"  onClick={() => handleDeleteDoctor(record)}>Delete</button>))
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
        <h1 style={{ textAlign: "center" }}>DOCTOR LIST</h1>
            <Table columns={columns} dataSource={doctors} />
    </Layout>
  )
}

export default Doctors
