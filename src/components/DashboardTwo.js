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
import exportIcon from '../assets/images/Export.png';
import searchIcon from '../assets/search.png';
import './DashboardTwo.css';
import { useNavigate } from "react-router-dom";
import RatingsManager from "./RatingsManger";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { GiSkills } from "react-icons/gi";
ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  ColumnApiModule,
  ClientSideRowModelModule,
  ValidationModule,
]);

const ExportCellRenderer = ({user_Id  }) => {  
  return (
    <div className="export-cell-container">
      <div className="export-button" onClick={() => window.location.href = `/ratings?user_id=${user_Id}`}>
  <GiSkills className="text-2xl text-blue-500 cursor-pointer" />
</div>
    </div>
  );
};
const FileUpload = ({ fetchUsers }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to submit the selected file?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          handleUpload(file);
        } else {
          setSelectedFile(null);
        }
      });
    }
  };
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:3002/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json(); // Parse response JSON
  
      if (response.ok) {
        // If status is 200, show success message
        Swal.fire({
          icon: "success",
          title: "Upload Successful",
          text: data.message ||"File uploaded successfully!",
        }).then(() => {
          fetchUsers();
        });
      } else {
        // If status is NOT 200, show the backend warning message
        Swal.fire({
          icon: "warning",
          title: "Upload Warning",
          text: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "File upload failed. Please try again.",
      });
    }
  };
  
  return (
    <div className="flex justify-end mr-1 mt-1">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <button
        className="w-[80px] h-[36px] bg-white border border-[#013579] rounded-md flex items-center px-2"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <img src={exportIcon} alt="Upload" className="w-6 h-4 mr-1" />
        <span className="text-left text-[14px] leading-[19px] font-normal text-[#013579]">
          Upload
        </span>
      </button>
    </div>
  );
};

