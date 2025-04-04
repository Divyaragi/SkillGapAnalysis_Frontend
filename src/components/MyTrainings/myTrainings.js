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
import EditTrainigsModal from "../EditTrainigs/EditTraings";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
ModuleRegistry.registerModules([
    ColumnAutoSizeModule,
    ColumnApiModule,
    ClientSideRowModelModule,
    ValidationModule,
]);
const MyTrainings = () => {
    const [columnDefs] = useState([
        { field: "employee_id", headerName: "Employee Id" },
        { field: "employee_Name", headerName: "Employee Name" },
        { field: "training_Type", headerName: "Training Type" },
        { field: "duration", headerName: "Duration" },
        { field: "material", headerName: "Material" },
    ]);
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
    const [selectedProviderId, setSelectedProviderId] = useState(null);
    const [userData, setUserData] = useState({ name: "", email: "" });
    const [roleId, setRoleId] = useState(null);
    const [userId, setUserId] = useState(null);



    const onGridSizeChanged = useCallback((params) => {
        window.setTimeout(() => {
            params.api.sizeColumnsToFit();
        }, 10);
    }, []);
    const onFirstDataRendered = useCallback((params) => {
        params.api.sizeColumnsToFit();
    }, []);
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
    console.log("userData**********sidebar", userData);
    useEffect(() => {
        if (userData.email) {
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

            if (result?.success && result?.data) {
                setRoleId(result?.data?.role_id); // Store role_id
                console.log("Role ID:", result.data.role_id);
                setUserId(result?.data?.user_id);
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    }, [userData.email]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);
    console.log("userID*****MyTraings****8", userId);
    const fetchSkills = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3002/training-resources/fetch-training-resources?user_id=${userId}`, {
                method: "GET",
            });
            console.log("mytraininhs", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log("result json", result.data.userTrainings[0]);
            if (result.data.userTrainings) {
                const formattedData = result.data.userTrainings.map((training, index) => ({
                    sNo: (page - 1) * 10 + index + 1,
                    employee_id: training.provider?.employeeID || "N/A",
                    employee_Name: training.provider?.userName || "N/A",
                    training_Type: training.resource_type || "N/A",
                    duration: training.duration || "N/A",
                    material: training.materials || "N/A",
                    skill_id: training.skill?.skill_id || null,
                }));
                setRowData(formattedData);

                // Fix pagination logic
                setHasNext((page * 10) < result.data.pagination.totalPages);
                setHasPrev(page > 1);
                setTotalPages(Math.ceil(result.data.pagination.totalPages / 10));
            }
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    }, [page, userId]);



    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);
    return (
        <>
            <div className="flex justify-between ">
                <h1 className="text-xl font-semibold ml-2">My Trainings</h1>
            </div>
            <div style={containerStyle} className="mt-2">
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
            </div>
            {isEditModalOpen && selectedSkill && (
                <EditTrainigsModal skillData={selectedSkill} onClose={() => setIsEditModalOpen(false)} refreshSkills={fetchSkills} />
            )}
        </>
    );
};

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <MyTrainings />
    </StrictMode>
);
window.tearDownExample = () => root.unmount();
export default MyTrainings;
