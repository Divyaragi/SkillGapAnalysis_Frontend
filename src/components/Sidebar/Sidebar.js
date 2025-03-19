import React, { useState } from 'react';
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
import logoImage from '../../assets/sidebar_logo.png'
const Navbar = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const handleIconClick = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);
    };

    return (
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
                    {/* <MenuItem icon={<PlaylistAddCheckIcon />}>
                        {sidebarTextSamples.CHECK_LIST}
                        </MenuItem>
                   */}
                    <div>
                    </div>
                </Menu>
            </Sidebar>
        </div>
    );
};

export default Navbar;

