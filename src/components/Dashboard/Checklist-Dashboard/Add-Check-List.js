import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { Dropzone, FileMosaic } from '@files-ui/react';
import axiosInstance from '../../../service/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCheckList() {
    const technologies = [
        { label: 'Angular' },
        { label: 'React' }
    ];

    const [selectedTechnology, setSelectedTechnology] = useState(null);
    const [checkListName, setCheckListName] = useState('');
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({ technology: '', checkListName: '', files: '' });

    const updateFiles = (incomingFiles) => {
        setFiles(incomingFiles);
        setErrors((prevErrors) => ({
            ...prevErrors,
            files: incomingFiles.length === 0 ? 'Please upload at least one file.' : ''
        }));
    };

    useEffect(() => {
        resetForm();
    }, []); 

    const resetForm = () => {
        setSelectedTechnology(null);
        setCheckListName('');
        setFiles([]);
        setErrors({ technology: '', checkListName: '', files: '' });
    };
    const handleSubmit = () => {
        let hasError = false;

        if (!selectedTechnology) {
            setErrors((prevErrors) => ({ ...prevErrors, technology: 'Please select a technology.' }));
            hasError = true;
        }

        if (!checkListName) {
            setErrors((prevErrors) => ({ ...prevErrors, checkListName: 'Check List Name is required.' }));
            hasError = true;
        }

        if (files.length === 0) {
            setErrors((prevErrors) => ({ ...prevErrors, files: 'Please upload at least one file.' }));
            hasError = true;
        }

        if (!hasError) {
            const formData = new FormData();
            formData.append('name', checkListName.trim());
            formData.append('category', selectedTechnology.label.trim());
            files.forEach(file => formData.append('file', file.file));

            // Adjust headers for FormData submission
            axiosInstance.post('projects/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then((response) => {
                    console.log("response",response);
                    
                    toast.success('Check List uploaded successfully!');
                    resetForm();
                    setTimeout(() => {
                        document.querySelector('.btn-close').click();
                    }, 1000); // Close modal after 2 seconds
                })
                .catch((error) => {
                    toast.error('Failed to upload Check List.');
                });
        }
    };

    return (
        <>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Check List</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='d-flex'>
                            <TextField
                                label="Check List Name"
                                value={checkListName}
                                onChange={(e) => {
                                    setCheckListName(e.target.value);
                                    if (e.target.value) {
                                        setErrors((prevErrors) => ({ ...prevErrors, checkListName: '' }));
                                    }
                                }}
                                error={!!errors.checkListName}
                                helperText={errors.checkListName}
                                variant="outlined"
                                margin="normal"
                            />
                            <Autocomplete
                                className='mt-3 ms-2'
                                disablePortal
                                id="combo-box-demo"
                                options={technologies}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Technologies"
                                        error={!!errors.technology}
                                        helperText={errors.technology}
                                    />
                                )}
                                value={selectedTechnology}
                                onChange={(event, newValue) => {
                                    setSelectedTechnology(newValue);
                                    setErrors((prevErrors) => ({ ...prevErrors, technology: '' }));
                                }}
                            />
                        </div>

                        <Dropzone
                            onChange={updateFiles}
                            value={files}
                            className="mt-3"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        >
                            {files.map((file) => (
                                <FileMosaic {...file} key={file.name} preview />
                            ))}
                        </Dropzone>
                        {errors.files && <p style={{ color: 'red' }}>{errors.files}</p>}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={resetForm} data-bs-dismiss="modal">Close</button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default AddCheckList;
