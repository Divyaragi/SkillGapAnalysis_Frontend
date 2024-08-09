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
import { sidebarTextSamples } from '../../utils/constants';
const Navbar = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const handleIconClick = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };
    return (
        <div className='sidebar-main-container'>
            <Sidebar className="sidebar-container" collapsed={sidebarCollapsed} >
                <Menu>
                    <MenuItem className='first-menu-item' icon={<MenuRoundedIcon />} onClick={handleIconClick} >
                        {sidebarTextSamples.BILVANTIS_TEXT}
                    </MenuItem>
                    <MenuItem icon={<GridViewRoundedIcon />}>
                        {sidebarTextSamples.DASHBOARD}
                    </MenuItem>
                    <MenuItem icon={<ReceiptRoundedIcon />} >
                        {sidebarTextSamples.PROFILE}
                    </MenuItem>
                    <MenuItem icon={<NoteAddRoundedIcon />}>
                       {sidebarTextSamples.PULL_REQUEST}
                    </MenuItem>
                    <MenuItem icon={<PreviewRoundedIcon />}>
                        {sidebarTextSamples.REVIEW}
                    </MenuItem>
                    <MenuItem icon={<CommentRoundedIcon />}>
                        {sidebarTextSamples.COMMENTS}
                    </MenuItem>
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

