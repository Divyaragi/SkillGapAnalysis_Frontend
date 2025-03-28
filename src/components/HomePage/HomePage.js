"use client";

import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  StrictMode
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColumnApiModule,
  ColumnAutoSizeModule,
  ModuleRegistry,
  ValidationModule,
} from "ag-grid-community";
import Swal from "sweetalert2";
import editIcon from '../../assets/images/Edit.png';
import deleteIcon from '../../assets/images/delete.png';
import addImage from '../../assets/images/addImage.png';
import SkillModal from "../AddSkills/AddSkills";
import EditSkillModal from "../EditSkills/EditSkills";
import searchIcon from '../../assets/search.png'
ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  ColumnApiModule,
  ClientSideRowModelModule,
  ValidationModule,
]);

const ActionCellRenderer = ({ data, fetchSkills,openEditModal }) => {  
  const handleDelete = async () => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this skill?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:3002/skills/delete-skill?skill_id=${data.skill_id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status) {
        Swal.fire("Deleted!", "Skill has been deleted.", "success");
        fetchSkills();
      } else {
        Swal.fire("Error!", "Failed to delete skill.", "error");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      Swal.fire("Error!", "An error occurred while deleting the skill.", "error");
    }
  };


  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div
              onClick={() => openEditModal(data)}

        style={{
          width: "28px",
          height: "28px",
          background: "#FFFFFF",
          border: "1px solid #013579",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          marginTop: "5px",
        }}
      >
        <img src={editIcon} alt="Edit" style={{ width: "16px", height: "16px" }} />
      </div>
      <div
              onClick={handleDelete}

        style={{
          width: "28px",
          height: "28px",
          background: "#FFFFFF",
          border: "1px solid #013579",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          marginTop: "5px",
        }}
      >
        <img src={deleteIcon} alt="Delete" style={{ width: "16px", height: "16px" }} />
      </div>
    </div>
  );
};

const HomePage = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSkills = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3002/skills/getSkills?page=${page}&limit=10&search=${searchQuery}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status && result.data) {
        const formattedData = result.data.skills.map((skill, index) => ({
          sNo: (page - 1) * 10 + index + 1,
          skill: skill.skill_name,
          category: skill.category.category_name,
          skill_id: skill.skill_id, 

        }));
        setRowData(formattedData);
        setHasNext(result.data.skills.length === 10);
        setHasPrev(page > 1);
        setTotalPages(result.data.pagination.totalPages || 1);

      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  }, [page,searchQuery]);
 
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); 
  };
  const onGridSizeChanged = useCallback((params) => {
    window.setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 10);
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <>
<div className="flex justify-between ">
<h1 className="text-xl font-semibold ml-2">Skills</h1>
<div className="search-container mr-[5rem]">
      <img src={searchIcon} alt="Search" className="search-icon" />
      <input type="text" placeholder="Search..." className="search-input"value={searchQuery} 
    onChange={handleSearch}  />
    </div>
        <div className="flex justify-end mr-1">
     <button className="w-[70px] h-[36px] bg-white border border-[#013579] rounded-md flex items-center px-2"  onClick={() => setIsModalOpen(true)}>
      <img src={addImage} alt="Add" className="w-4 h-4 mr-1" />
      <span className="text-left text-[14px] leading-[19px] font-normal text-[#013579]">Add</span>
    </button>
    {isModalOpen && <SkillModal onClose={() => setIsModalOpen(false)} refreshSkills={fetchSkills}  />}

    </div>
    </div>
    <div style={containerStyle} className="mt-2">
      <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
        <div style={gridStyle}>
          <AgGridReact
            rowData={rowData}
            columnDefs={[{ field: "skill" }, { field: "category" }, { field: "actions", cellRenderer: (params) => <ActionCellRenderer data={params.data} fetchSkills={fetchSkills} openEditModal={(skill) => { setSelectedSkill(skill); setIsEditModalOpen(true); }} /> }]}
            onGridSizeChanged={onGridSizeChanged}
            onFirstDataRendered={onFirstDataRendered}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "right", marginTop: "10px" }}>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            style={{ background: hasPrev ? "#013579" : "gray", color: "white", padding: "5px", margin: "5px", border: "none", borderRadius: "5px", cursor: "pointer",width:"100px" }}
          >
            Previous
          </button>
          <span className="mt-[12px]">Page {page} of {totalPages}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            style={{ background: hasNext ? "#013579" : "gray", color: "white", padding: "10px", margin: "5px", border: "none", borderRadius: "5px", cursor: "pointer",width:"100px" }}
            disabled={!hasNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    {isEditModalOpen && selectedSkill && (
        <EditSkillModal skillData={selectedSkill} onClose={() => setIsEditModalOpen(false)} refreshSkills={fetchSkills} />
      )}
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <HomePage />
  </StrictMode>
);
window.tearDownExample = () => root.unmount();
export default HomePage;
