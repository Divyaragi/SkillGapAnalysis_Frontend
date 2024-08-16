import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, Button } from '@mui/material';
import ModeOutlined from '@mui/icons-material/Mode';
import EditableTable from './EditableTable'
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
    <div className='m-2'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Technologies</TableCell>
              <TableCell className='w-25'>Action</TableCell>
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
         <EditableTable/>
        </Box>
      </Modal>
    </div>
  );
};

export default MyTableWithModal;
