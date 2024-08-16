import { ADMIN_DASHBOARD_STRINGS } from '../../../utils/constants'
import { Dropzone, FileMosaic } from "@files-ui/react";
import React, { useState } from 'react';
import { Autocomplete, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';


function AddCheckList() {
    const technologies = [
        { label: 'Angular' },
        { label: 'React' }
    ];

    const categories = [
        { label: 'Frontend' },
        {  label: 'Backend' },
        { label: 'Fullstack' }
    ];

    const [selectedTechnology, setSelectedTechnology] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({ technology: '', category: '', files: '' });

    const updateFiles = (incomingFiles) => {
        setFiles(incomingFiles);
        setErrors((prevErrors) => ({
            ...prevErrors,
            files: incomingFiles.length === 0 ? 'Please upload at least one file.' : ''
        }));
    };

    const handleSubmit = () => {
        let hasError = false;

        if (!selectedTechnology) {
            setErrors((prevErrors) => ({ ...prevErrors, technology: 'Please select a technology.' }));
            hasError = true;
        }

        if (!selectedCategory) {
            setErrors((prevErrors) => ({ ...prevErrors, category: 'Please select a category.' }));
            hasError = true;
        }

        if (files.length === 0) {
            setErrors((prevErrors) => ({ ...prevErrors, files: 'Please upload at least one file.' }));
            hasError = true;
        }

        if (!hasError) {
            // Submit the form or perform the required action
            console.log('Form Submitted:', { selectedTechnology, selectedCategory, files });
        }
    };

    const isFormInvalid = !selectedTechnology || !selectedCategory || files.length === 0;

    return (
        <>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{ADMIN_DASHBOARD_STRINGS.ADD_CHECK_LIST}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Autocomplete
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
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={categories}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    error={!!errors.category}
                                    helperText={errors.category}
                                />
                            )}
                            value={selectedCategory}
                            onChange={(event) => {
                                setSelectedCategory(event.target.value);
                                setErrors((prevErrors) => ({ ...prevErrors, category: '' }));
                            }}
                        />
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
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{ADMIN_DASHBOARD_STRINGS.CLOSE}</button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            {ADMIN_DASHBOARD_STRINGS.SUBMIT}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCheckList