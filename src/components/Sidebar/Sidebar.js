import React, { useState,useCallback,useEffect } from 'react';
import "./Sidebar.css"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GroupIcon from '@mui/icons-material/Group';
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { sidebarTextSamples } from '../../utils/constants';
import myImage from '../../assets/images/prospect.png';
import logoImage from '../../assets/sidebar_logo.png';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
    const [roleId, setRoleId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [roleData, setroleData] = useState([]);
      const [userData, setUserData] = useState({ name: "", email: "" });
    
    const handleIconClick = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);
    };
     useEffect(() => {
        const token = Cookies.get("result"); 
        if (token) {
          try {
            const decodedToken = jwtDecode(token);        
            setUserData({
              name: decodedToken.name,
              email: decodedToken.upn || decodedToken.email || "No Email", 
            });
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        }
      }, []);
      console.log("userData**********sidebar",userData);
      useEffect(() => {
        if (userData.email) { // ✅ Ensure email is available before calling API
            fetchRoles();
        }
    }, [userData.email]); // 🔄 Runs only when email is updated
    
    const fetchRoles = useCallback(async () => {
        try {
          const response = await fetch(
            `http://localhost:3002/fetch-users-by-emailID?email=${userData.email}`,
            {
              method: "GET",
            }
          );
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const result = await response.json();
          console.log("result********sidebar", result);
    
          if (result.success && result.data) {
            setRoleId(result.data.role_id); // Store role_id
            console.log("Role ID:", result.data.role_id);
          }
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      }, [userData.email]);
    
      useEffect(() => {
        fetchRoles();
      }, [fetchRoles]);
    console.log("setroleData*********side",roleId);

    return (
        <>
        {roleId == 1 ?(
        <div className='sidebar-main-container'>
            <Sidebar className="sidebar-container" collapsed={sidebarCollapsed} >
                <Menu   menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            if (level === 0) {
                                return {
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#7393a7',
                                        color : 'white' 
                                    },
                                    ...(active && {
                                        backgroundColor: '#eecef9', 
                                    }),
                                };
                            }
                        },
                    }}>
                    <MenuItem className='first-menu-item' icon={<MenuRoundedIcon />} 
                    onClick={handleIconClick} >
                        <img src={logoImage} alt="Menu Icon"  />
                    </MenuItem>
                    {/* <MenuItem icon={<GridViewRoundedIcon />} 
                    onClick={() => handleNavigation('/dashboard')}>
                        {sidebarTextSamples.DASHBOARD}
                    </MenuItem> */}
                    <MenuItem  className='first-menu-item' icon={<ReceiptRoundedIcon />} 
                    onClick={() => handleNavigation('/skills')}
                    >
                        {sidebarTextSamples.SKILLL}
                    </MenuItem>
                    
                    <MenuItem className='first-menu-item' icon={<GroupIcon />}
                     onClick={() => handleNavigation('users')}
                     >
                        {sidebarTextSamples.USER}</MenuItem>
                        {/* <MenuItem className='first-menu-item' icon={<PlaylistAddCheckIcon />}
                     onClick={() => handleNavigation('ratings')}
                     >
                        {sidebarTextSamples.RATINGS}</MenuItem> */}
                        <MenuItem className='first-menu-item' icon={<PlaylistAddCheckIcon />}
                     onClick={() => handleNavigation('Tranings')}
                     >
                        {sidebarTextSamples.TRAINIGS}</MenuItem>
                  
                    <div>
                    </div>
                </Menu>
            </Sidebar>
        </div>
        ):(<> <div className='sidebar-main-container'>
            <Sidebar className="sidebar-container" collapsed={sidebarCollapsed} >
                <Menu   menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            if (level === 0) {
                                return {
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#7393a7',
                                        color : 'white' 
                                    },
                                    ...(active && {
                                        backgroundColor: '#eecef9', 
                                    }),
                                };
                            }
                        },
                    }}>
                    <MenuItem className='first-menu-item' icon={<MenuRoundedIcon />} 
                    onClick={handleIconClick} >
                        <img src={logoImage} alt="Menu Icon"  />
                    </MenuItem>
                    {/* <MenuItem icon={<GridViewRoundedIcon />} 
                    onClick={() => handleNavigation('/dashboard')}>
                        {sidebarTextSamples.DASHBOARD}
                    </MenuItem> */}
                    <MenuItem className='first-menu-item' icon={<GroupIcon />}
                     onClick={() => handleNavigation('users')}
                     >
                        {sidebarTextSamples.USER}</MenuItem>
                        {/* <MenuItem className='first-menu-item' icon={<PlaylistAddCheckIcon />}
                     onClick={() => handleNavigation('ratings')}
                     >
                        {sidebarTextSamples.RATINGS}</MenuItem> */}
                        <MenuItem className='first-menu-item' icon={<PlaylistAddCheckIcon />}
                     onClick={() => handleNavigation('Tranings')}
                     >
                        {sidebarTextSamples.TRAINIGS}</MenuItem>
                  
                    <div>
                    </div>
                </Menu>
            </Sidebar>
        </div></>)}
        </>
    );
};

export default Navbar;

