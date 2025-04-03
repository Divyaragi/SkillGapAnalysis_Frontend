import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import closeImage from '../../assets/images/closeIcon.png';

const EditTrainigsModal = ({ TrainingsData, onClose, refreshTrainings }) => {
  const [employeeID, setEmployeeID] = useState(TrainingsData.employee_id);
  const [employeeName, setEmployeeName] = useState(TrainingsData.employee_Name);
  const [duration, setDuration] = useState(TrainingsData.duration);
  const [material, setMaterial] = useState(TrainingsData.material);
  const [selectedCategory, setSelectedCategory] = useState(TrainingsData.training_Type);
  const categories = ["Workshop", "Online Course", "Ebook", "Webinar"];
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }
    setLoading(true);
    console.log("TrainingsData.provider_id", TrainingsData.provider_id);
// const providerID= Number(TrainingsData.provider_id);
// console.log("providerID*******",providerID);

    try {
      const response = await fetch(`http://localhost:3002/training-resources/edit-training-resource?id=${TrainingsData.resource_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resource_type: selectedCategory,
          provider_id: TrainingsData.provider_id,
          duration: duration,
          materials: material,
          skill_id: TrainingsData.skill_id
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Update Response:", result);

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Training updated successfully!",
          showConfirmButton: true,
        });
        // refreshTrainings();
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update Training",
          text: result.message || "Please try again.",
        });
      }
    } catch (error) {
      console.error("Error updating Training:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="fixed inset-0  bg-opacity-30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[310px] bg-white border-l border-gray-300 shadow-lg z-50 transition-transform transform translate-x-0">
        <div className="flex justify-between items-center p-2 border-b">
          <h2 className="text-lg font-semibold">Edit Trainings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <img src={closeImage} alt="Close" className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleUpdate} className="p-4 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">
              Employee ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter"
              value={employeeID}
              readOnly
              onChange={(e) => {
                setEmployeeID(e.target.value);
                setError("");
              }}
              className="border p-2 rounded w-full bg-gray-200 text-gray-500 read-only-input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter"
              value={employeeName}
              readOnly
              onChange={(e) => {
                setEmployeeName(e.target.value);
                setError("");
              }}
              className="border p-2 rounded w-full bg-gray-200 text-gray-500 read-only-input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Training Type <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setError("");
              }}
              className="border p-2 rounded w-full"
              required
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                setError("");
              }}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Material <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter"
              value={material}
              onChange={(e) => {
                setMaterial(e.target.value);
                setError("");
              }}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-[0.5rem]">
            <button
              type="button"
              onClick={onClose}
              className="w-[91px] h-[40px] border border-[#013579] rounded-md text-[#013579] font-semibold text-[14px] leading-[21px] text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[91px] h-[40px] border border-[#013579] rounded-md bg-[#013579] text-white font-semibold text-[14px] leading-[21px] text-center"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTrainigsModal;
