import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TablePagination,
  Button,
} from '@mui/material';
import EditableTable from './EditableTable';

const MyTableWithModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const rows = [
    { id: 1, Technologies: 'Angular' },
    { id: 2, Technologies: 'React Js' },
    { id: 3, Technologies: 'Node Js' },
    { id: 4, Technologies: 'Vue Js' },
  ];

  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.Technologies}</TableCell>
                <TableCell>
                  <Button className='btn btn-primary' onClick={() => handleOpen(row)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
          {selectedData && <EditableTable data={selectedData} />}
        </Box>
      </Modal>
    </div>
  );
};

export default MyTableWithModal;
