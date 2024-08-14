import React, { useState } from 'react';
import ModeOutlined from '@mui/icons-material/ModeOutlined';
import Button from '@mui/material/Button';

const EditableTable = () => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('Otto');
  const [isModified, setIsModified] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsModified(true);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setInputValue('Otto');
    setIsModified(false);
    setEditMode(false);
  };

  const handleSubmit = () => {
    setIsModified(false);
    setEditMode(false);
    // Handle submission logic here
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
        <tr>
          <td>
            {editMode ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            ) : (
              inputValue
            )}
          </td>
          <td>
            {editMode ? (
              <>
                {isModified && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
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
              <button className="btn" onClick={handleEditClick}>
                <ModeOutlined />
              </button>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EditableTable;
