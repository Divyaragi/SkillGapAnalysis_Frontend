import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Modal, Typography, FormHelperText, InputLabel, FormControl } from '@mui/material';
import axiosInstance from '../../../service/axiosConfig';
import { ADMIN_DASHBOARD_STRINGS } from '../../../utils/constants';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminDashboard() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [userRows, setUserRows] = useState([]);
    const [totalUserRows, setTotalUserRows] = useState(0);
    const [selectedUser, setSelectedUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const columns = [
        { id: 'user_id', label: 'User ID' },
        { id: 'user_name', label: 'User Name' },
        { id: 'email_address', label: 'Email Address' },
    ];

    useEffect(() => {
        setSelectedUser(null);

        axiosInstance
            .get('users/get-projectManager')
            .then((response) => {
                const { data, totalPecords } = response.data.response;
                setRows(data);
                setTotalRows(totalPecords);
            })
            .catch((error) => {
                console.error('API call failed:', error);
            });
    }, [page, rowsPerPage]);

    useEffect(() => {
        setSelectedUser(null);
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

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setErrors({})
        setSelectedUser(null);
    };

    const handleScroll = (event) => {
        const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
        if (bottom && !loading && userRows.length < totalUserRows) {
            setLoading(true);
            axiosInstance
                .get('users/get-userList', { params: { page: page + 1, rowsPerPage } })
                .then((response) => {
                    const { data } = response.data.responses;
                    setUserRows(prev => [...prev, ...data]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('API call failed:', error);
                    setLoading(false);
                });
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!selectedUser) {
            tempErrors.selectedUser = "User selection is required.";
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            'user_id': selectedUser,
            'role_id': 1
        }
        if (validate()) {
            setSelectedUser('');
            setSelectedUser('');
            axiosInstance.post('users/role-assigned', payload)
                .then((response) => {
                    console.log("response", response.data.message
                        );
                    toast.success(response.data.message);
                    // setOpen(false);
                    setTimeout(() => {
                        document.querySelector('.btn-close').click();
                    }, 2000);
                })
                .catch((error) => {
                    toast.error(error);
                });
        }



    };

    const handleSelectChange = (e) => {
        setSelectedUser(e.target.value);
        if (e.target.value) {
            setErrors(prevErrors => ({ ...prevErrors, selectedUser: '' }));
        }
    };

    return (
        <>
            <div className='admindashboardmain'>
                <div className='d-flex justify-content-between'>
                    <div></div>
                    <div></div>
                    <div className='mt-4'>
                        <Button variant="contained" color="primary" onClick={handleOpen}>
                            {ADMIN_DASHBOARD_STRINGS.ADD_PROJECT_MANAGER}
                        </Button>
                    </div>
                </div>
                <div className='m-3'>
                    <TableContainer sx={{ maxHeight: 360 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align="left" style={{ minWidth: 150 }}>
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
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="add-project-manager-modal"
                    aria-describedby="modal-to-add-project-manager"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" component="h2" gutterBottom>
                            Add Manager
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        >
                            <FormControl fullWidth variant="outlined" error={!!errors.selectedUser}>
                                <InputLabel>User</InputLabel>
                                <Select
                                    label="User"
                                    value={selectedUser}
                                    onChange={handleSelectChange}
                                    onScroll={handleScroll}
                                    MenuProps={{
                                        PaperProps: { style: { maxHeight: 200 } },
                                    }}
                                >
                                    <MenuItem value="" disabled>Select a user</MenuItem>
                                    {userRows.map((user) => (
                                        <MenuItem key={user.user_id} value={user.user_id}>
                                            {user.user_name} - {user.email_address}
                                        </MenuItem>
                                    ))}
                                    {loading && (
                                        <MenuItem disabled>
                                            <CircularProgress size={24} />
                                        </MenuItem>
                                    )}
                                </Select>
                                {errors.selectedUser && (
                                    <FormHelperText>{errors.selectedUser}</FormHelperText>
                                )}
                            </FormControl>
                            <Box sx={{ mt: 2, textAlign: 'right' }}>
                                <Button variant="outlined" color="secondary" onClick={handleClose}>
                                    {ADMIN_DASHBOARD_STRINGS.CLOSE}
                                </Button>
                                <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
                                    {ADMIN_DASHBOARD_STRINGS.ADD_PROJECT_MANAGER}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default AdminDashboard;
