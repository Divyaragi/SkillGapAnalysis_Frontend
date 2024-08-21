import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ADMIN_DASHBOARD_STRINGS } from '../../../utils/constants';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import axiosInstance from '../../../service/axiosConfig';

function AdminDashboard() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [userRows, setUserRows] = useState([]);
    const [totalUserRows, setTotalUserRows] = useState(0);



    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    const columns = [
        { id: 'user_id', label: 'User ID' },
        { id: 'user_name', label: 'User Name' },
        { id: 'email_address', label: 'Email Address' },
        // { id: 'usermap.role_id', label: 'Role ID' }
    ];

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = name ? "" : "This field is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // onSubmit(managerData);
            setName('');
        }
    };

    useEffect(() => {

      
        axiosInstance
            .get('users/get-projectManager')
            .then((response) => {
                const { data, totalPecords } = response.data.response;
                setRows(data);
                console.log("response", response.data);

                setTotalRows(totalPecords);
            })
            .catch((error) => {
                console.error('API call failed:', error);
            });
    }, [page, rowsPerPage]);

    useEffect(() => {
        axiosInstance
            .get('users/get-userList')
            .then((response) => {
                const { data, totalPecords } = response.data.responses;
                setUserRows(data);
                setTotalUserRows(totalPecords);
            })
            .catch((error) => {
                console.error('API call failed:', error);
            });
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <div className='admindashboardmain'>
                <div className='d-flex justify-content-between'>
                    <div></div>
                    <div></div>
                    <div className='mt-4'>
                        <button type="button" className="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#addprojectmanager">
                            {ADMIN_DASHBOARD_STRINGS.ADD_PROJECT_MANAGER}
                        </button>
                    </div>
                </div>
                <div className='m-3'>
                    <TableContainer sx={{ maxHeight: 360 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align="left"
                                            style={{ minWidth: 150 }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.length > 0 ? rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.user_id}>
                                            {columns.map((column) => {
                                                let value = column.id.split('.').reduce((o, i) => o[i], row);
                                                return (
                                                    <TableCell key={column.id} align="left">
                                                        {value !== null ? value : 'N/A'}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    )) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">No data available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 100]}
                            component="div"
                            count={totalRows}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
                <div className="modal fade" id="addprojectmanager" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Manager</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    sx={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}
                                >
                                    <TextField
                                        label="Department"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        error={!!errors.department}
                                        helperText={errors.department}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                </Box>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{ADMIN_DASHBOARD_STRINGS.CLOSE}</button>
                                <button type="submit" className="btn btn-primary">{ADMIN_DASHBOARD_STRINGS.ADD_PROJECT_MANAGER}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
