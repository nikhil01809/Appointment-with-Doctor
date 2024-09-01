import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Table, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';

const Users = () => {
    const [users, setUsers] = useState([]);
    const dispatch=useDispatch();

    const getUsers = async () => {
        try {
            const res = await axios.get("/api/v1/admin/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                setUsers(res.data.data.reverse());
            }
            console.log(users);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);
    const handleDelete=async(record)=>{
        try{
            dispatch(showLoading);
            const result =await axios.post("/api/v1/admin/delete-user",{usId:record._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading);
            if(result.data.success){
                message.success(result.data.message);
                getUsers();
            }
        }
        catch(error){
            dispatch(hideLoading)
            console.log(error);
            message.error("something went wrong");
        }
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: "name"
        },
        {
            title: 'Email',
            dataIndex: "email",
        },
        {
            title: "Doctor",
            dataIndex: "isDoctor",
            render: (text, record) => (
                <span>{record.isDoctor ? 'Yes' : 'No'}</span>
            )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className='d-flex'>
                    <button className='btn btn-danger' onClick={()=>handleDelete(record)}>Block</button>
                </div>
            )
        }
    ];

    return (
        <Layout>
            <h1 style={{ textAlign: "center" }}>USER LIST</h1>
            <Table columns={columns} dataSource={users} />
        </Layout>
    );
}

export default Users;
