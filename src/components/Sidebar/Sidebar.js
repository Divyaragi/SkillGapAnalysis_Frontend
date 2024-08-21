import React, { useState } from 'react';
import "./Sidebar.css"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from 'react-router-dom';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { sidebarTextSamples } from '../../utils/constants';
const Navbar = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const handleIconClick = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };
    return (
        <div className='sidebar-main-container'>
            <Sidebar className="sidebar-container" collapsed={sidebarCollapsed} >
                <Menu menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        if (level === 0) {
                            return {
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#7393a7',
                                    color: 'white'
                                },
                                ...(active && {
                                    backgroundColor: '#eecef9',
                                }),
                            };
                        }
                    },
                }}>
                    <MenuItem className='first-menu-item' icon={<MenuRoundedIcon />} onClick={handleIconClick} >
                        {sidebarTextSamples.BILVANTIS_TEXT}
                    </MenuItem>
                    <Link to="/dashboard" className='navigation'>
                        <MenuItem icon={<GridViewRoundedIcon />}>
                            {sidebarTextSamples.DASHBOARD}
                        </MenuItem></Link>
                    <Link to="/userdashboard" className='navigation'>
                        <MenuItem icon={<PersonAddAltIcon />}>
                            {sidebarTextSamples.USER_LIST}
                        </MenuItem>
                    </Link>
                    <Link to="/dashboard" className='navigation'>
                        <MenuItem icon={<ReceiptRoundedIcon />} >
                            {sidebarTextSamples.PROFILE}
                        </MenuItem>
                    </Link>
                    <Link to="/dashboard" className='navigation'>
                        <MenuItem icon={<NoteAddRoundedIcon />}>
                            {sidebarTextSamples.PULL_REQUEST}
                        </MenuItem>
                    </Link>
                    <Link to="/dashboard" className='navigation'>
                        <MenuItem icon={<PreviewRoundedIcon />}>
                            {sidebarTextSamples.REVIEW}
                        </MenuItem>
                    </Link>
                    <Link to="/dashboard" className='navigation'>
                        <MenuItem icon={<CommentRoundedIcon />}>
                            {sidebarTextSamples.COMMENTS}
                        </MenuItem>
                    </Link>
                    <Link to="/admindashboard" className='navigation'>
                        <MenuItem icon={<ReceiptRoundedIcon />}>
                            {sidebarTextSamples.ADMIN}</MenuItem>

                    </Link>
                    <Link to="/checklist" className='navigation'>
                        <MenuItem icon={<PlaylistAddCheckIcon />}>
                            {sidebarTextSamples.CHECK_LIST}
                        </MenuItem>
                    </Link>

                    <MenuItem icon={<LogoutRoundedIcon color="primary" />}>
                        {sidebarTextSamples.LOG_OUT}
                    </MenuItem>
                    <div>
                    </div>
                </Menu>
            </Sidebar>
        </div>
    );
};

export default Navbar;

