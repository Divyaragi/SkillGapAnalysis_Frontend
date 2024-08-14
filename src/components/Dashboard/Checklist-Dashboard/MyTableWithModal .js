import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, Button } from '@mui/material';

const MyTableWithModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
  };

  const rows = [
    { id: 1,  Technologies:'Angular' },
    { id: 2,   Technologies:'React Js' },
    { id: 3,   Technologies:'Node Js' }, 
     { id: 4,  Technologies:'Vue Js' },
  ];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Technologies</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell onClick={() => handleOpen(row)}>{row.Technologies}</TableCell>
                <TableCell onClick={() => handleOpen(row)}> <Button className='btn btn-primary'>View</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          Project Name:  {selectedData ? selectedData.projectName : 'No Data'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Project Manager: {selectedData ? selectedData.ProjectManager : ''}
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button> */}
          <table class="table table-striped table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
        </Box>
      </Modal>
    </div>
  );
};

export default MyTableWithModal;
