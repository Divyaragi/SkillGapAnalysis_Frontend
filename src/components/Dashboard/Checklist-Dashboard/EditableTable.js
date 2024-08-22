import React, { useState } from 'react';
import ModeOutlined from '@mui/icons-material/ModeOutlined';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const EditableTable = () => {
    // Sample data
    const initialData = [
        { id: 1, rule: 'Rule 1' },
        { id: 2, rule: 'Rule 2' },
        { id: 3, rule: 'Rule 3' },
    ];

    const [data, setData] = useState(initialData);
    const [editMode, setEditMode] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isModified, setIsModified] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setIsModified(true);
    };

    const handleEditClick = (id, currentRule) => {
        setEditMode(id);
        setInputValue(currentRule);
    };

    const handleCancel = () => {
        setInputValue('');
        setIsModified(false);
        setEditMode(null);
    };

    const handleSubmit = (id) => {
        const updatedData = data.map((item) =>
            item.id === id ? { ...item, rule: inputValue } : item
        );
        setData(updatedData);
        setIsModified(false);
        setEditMode(null);
    };

    const handleRemove = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    };

    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Rules</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>
                            {editMode === item.id ? (
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                item.rule
                            )}
                        </td>
                        <td className='w-50' >
                            {editMode === item.id ? (
                                <>
                                    {isModified && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleSubmit(item.id)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Submit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className='d-flex'>
                                        <Button
                                            className="btn me-2"
                                            onClick={() => handleEditClick(item.id, item.rule)}
                                        >
                                            <ModeOutlined />
                                        </Button>
                                        <Button
                                            className="btn ms-2"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </div>

                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EditableTable;
