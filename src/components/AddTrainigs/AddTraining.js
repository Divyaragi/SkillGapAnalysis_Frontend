import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import closeImage from '../../assets/images/closeIcon.png'
import { duration } from "@mui/material";
const AddTrainigs = ({ onClose, refreshSkills }) => {    
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
            refreshSkills();
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
    { label: "Employee Id", state: employeeId, setState: setEmployeeId, name: "employeeId" },
    { label: "Skill Name", state: skillId, setState: setSkillId, name: "skillId", isSelect: true },
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
                {options
                    ? options.map((option) => (  
                        <option key={option} value={option}>{option}</option>
                    ))
                    : categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
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


                                       <div className=" flex justify-end gap-2 mt-[1rem]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-[91px] h-[40px] border !border-[#013579] rounded-md text-[#013579] font-semibold text-[14px] leading-[21px] text-center"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-[91px] h-[40px] border border-[#013579] rounded-md bg-[#013579] text-white font-semibold text-[14px] leading-[21px]  text-center"
                            disabled={loading}

                        >
                            Submit
                        </button> </div>
                </form>
            </div>
        </>
    );
};

export default AddTrainigs;
