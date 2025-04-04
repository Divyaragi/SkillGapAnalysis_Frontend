
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
import { useLocation } from "react-router-dom";
import {
  ClientSideRowModelModule,
  ColumnApiModule,
  ColumnAutoSizeModule,
  ModuleRegistry,
  ValidationModule,
} from "ag-grid-community";
import editIcon from '../../assets/images/Edit.png';
import deleteIcon from '../../assets/images/delete.png';
import exportIcon from '../../assets/images/Export.png';
import addIcon from '../../assets/images/addImage.png';
import addImage from '../../assets/images/addImage.png';
import searchIcon from '../../assets/search.png';
import '../DashboardTwo';
import { useSearchParams } from "react-router-dom";
import AddRatingsManager from '../AddRatingsManager/AddRatingsManger';
import EditRatingsModal from "../EditRatingsManager/EditRatingsManger";
import { MdOutlinePreview } from "react-icons/md";
import ViewProficiencyLevel from "../AddRatingsManager/ViewProficiencyLevel";
import AddRatings from '../AddRatings/AddRatings';
import EditRatings from '../EditRatings/EditRatings';
ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  ColumnApiModule,
  ClientSideRowModelModule,
  ValidationModule,
]);

const ActionCellRenderer = ({data,openEditModal}) => {

  console.log("hhhhhhhhhhhhhhh", data);
  
  
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
          marginTop:"5px"
        }}
      >
        <img src={editIcon} alt="Edit" style={{ width: "16px", height: "16px" }} />
      </div>
   
    </div>
  );
};


const ExportCellRenderer = ({onNavigate }) => {

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div
        onClick={onNavigate} 

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
        <img src={exportIcon} alt="Edit" style={{ width: "16px", height: "16px" }}  />
      </div>
    </div>
  );
};


const RatingsManager = ( ) => {
  const queryParams = new URLSearchParams(window.location.search);
  const user_id = queryParams.get("userId");
  // const location = useLocation();
  // const user_id = location.state?.userId || null;
  console.log("USERRRR",user_id);
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [columnDefs] = useState([
    { field: "skill_name", headerName: "Skill Name" },
    { field: "self_rating", headerName: "Self Rating" },
    { field: "manager_rating", headerName: "Manager Rating" },
    { field: "required_rating", headerName: "Required Rating" },
    { field: "skill_gap", headerName: "Skill Gap" },
    { field: "proficiency_level", headerName: "Proficiency Level" },
    {
        field: "actions",
        headerName: "Actions",
        minWidth: 100,
        cellRenderer: (params) => <ActionCellRenderer data={params.data} fetchSkills={fetchRatings}
        openEditModal={(RatingsData) => { setSelectedSkill(RatingsData); setIsEditModalOpen(true); }}        />, 
      },
  ]);
  

  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingId, setRatingId] = useState(null);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
    const [categories, setCategories] = useState([]);

  const fetchSkills = useCallback(async () => {
          try {
              const response = await fetch(`http://localhost:3002/skills/getSkills`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({})
              });
  
              if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
              const data = await response.json();
              if (data.status && data.data?.skills) {
                  setCategories(data.data.skills.map(skill => ({ id: skill.skill_id, name: skill.skill_name })));
              }
          } catch (error) {
              console.error("Error fetching skills:", error);
          }
      }, []);
    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

  const handleRatingIdUpdate = (newRatingId) => {
    setRatingId(newRatingId);
    console.log("*****newRatingId******", newRatingId);
};
  const onGridSizeChanged = useCallback((params) => {
    window.setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 10);
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const fetchRatings = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3002/skills/fetch-ratings?user_id=73`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("result********",result);
      if (result.success && result.data) {
        const formattedData = result.data.map((rating) => ({
          skill_name: rating.skill.skill_name,
          self_rating: rating.self_rating ?? "-",
          manager_rating: rating.manager_rating ?? "-",
          required_rating: rating.required_rating ?? "-",
          skill_gap: rating.skill_gap ?? "-",
          proficiency_level: rating.proficiency_level ?? "-",
          rating_id: rating.rating_id ?? "-", 
          skill_id:rating.skill.skill_id,
          

        }));

        setRowData(formattedData);
        setHasNext(result.pagination.totalPages > page);
        setHasPrev(page > 1);
        setTotalPages(result.pagination.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

   const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page when searching
  };
  console.log("isEditModalOpen******",isEditModalOpen);
  console.log("selectedProviderId before opening modal:", selectedProviderId);
  return (
    <>
    <div className="flex justify-between ">
    <h1 className="text-xl font-semibold ml-2">My Ratings</h1>

      {/* <div className="search-container mr-[5rem]">
      <img src={searchIcon} alt="Search" className="search-icon" />
      <input type="text" placeholder="Search..." className="search-input"  value={searchQuery} 
    onChange={handleSearch}/>
    </div> */}
    
   <div className="flex justify-end mr-1 mt-1 ml-[38rem]">
    <button className="w-[200px] h-[36px] bg-white border border-[#013579] rounded-md flex items-center px-2 mr-2"  onClick={() => setIsViewModalOpen(true)}>
      {/* <img src={exportIcon} alt="Add" className="w-4 h-4 mr-1" /> */}
              <MdOutlinePreview className="w-5 h-5 text-[#03c6fc] mr-2" />
      
      <span className="text-left text-[14px] leading-[19px] font-normal text-[#013579]">Proficiency Level Criteria</span>
      {isViewModalOpen && <ViewProficiencyLevel onClose={() => setIsViewModalOpen(false)}  />}

    </button>

    </div>
   
      <div className="flex justify-end mr-1 mt-1">
                        <button className="w-[70px] h-[36px] bg-white border border-[#013579] rounded-md flex items-center px-2" onClick={() => {
                            setSelectedProviderId(rowData.length > 0 ? rowData[0].provider_id : null);
                            setIsModalOpen(true);
                        }}>
                            <img src={addImage} alt="Add" className="w-4 h-4 mr-1" />
                            <span className="text-left text-[14px] leading-[19px] font-normal text-[#013579]">Add</span>
                        </button>
                        {isModalOpen && <AddRatings onClose={() => setIsModalOpen(false)} refreshSkills={fetchRatings} user_id={user_id} />}
  
                    </div>
 
   
    </div>
    <div style={containerStyle} className="mt-3">
      <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
        <div style={gridStyle}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}    
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
    {isEditModalOpen &&selectedSkill && (
        <EditRatings skillData={selectedSkill} onClose={() => setIsEditModalOpen(false)} refreshSkills={fetchRatings}  user_id={user_id} />
      )}
    </>
  );
};


const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RatingsManager />
  </StrictMode>
);
window.tearDownExample = () => root.unmount();
export default RatingsManager;


