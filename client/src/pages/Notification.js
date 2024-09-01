import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Notification = () => {
    const {user}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate;
    const handleMarkAllRead = async () => {
        try {
          // dispatch(showLoading());
          const res = await axios.post(
            "/api/v1/user/all-notification",
            {
              userId: user._id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          // dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.message);
            // navigate('/all-notification');
            window.location.reload()
          } else {
            message.error(res.data.message);
          }
        } catch (error) {
          // dispatch(hideLoading());
          console.log(error);
          message.error("somthing went wrong");
        }
      };
    const handleDeleteAllRead=async()=>{
        try{
            dispatch(showLoading);
            const result=await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading);
            if(result.data.success){
                message.success(result.data.message);
                // navigate('/all-notification');
                window.location.reload()
              
            }
        }
        catch(error){
            dispatch(hideLoading);
            console.log(error);
            message.error("something went wrong");
        }
    }
  return (
    <Layout>
        <h3 className='m-4' style={{textAlign:"center"}}>NOTIFICATION PAGE</h3>
        <Tabs>
            <Tabs.TabPane tab="UnRead" key={0}>
                <div className='d-flex justify-content-end'>
                    <h4 className='p-2' onClick={handleMarkAllRead} style={{cursor:"pointer" ,color:"blue"}}>MARK ALL READ</h4>
                </div>
                {
                    user?.notification.slice().reverse().map((notificationmsg)=>(
                        <div className='card' onClick={notificationmsg.onClickPath}>
                            <div>{notificationmsg.message}</div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read" key={1}>
                <div className='d-flex justify-content-end'>
                    <h4 className='p-2' onClick={handleDeleteAllRead} style={{cursor:"pointer" ,color:"blue"}}>Delete ALL READ</h4>
                </div>
                {
                    user?.seennotification.slice().reverse().map((notificationmsg)=>(
                        <div className='card' onClick={notificationmsg.onClickPath}>
                            <div>{notificationmsg.message}</div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default Notification
