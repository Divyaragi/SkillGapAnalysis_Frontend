import React, { useState, useEffect, useContext, useCallback } from "react";
import Swal from "sweetalert2";
import closeImage from '../../assets/images/closeIcon.png'
import { duration } from "@mui/material";
// import { RowDataContext } from "../../UserContext";
import RowDataContext from "../../UserContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const AddTrainigs = ({ onClose, refreshTrainings, userId }) => {
    console.log("userId**********",userId);
    
    // const { rowData } = useContext(RowDataContext);
    const [rowData, setRowData] = useState([]);
    const [userData, setUserData] = useState({ name: "", email: "" });
    const [roleId, setRoleId] = useState(null);
    const [indirectReportees, setIndirectReportees] = useState([]);
    const [categories, setCategories] = useState([]);
    const [skillName, setSkillName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [skillId, setSkillId] = useState("");
    const [errors, setErrors] = useState({});
    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [trainingType, setTrainingType] = useState("");
    const [trainingDuration, setTrainingDuration] = useState("");
    const [materials, setMaterials] = useState("");
    const [categoryId, setCategoryId] = useState("");
    useEffect(() => {
        fetch(`http://localhost:3002/skills/getSkills`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
            .then((response) => {
                return response.text();
            })
            .then((text) => {
                return JSON.parse(text);
            })
            .then((data) => {
                if (data.status && data.data?.skills) {
                    const skills = data.data.skills.map(skill => ({
                        id: skill.skill_id,
                        name: skill.skill_name
                    }));
                    setCategories(skills);
                }
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    const validateForm = () => {
        let newErrors = {};
        if (!employeeId) newErrors.employeeId = "Employee ID is required";
        if (!skillId) newErrors.skillId = "Skill is required";
        if (!trainingType) newErrors.trainingType = "Training Type is required";
        if (!trainingDuration) newErrors.trainingDuration = "Training Duration is required";
        if (!materials) newErrors.materials = "Materials are required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3002/training-resources/add-training-resource", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resource_type: trainingType,
                    duration: trainingDuration,
                    materials: materials,
                    skill_id: skillId,
                    provider_id: employeeId,
                    user_id: String(userId)

                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add training");
            }

            Swal.fire({
                icon: "success",
                title: "Training added successfully!",
                showConfirmButton: true,
            });
            refreshTrainings();
            // refreshSkills();
            onClose();
        } catch (error) {
            console.error("Error adding training:", error);
            Swal.fire({
                icon: "warning",
                title: "Failed to add the training!",
                text: error.message || "Please try again.",
            });
            setError(error.message || "Failed to add training. Please try again.");
        } finally {
            setLoading(false);
        }
    };
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
            if (result.success && result.data) {
                setRoleId(result.data.role_id); // Store role_id
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    }, [userData.email]);
    const fetchAdminUsers = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3002/users`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("admin user results****3333333333**8",result);
            
            if (result.status && result.data) {
                const formattedData = result.data.map((user, index) => ({
                    EmployeeID: user.employeeID,
                    Employee_Name: user.userName,
                    Designation: user.designation,
                    Vertical: user.vertical,
                    user_Id: user.user_id
                }));
                setRowData(formattedData);
            console.log("admin formatted Data***3333333333333***",formattedData);
            
            }
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    }, []);
    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3002/users-with-hierarchy?email=${userData.email}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("heirachy result******3333333****",result);
            
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

                setRowData(formattedData);
                setIndirectReportees(formattedInDirectData);
            }

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [userData.email]);
    useEffect(() => {
        if (roleId === null) return;
        if (roleId === 1) {
            fetchAdminUsers();
        } else {
            fetchUsers();
        } fetchRoles();
    }, [roleId, fetchUsers, fetchAdminUsers]);
    console.log("admin Row Data****3333333333****8",rowData);
    const getEmployeeIds = (data) => {
        let ids = new Set();
    
        const extractIds = (arr) => {
            arr.forEach((item) => {
                ids.add(item.EmployeeID);
                if (item.children && item.children.length > 0) {
                    extractIds(item.children);
                }
            });
        };
    
        extractIds(data);
        return Array.from(ids);
    };
    
    // Assuming `rowData` is your API response
    const employeeIds = getEmployeeIds(rowData);
    console.log("employeeIDs********",employeeIds);
    
    return (
        <>
            <div className="fixed inset-0  bg-opacity-30 z-40" onClick={onClose} />

            <div className="fixed top-0 right-0 h-full w-[310px] bg-white border-l border-gray-300 shadow-lg z-50 transition-transform transform translate-x-0 overflow-y-auto">
                <div className="flex justify-between items-center p-2 border-b">
                    <h2 className="text-lg font-semibold">Add Trainings</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">
                        <img src={closeImage} alt="Close" className="w-5 h-5" />
                    </button>

                </div>

                <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
    {[
        { label: "Employee Id", state: employeeId, setState: setEmployeeId, name: "employeeId", isSelect: true, options: employeeIds },
        { label: "Skill Name", state: skillId, setState: setSkillId, name: "skillId", isSelect: true, options: categories.map((category) => ({ value: category.id, label: category.name })) },
        { label: "Training Type", state: trainingType, setState: setTrainingType, name: "trainingType", isSelect: true, options: ["Workshop", "Online Course", "Ebook", "Webinar"] },
        { label: "Training Duration", state: trainingDuration, setState: setTrainingDuration, name: "trainingDuration" },
        { label: "Materials", state: materials, setState: setMaterials, name: "materials" }
    ].map(({ label, state, setState, name, isSelect, options }) => (
        <div key={name}>
            <label className="block text-sm font-medium">
                {label} <span className="text-red-500">*</span>
            </label>
            {isSelect ? (
                <select value={state} onChange={(e) => setState(e.target.value)} className="border p-2 rounded w-full">
                    <option value="">Select</option>
                    {options &&
                        options.map((option) => (
                            <option key={option.value ?? option} value={option.value ?? option}>
                                {option.label ?? option}
                            </option>
                        ))
                    }
                </select>
            ) : (
                <input type="text" placeholder="Enter" value={state} onChange={(e) => {
                    setState(e.target.value);
                    setErrors((prev) => ({ ...prev, [name]: "" }));
                }} className="border p-2 rounded w-full" />
            )}
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
        </div>
    ))}

    <div className="flex justify-end gap-2 mt-[1rem]">
        <button
            type="button"
            onClick={onClose}
            className="w-[91px] h-[40px] border !border-[#013579] rounded-md text-[#013579] font-semibold text-[14px] leading-[21px] text-center"
        >
            Cancel
        </button>
        <button
            type="submit"
            className="w-[91px] h-[40px] border border-[#013579] rounded-md bg-[#013579] text-white font-semibold text-[14px] leading-[21px] text-center"
            disabled={loading}
        >
            Submit
        </button>
    </div>
</form>

            </div>
        </>
    );
};

export default AddTrainigs;
