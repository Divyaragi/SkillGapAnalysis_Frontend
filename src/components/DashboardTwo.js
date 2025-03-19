"use client";

import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  StrictMode,
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
import editIcon from '../assets/images/Edit.png';
import deleteIcon from '../assets/images/delete.png';
import exportIcon from '../assets/images/Export.png';
import searchIcon from '../assets/search.png';
import './DashboardTwo.css';
ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  ColumnApiModule,
  ClientSideRowModelModule,
  ValidationModule,
]);

const skillData = [
  { sNo: 1, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"Java" },
  { sNo: 2, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"Angular" },
  { sNo: 3, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"analytics" },
  { sNo: 4, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"Logical Thinking" },
  { sNo: 5, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"Angular js" },
  { sNo: 6, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"Node js " },
  { sNo: 7, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"React" },
  { sNo: 8, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"Communication skills" },
  { sNo: 9, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"analytics" },
  { sNo: 10, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"AI" },
  { sNo: 11, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"Python" },
  { sNo: 12, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"Logical thinking" },
  { sNo: 13, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"Mongo Db" },
  { sNo: 14, Employee_id: "BTIN1001", Employee_name: "Employee 1",Skill_Gap:"Next Js" },

];

const ActionCellRenderer = (props) => {
  
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div
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
          marginTop:"5px"
        }}
      >
        <img src={editIcon} alt="Edit" style={{ width: "16px", height: "16px" }} />
      </div>
      <div
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
          marginTop:"5px"
        }}
      >
        <img src={deleteIcon} alt="Delete" style={{ width: "16px", height: "16px" }} />
      </div>
    </div>
  );
};
const ExportCellRenderer = (props) => {
  
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div
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
          marginTop:"5px"
        }}
      >
        <img src={exportIcon} alt="Edit" style={{ width: "16px", height: "16px" }} />
      </div>
    </div>
  );
};


const DashboardTwo = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  // const [rowData] = useState(skillData);
  const [columnDefs] = useState([
  { field: "sNo", headerName: "S.No" },
  { field: "EmployeeID", headerName: "Employee ID" },
  { field: "Employee_name", headerName: "Employee Name" },
  { field: "Designation", headerName: "Designation" },
  { field: "vertical", headerName: "Vertical" },
  { field: "skill_gap", headerName: "Skill Gap" },
  { field: "Reports", cellRenderer: ExportCellRenderer },
  { field: "actions", cellRenderer: ActionCellRenderer },
]);

const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const onGridSizeChanged = useCallback((params) => {
    window.setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 10);
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3002/fetch-users-with-skillGap`, {
        method: "GET",
      });
console.log("response********",response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("result************",result);
      if (result.status && result.data) {
const formattedData = result.data.map((users, index) => ({
  sNo: (page - 1) * 10 + index + 1,
  EmployeeID: users.userName,
  Employee_name: users.userName,
  Designation: users.designation, 
  vertical: users.vertical,
  skill_gap: users.ratings.skill.skill_name
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
     fetchUsers();
   }, [fetchUsers]);
  return (
    <>
    <div>
    <h1 className="text-xl font-semibold ml-2">Users</h1>

      <div className="search-container">
      <img src={searchIcon} alt="Search" className="search-icon" />
      <input type="text" placeholder="Search..." className="search-input" />
    </div>
    </div>
    <div style={containerStyle} className="mt-3">
      <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
        <div style={gridStyle}>
          <AgGridReact
            rowData={rowData}
            columnDefs={[{ field: "S.No" },{ field: "EmployeeID" },{ field: "Employee Name" }, { field: "Designation" },{ field: "Vertical" },{ field: "Skill Name" }, { field: "Reports",ExportCellRenderer },{ field: "actions", cellRenderer: (params) => <ActionCellRenderer data={params.data} fetchUsers={fetchUsers} openEditModal={(skill) => { setSelectedSkill(skill); setIsEditModalOpen(true); }} /> }]}
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
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <DashboardTwo />
  </StrictMode>
);
window.tearDownExample = () => root.unmount();
export default DashboardTwo;
