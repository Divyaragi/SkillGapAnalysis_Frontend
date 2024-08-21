import React from "react";
import { Box, Grid, IconButton } from "@mui/material";
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import "./Topbar.css";
import Cookies from 'js-cookie';
const Topbar = () => {
  const authToken = Cookies.get('result');
  const parsedAuthToken = authToken ? JSON.parse(authToken) : null;
  return (
    <Box className="topbar-container ps-4">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {/* <h2>{topbarTextSamples.CHECK_LIST}</h2> */}
        </Grid>
        <Grid item >
          <div className="d-flex mt-2">
            <IconButton  className="p-0">
                <div className="profile-icon">
                <PersonOutlineRoundedIcon/>
                </div>
            </IconButton>
            <div className="user-info-container ms-2">
              <span className="user-name">
              {/* {parsedAuthToken.name } */}
              </span>
              <span className="user-role">
              </span>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Topbar;