const DashboardTwo = () => {
   const [userData, setUserData] = useState({ name: "", email: "" });
  
    useEffect(() => {
      const token = Cookies.get("result"); 
      if (token) {
        try {
          const decodedToken = jwtDecode(token);        
          setUserData({
            name: decodedToken.name,
            email: decodedToken.upn || decodedToken.email || "No Email", 
          });
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }, []);
    console.log("userData********** in users",userData);
    
  const columnDefs = [
    { field: "SNo" },
    { field: "EmployeeID",headerName:"Employee ID" },
    { field: "Employee_Name", headerName: "Employee Name" },
    { field: "Designation" },
    { field: "Vertical" },
    // { field: "skill_gap", headerName: "Skill gap" },
    { 
      field: "Skill Gap Analysis",
      cellRenderer: (params) => {
        return <ExportCellRenderer user_Id={params?.data?.user_Id} />;
      }
    }
  ];
  
  const inDirectReporteesColumnDefs = [
    { field: "SNo" },
    { field: "EmployeeID",headerName:"Employee ID" },
    { field: "Employee_Name", headerName: "Employee Name" },
    { field: "Designation" },
    { field: "Vertical" },
    // { field: "L1_Manager", headerName: "L1 Manager" },
    { 
      field: "Ratings",
      cellRenderer: (params) => {
        return <ExportCellRenderer user_Id={params?.data?.user_Id} />;
      }
    }
  ];
  

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("direct"); // State for tab selection
  const [indirectReportees, setIndirectReportees] = useState([]);
    const [roleId, setRoleId] = useState(null);

  const onGridSizeChanged = useCallback((params) => {
    window.setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 10);
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);
     useEffect(() => {
          if (userData.email) { // ✅ Ensure email is available before calling API
              fetchRoles();
          }
      }, [userData.email]);
  const fetchRoles = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/fetch-users-by-emailID?email=${userData.email}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("result********sidebar", result);

      if (result.success && result.data) {
        setRoleId(result.data.role_id); // Store role_id
        console.log("Role ID:", result.data.role_id);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, [userData.email]);
  const fetchAdminUsers = useCallback(async () => {
    console.log("inside admin users**999999999999999**");
    
    try {
      const response = await fetch(`http://localhost:3002/users?page=${page}&search=${searchQuery}`, {
        method: "GET",
      });
console.log("admin users response*******999999999**",response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("adminusers*******99999999",result);
      
      if (result.status && result.data) {     
        console.log(">>>>inside results*******9999999",result.data);
           
        const formattedData = result.data.map((user, index) => ({
          SNo: (page - 1) * 10 + index + 1,
          EmployeeID: user.employeeID,
          Employee_Name: user.userName,
          Designation: user.designation,
          Vertical: user.vertical,
          // skill_gap: user.ratings?.length > 0 ? user.ratings.map(r => r.skill.skill_name).join(", ") : "N/A",
          user_Id:user.user_id
        }));

        console.log(">>>>formattedData**********99999999999",formattedData);
        
        setRowData(formattedData);
        setHasNext(result.data.length === 10);
        setHasPrev(page > 1);
        setTotalPages(result.totalPages || 1);
        console.log("admin users rowdata***********99999",rowData);
        
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  }, [page, searchQuery]);
  const fetchUsers = useCallback(async () => {
    try {
        console.log("inside try*****");
        
        const response = await fetch(`http://localhost:3002/users-with-hierarchy?email=${userData.email}`, {  
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("result********", result);

      //   if (result && result.reportees) {
      //     const formatReportees = (reportees, parentId = null) => {
      //         return reportees.map((rep, index) => ({
      //             SNo: index + 1,
      //             EmployeeID: rep.employeeID,
      //             Employee_Name: rep.userName,
      //             Email: rep.emailID,
      //             Designation: rep.designation,
      //             Vertical: rep.vertical,
      //             Manager: rep.L1Manager,
      //             user_Id: rep.user_id,
      //             ParentID: parentId,
      //             children: rep.reportees.length > 0 ? formatReportees(rep.reportees, rep.user_id) : []
      //         }));
      //     };

      //     const formattedData = formatReportees(result.reportees); // Only include reportees
      //     setRowData(formattedData);
      //     const formatIndirectReportees = (reportees, parentId = null) => {
      //       return reportees.flatMap((rep, index) => {
      //           // Create the current reportee object
      //           const formattedRep = {
      //               SNo: index + 1,
      //               EmployeeID: rep.employeeID,
      //               Employee_Name: rep.userName,
      //               Email: rep.emailID,
      //               Designation: rep.designation,
      //               Vertical: rep.vertical,
      //               Manager: rep.L1Manager,
      //               user_Id: rep.user_id,
      //               ParentID: parentId,
      //               children: [] // Placeholder for children
      //           };
        
      //           // Process children (if any)
      //           if (rep.reportees.length > 0) {
      //               formattedRep.children = formatIndirectReportees(rep.reportees, rep.user_id);
      //           }
        
      //           // Include the nested children in the final array
      //           return [formattedRep, ...formattedRep.children];
      //       });
      //   };
      //   const extractIndirectReportees = (reportees, parentId = null, counter = { value: 1 }) => {
      //     return reportees.flatMap(rep => {
      //         // Recursively get all nested reportees
      //         const indirectChildren = extractIndirectReportees(rep.reportees, rep.user_id, counter);
              
      //         // Return only the indirect reportees (not the top-level ones)
      //         return indirectChildren.length > 0 ? indirectChildren : rep.reportees.map(child => ({
      //             SNo: counter.value++,  // Use and increment the counter
      //             EmployeeID: child.employeeID,
      //             Employee_Name: child.userName,
      //             Email: child.emailID,
      //             Designation: child.designation,
      //             Vertical: child.vertical,
      //             Manager: child.L1Manager,
      //             user_Id: child.user_id,
      //             ParentID: rep.user_id,
      //             children: extractIndirectReportees(child.reportees, child.user_id, counter)
      //         }));
      //     });
      // };
      
      // // Extract indirect reportees from result.reportees
      // const formattedInDirectData = extractIndirectReportees(result.reportees, null, { value: 1 });
      // setIndirectReportees(formattedInDirectData);
      
      // console.log("Indirect Reportees Data:", formattedInDirectData);
      
      //   console.log("rowData88888888888",rowData);
      //   console.log("indirect Repotees data 8888888888888",formattedInDirectData);
        
        
      //       setHasNext(result.reportees.length === 10);
      //       setHasPrev(page > 1);
      //       setTotalPages(result.totalPages || 1);
      //   }
      if (result && result.reportees) {
        let formattedData = [];
        let formattedInDirectData = [];
      
        if (result.reportees.length > 0) {
          // Function to format direct reportees
          const formatReportees = (reportees, parentId = null) => {
            return reportees.map((rep, index) => ({
              SNo: index + 1,
              EmployeeID: rep.employeeID,
              Employee_Name: rep.userName,
              Email: rep.emailID,
              Designation: rep.designation,
              Vertical: rep.vertical,
              Manager: rep.L1Manager,
              user_Id: rep.user_id,
              ParentID: parentId,
              children: rep.reportees.length > 0 ? formatReportees(rep.reportees, rep.user_id) : [],
            }));
          };
      
          formattedData = formatReportees(result.reportees);
      
          // Function to format indirect reportees (only children, not first-level reportees)
          const extractIndirectReportees = (reportees, parentId = null, counter = { value: 1 }) => {
            return reportees.flatMap((rep) => {
              const indirectChildren = extractIndirectReportees(rep.reportees, rep.user_id, counter);
      
              return indirectChildren.length > 0
                ? indirectChildren
                : rep.reportees.map((child) => ({
                    SNo: counter.value++, // Use and increment the counter
                    EmployeeID: child.employeeID,
                    Employee_Name: child.userName,
                    Email: child.emailID,
                    Designation: child.designation,
                    Vertical: child.vertical,
                    Manager: child.L1Manager,
                    user_Id: child.user_id,
                    ParentID: rep.user_id,
                    children: extractIndirectReportees(child.reportees, child.user_id, counter),
                  }));
            });
          };
      
          formattedInDirectData = extractIndirectReportees(result.reportees, null, { value: 1 });
        } else {
          // If no reportees, store user details directly
          formattedData = [
            {
              SNo: 1,
              EmployeeID: result.employeeID,
              Employee_Name: result.userName,
              Email: result.emailID,
              Designation: result.designation,
              Vertical: result.vertical,
              Manager: result.L1Manager,
              user_Id: result.user_id,
              ParentID: null,
              children: [],
            },
          ];
          formattedInDirectData = []; // No indirect reportees
        }
      
        // Set state
        setRowData(formattedData);
        setIndirectReportees(formattedInDirectData);
      
        console.log("Direct Reportees Data:", formattedData);
        console.log("Indirect Reportees Data:", formattedInDirectData);
      
        // Pagination
        setHasNext(result.reportees.length === 10);
        setHasPrev(page > 1);
        setTotalPages(result.totalPages || 1);
      }
      
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}, [userData.email]);
 console.log("roleId********99999999999",roleId);
 
console.log("rowData88888888888",rowData);
        console.log("indirect Repotees data 8888888888888",indirectReportees);
  useEffect(() => {
    console.log("inside useeffect*********99999 ");
    if (roleId === null) return;
    if (roleId === 1) {
      console.log("inside useeffetc999999999999");
      
      fetchAdminUsers();
  } else {
      fetchUsers();
  }    fetchRoles();
  }, [roleId,fetchUsers,fetchAdminUsers]);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };
  console.log("admin users rowdata***********99999",rowData);


  return (
    <>
      <div className="flex justify-between ">
        <h1 className="text-xl font-semibold ml-2">Users</h1>

        <div className="search-container mr-[7rem]">
          <img src={searchIcon} alt="Search" className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" value={searchQuery}
            onChange={handleSearch} />
        </div>
        <FileUpload fetchUsers={fetchUsers} />
      </div>
      <div className="flex ml-2">
        <button
          className={`px-4 py-2 ${activeTab === "direct" ? "bg-[#013579] text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("direct")}
        >
          Direct Reportees
        </button>
        <button
          className={`px-4 py-2 ml-2 ${activeTab === "indirect" ? "bg-[#013579] text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("indirect")}
        >
          Indirect Reportees
        </button>
      </div>
      {activeTab === "direct" ? (
      <div style={containerStyle} className="mt-3">
        <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
          <div style={gridStyle}>
            <AgGridReact
              rowData={rowData}
              // columnDefs={[{ field: "SNo" }, { field: "EmployeeID" }, { field: "Employee_Name" }, { field: "Designation" }, { field: "Vertical" }, { field: "skill_gap" }, { field: "Reports", cellRenderer: (params) => <ExportCellRenderer user_Id={params?.data?.user_Id} 
                  // fetchUsers={fetchUsers} openEditModal={(skill) => { setSelectedSkill(skill); setIsEditModalOpen(true); }} /> }]}
             columnDefs={columnDefs}
                  onGridSizeChanged={onGridSizeChanged}
              onFirstDataRendered={onFirstDataRendered}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "right", marginTop: "10px" }}>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              style={{ background: hasPrev ? "#013579" : "gray", color: "white", padding: "5px", margin: "5px", border: "none", borderRadius: "5px", cursor: "pointer", width: "100px" }}
            >
              Previous
            </button>
            <span className="mt-[12px]">Page {page} of {totalPages}</span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              style={{ background: hasNext ? "#013579" : "gray", color: "white", padding: "10px", margin: "5px", border: "none", borderRadius: "5px", cursor: "pointer", width: "100px" }}
              disabled={!hasNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>): (
  <div style={containerStyle} className="mt-3">
  <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
    <div style={gridStyle}>
      <AgGridReact
        rowData={indirectReportees}
        // columnDefs={[{ field: "SNo" }, { field: "EmployeeID" }, { field: "Employee_Name" }, { field: "Designation" }, { field: "Vertical" }, { field: "skill_gap" }, { field: "Reports", cellRenderer: (params) => <ExportCellRenderer user_Id={params?.data?.user_Id} 
            // fetchUsers={fetchUsers} openEditModal={(skill) => { setSelectedSkill(skill); setIsEditModalOpen(true); }} /> }]}
       columnDefs={inDirectReporteesColumnDefs}
            onGridSizeChanged={onGridSizeChanged}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
    <div style={{ display: "flex", justifyContent: "right", marginTop: "10px" }}>
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        style={{ background: hasPrev ? "#013579" : "gray", color: "white", padding: "5px", margin: "5px", border: "none", borderRadius: "5px", cursor: "pointer", width: "100px" }}
      >
        Previous
      </button>
      <span className="mt-[12px]">Page {page} of {totalPages}</span>

      <button
        onClick={() => setPage((prev) => prev + 1)}
        style={{ background: hasNext ? "#013579" : "gray", color: "white", padding: "10px", margin: "5px", border: "none", borderRadius: "5px", cursor: "pointer", width: "100px" }}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  </div>
</div>        )}
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
