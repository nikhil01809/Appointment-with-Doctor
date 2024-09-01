import React from 'react'
import "../styles/LayoutStyle.css";
import { userMenu,adminMenu } from '../Data/data';
import { Link ,useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message,Badge } from 'antd';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
const Layout = ({children}) => {
  const navigate=useNavigate();
  const location=useLocation();
  const dispatch=useDispatch();
  const {user}=useSelector(state=>state.user);
  const doctorMenu=[
    {
        name:"HOME",
        path:"/",
        icon:"fa-solid fa-house"
    },
    {
        name:"APPOINTMENTS",
        path:"/doctor-appointment",
        icon:"fa-regular fa-calendar-check"
    },
    {
      name:"PROFILE",
      path:`/profile`,
      icon:"fa-solid fa-user"
  },
    {
        name:"MANAGE PROFILE",
        path:`/doctor/profile/${user?._id}`,
        icon:"fa-solid fa-user"
    }
    
]
  const SideBarMenu=user?.isAdmin 
  ? adminMenu
  :user?.isDoctor 
  ?doctorMenu
  :userMenu;
  const handleLogout=async ()=>{
    
    try{
      const result=await axios.get('/api/v1/user/logout',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(result.data.success){
        localStorage.clear();
        message.success('Logout successfully');
        navigate('/login');
      }
    }
    catch(error){
      console.log(error);
    }
   
  }
  
  return (
    <div className='main'>
    <div >
      <div>
        <div className='layout'>
            <div className='sidebar'>
                <div className='logo' style={{color:"black"}}><h6>MedEase APP</h6></div>
                <hr/>
                <div className='menu'>{SideBarMenu.map(menu=>{
                  const isactive=location.pathname===menu.path;
                  return(
                    <>
                    <div className={` ${isactive && 'active'} menu-item`}>
                    <i className={menu.icon} style={{marginLeft:"5px",fontSize:"1.2rem"}}></i>
                      <Link to={menu.path} >{menu.name}</Link>
                    </div>
                    </>
                  )
                })}
                <div className='menu-item' onClick={handleLogout}>
                  <i className='fa-solid fa-right-from-bracket'></i>
                  <Link to='/login'>LOGOUT</Link>
                </div>
                </div>
            </div>
            <div className='content'>
                <div className='header'>
                  <div className='header-content'>
                  <Badge count={user && user.notification.length}>
                  <i className="fa-solid fa-envelope" onClick={()=>{navigate('/all-notification')}} style={{cursor:"pointer"}}></i>
    </Badge>
    <Link to='/profile'>{user?.name}</Link>
    <div>{user?.profileImage===""?(<i className="fa-solid fa-user" onClick={()=>navigate('/upload-image')} style={{ cursor:"pointer"}}></i>)
    :(<img src={user?.profileImage} style={{ cursor:"pointer" ,width:"50px",height:"50px",borderRadius: "50%",marginTop:"10px"}} onClick={()=>navigate('/upload-image')}></img>)}</div>
                  
                  </div>
                </div>
                <div className='body'>{children}</div>
               
            </div>
        </div>
        <div className='footer'>
          <div style={{display:"flex",height:"10vh" ,backgroundColor:"white"}}>
          <i className="fa-sharp fa-solid fa-hospital" style={{fontSize:"2rem",margin:"20px"}}></i>
            <h2 style={{margin:"10px",marginLeft:"100px"}}>CONTACT US</h2>
          </div>
          <div style={{display:"flex",marginLeft:"30px"}}>
            <div style={{color:"white",marginLeft:"40px"}}>
            <div style={{margin:"30px",marginBottom:"5px",fontSize:"1.4rem",textDecoration:"underline"}}>HELPINE NO</div>
            <div style={{marginLeft:"30px"}}>234-66780977</div>
            <div style={{marginLeft:"30px"}}>456-78987543</div>
            </div>
            <div style={{color:"white",marginLeft:"60px"}}>
              <div style={{margin:"30px",marginBottom:"5px",fontSize:"1.4rem",textDecoration:"underline"}}>EMAIL</div>
              <div style={{marginLeft:"30px"}}>docapp@gmail.com</div>
              <div style={{marginLeft:"30px"}}>dochelpline@gmail.com</div>
            </div>
            <div style={{color:"white",marginLeft:"60px"}}>
            <div style={{margin:"30px",marginBottom:"5px",fontSize:"1.4rem",textDecoration:"underline"}}>MEMBERSHIP</div>
              <div style={{marginLeft:"30px"}}>BILL GATES</div>
              <div style={{marginLeft:"30px"}}>MUKESH AMBANI</div>
            </div>
            <div style={{color:"white",marginLeft:"500px",marginTop:"90px"}}><h3>MedEase APP</h3></div>
          </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Layout
