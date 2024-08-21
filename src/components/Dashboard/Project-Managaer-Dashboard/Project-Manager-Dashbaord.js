import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { PROJECT_MANAGER_DASHBOARD_STRINGS } from '../../../utils/constants'; // Ensure constants are imported correctly
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';

function ProjectManagerDashboard() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [projectName, setProjectName] = useState('');
    const [frontendTech, setFrontendTech] = useState('');
    const [backendTech, setBackendTech] = useState('');
    const [frontendDev, setFrontendDev] = useState([]);
    const [backendDev, setBackendDev] = useState([]);
    const [frontendAssigned, setFrontendAssigned] = useState([]);
    const [backendAssigned, setBackendAssigned] = useState([]);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        tempErrors.projectName = projectName ? "" : "This field is required.";
        tempErrors.frontendTech = frontendTech ? "" : "This field is required.";
        tempErrors.backendTech = backendTech ? "" : "This field is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // onSubmit(projectData);
            // Clear the form
            setProjectName('');
            setFrontendTech('');
            setBackendTech('');
            setFrontendDev([]);
            setBackendDev([]);
            setFrontendAssigned([]);
            setBackendAssigned([]);
        }
    };

    const columns = [
        { id: 'projectName', label: 'Project Name', minWidth: 170 },
        { id: 'frontendTech', label: 'Frontend Technology', minWidth: 170 },
        { id: 'backendTech', label: 'Backend Technology', minWidth: 170 },
        { id: 'frontendDev', label: 'Frontend Developer Users', minWidth: 170 },
        { id: 'backendDev', label: 'Backend Developer Users', minWidth: 170 },
        { id: 'frontendAssigned', label: 'Frontend Assigned To', minWidth: 170 },
        { id: 'backendAssigned', label: 'Backend Assigned To', minWidth: 170 },
    ];

    const projectList = [
        {
            projectName: 'Project Alpha',
            frontendTech: 'React',
            backendTech: 'Node.js',
            frontendDev: ['Alice', 'Bob'],
            backendDev: ['Charlie'],
            frontendAssigned: ['Alice'],
            backendAssigned: ['Charlie'],
        },
        {
            projectName: 'Project Alpha',
            frontendTech: 'React',
            backendTech: 'Node.js',
            frontendDev: ['Alice', 'Bob'],
            backendDev: ['Charlie'],
            frontendAssigned: ['Alice'],
            backendAssigned: ['Charlie'],
        },
        {
            projectName: 'Project Beta',
            frontendTech: 'Angular',
            backendTech: 'Java',
            frontendDev: ['David'],
            backendDev: ['Eve'],
            frontendAssigned: ['David'],
            backendAssigned: ['Eve'],
        },
        {
            projectName: 'Project Gamma',
            frontendTech: 'Vue.js',
            backendTech: 'Python',
            frontendDev: ['Frank'],
            backendDev: ['Grace'],
            frontendAssigned: ['Frank'],
            backendAssigned: ['Grace'],
        },
        {
            projectName: 'Project Gamma',
            frontendTech: 'Vue.js',
            backendTech: 'Python',
            frontendDev: ['Frank'],
            backendDev: ['Grace'],
            frontendAssigned: ['Frank'],
            backendAssigned: ['Grace'],
        },
    ];

    const developers = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace'];
    const assignedTo = developers; // Assuming the list of assigned users is the same as developers

    return (
        <>
            <div className='projectdashboardmain'>
                <div className='d-flex justify-content-between'>
                    <div></div>
                    <div></div>
                    <div className='mt-4'>
                        <button type="button" className="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#addproject">
                            {PROJECT_MANAGER_DASHBOARD_STRINGS.ADD_PROJECT}
                        </button>
                    </div>
                </div>
                <div className='m-3'>
                    <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align="left"
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projectList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align="left">
                                                        {Array.isArray(value) ? value.join(', ') : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 100]}
                            component="div"
                            count={projectList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
                <div className="modal fade" id="addproject" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Project</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    sx={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}
                                >
                                    <TextField
                                        label="Project Name"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        error={!!errors.projectName}
                                        helperText={errors.projectName}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Frontend Technology"
                                        value={frontendTech}
                                        onChange={(e) => setFrontendTech(e.target.value)}
                                        error={!!errors.frontendTech}
                                        helperText={errors.frontendTech}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Backend Technology"
                                        value={backendTech}
                                        onChange={(e) => setBackendTech(e.target.value)}
                                        error={!!errors.backendTech}
                                        helperText={errors.backendTech}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                    {/* <TextField
                                        label="Review Level"
                                       
                                        error={!!errors.backendTech}
                                        helperText={errors.backendTech}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    /> */}
                                    <Autocomplete className='mt-2'
                                        multiple
                                        id="frontend-devs"
                                        options={developers}
                                        freeSolo
                                        value={frontendDev}
                                        onChange={(event, newValue) => setFrontendDev(newValue)}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    label={option}
                                                    {...getTagProps({ index })}
                                                    key={index}
                                                />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Frontend Developer Users"
                                                variant="outlined"
                                                error={!!errors.frontendDev}
                                                helperText={errors.frontendDev}
                                            />
                                        )}
                                    />
                                    <Autocomplete className='mt-2'
                                        multiple
                                        id="backend-devs"
                                        options={developers}
                                        freeSolo
                                        value={backendDev}
                                        onChange={(event, newValue) => setBackendDev(newValue)}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    label={option}
                                                    {...getTagProps({ index })}
                                                    key={index}
                                                />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Backend Developer Users"
                                                variant="outlined"
                                                error={!!errors.backendDev}
                                                helperText={errors.backendDev}
                                            />
                                        )}
                                    />
                                    <Autocomplete className='mt-2'
                                        multiple
                                        id="frontend-assigned"
                                        options={assignedTo}
                                        freeSolo
                                        value={frontendAssigned}
                                        onChange={(event, newValue) => setFrontendAssigned(newValue)}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    label={option}
                                                    {...getTagProps({ index })}
                                                    key={index}
                                                />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Frontend Assigned To"
                                                variant="outlined"
                                                error={!!errors.frontendAssigned}
                                                helperText={errors.frontendAssigned}
                                            />
                                        )}
                                    />
                                    <Autocomplete className='mt-2'
                                        multiple
                                        id="backend-assigned"
                                        options={assignedTo}
                                        freeSolo
                                        value={backendAssigned}
                                        onChange={(event, newValue) => setBackendAssigned(newValue)}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    label={option}
                                                    {...getTagProps({ index })}
                                                    key={index}
                                                />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Backend Assigned To"
                                                variant="outlined"
                                                error={!!errors.backendAssigned}
                                                helperText={errors.backendAssigned}
                                            />
                                        )}
                                    />
                                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectManagerDashboard;
