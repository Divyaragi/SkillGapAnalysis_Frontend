import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ADMIN_DASHBOARD_STRINGS } from '../../../utils/constants'
import { Dropzone, FileMosaic } from "@files-ui/react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Box, Typography } from '@mui/material';
function AdminDashboard() {
    const technologies = [
        { label: 'Angular' },
        { label: 'React' }

    ];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [files, setFiles] = React.useState([]);
    const updateFiles = (incommingFiles) => {
        setFiles(incommingFiles);
    };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = name ? "" : "This field is required.";
        tempErrors.email = email ? "" : "This field is required.";
        if (email) {
            tempErrors.email = /\S+@\S+\.\S+/.test(email) ? "" : "Email is not valid.";
        }
        tempErrors.department = department ? "" : "This field is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const managerData = {
                name,
                email,
                department,
            };
            // onSubmit(managerData);
            // Clear the form
            setName('');
            setEmail('');
            setDepartment('');
        }
    };
    return (
        <>
            <div className='main'>
                <div class="d-flex justify-content-between">
                    <div></div>
                    <div></div>
                    <div className='mt-4'>
                        <button type="button" class="btn btn-primary me-4" data-bs-toggle="modal" data-bs-target="#addprojectmanager">+ {ADMIN_DASHBOARD_STRINGS.ADD_CHECK_LIST} </button>
                        <button type="button" class="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#addchecklist">+ {ADMIN_DASHBOARD_STRINGS.ADD_PROJECT_MANAGER} </button>
                    </div>
                </div>
                <div className='m-3'>
                    <Paper sx={{ width: '100%' }} className='mt-3'>
                        <TableContainer sx={{ maxHeight: 360 }}>
                            <Table >
                                <TableHead stickyHeader aria-label="sticky table">
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ top: 57, minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
                <div class="modal fade" id="addchecklist" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Manager</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    sx={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}
                                >
                                    <TextField
                                        label="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Project"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        error={!!errors.department}
                                        helperText={errors.department}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />

                                </Box>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{ADMIN_DASHBOARD_STRINGS.CLOSE}</button>
                                <button type="button" class="btn btn-primary">{ADMIN_DASHBOARD_STRINGS.ADD_PROJECT_MANAGER}</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="addprojectmanager" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">{ADMIN_DASHBOARD_STRINGS.ADD_CHECK_LIST}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={technologies}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Technologies" />}
                                />
                                <Dropzone onChange={updateFiles} value={files} className='mt-3' accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                                    {files.map((file) => (
                                        <FileMosaic {...file} preview />
                                    ))}
                                </Dropzone>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{ADMIN_DASHBOARD_STRINGS.CLOSE}</button>
                                <button type="button" class="btn btn-primary">{ADMIN_DASHBOARD_STRINGS.SUBMIT}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'Role', label: 'Role', minWidth: 170 },
    { id: 'Created_Date', label: 'Created Date', minWidth: 170 },
    { id: 'Created_By', label: 'Created By', minWidth: 170 },
    { id: 'Projects', label: 'Projects', minWidth: 170 },
    { id: 'CHECK_LIST', label: "Check List's", minWidth: 170 },

];

function createData(name, Role, Created_Date, Created_By, Projects, CHECK_LIST) {

    return { name, Role, Created_Date, Created_By, Projects, CHECK_LIST };
}

const rows = [
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),
    createData('Arya', 'Project Manager', 1324171354, 'Arya', 'Mukesh', "check list"),

];
