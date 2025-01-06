import React from "react";
import { Box, Grid, IconButton } from "@mui/material";
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { topbarTextSamples } from "../../utils/constants";
import "./Topbar.css";

const Topbar = () => {
  return (
    <Box className="topbar-container ps-4">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2>{topbarTextSamples.CHECK_LIST}</h2>
        </Grid>
        <Grid item >  
        </Grid>
      </Grid>
    </Box>
  );
};

export default Topbar;
