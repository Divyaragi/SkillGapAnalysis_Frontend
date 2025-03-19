import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import closeImage from '../../assets/images/closeIcon.png'
const SkillModal = ({ onClose,refreshSkills  }) => {
  const [categories, setCategories] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    fetch("http://localhost:3002/skills/skill-categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.data.skillsCategories)) // Correct path
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/skills/add-skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skill_name: skillName,
          category_id: selectedCategory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add skill");
      }

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Skill added successfully!",
        showConfirmButton: true,
      });
            refreshSkills();

      onClose();
    } catch (error) {
      console.error("Error adding skill:", error);
      Swal.fire({
        icon: "warning",
        title: "Failed to add the skill!",
        text: "Please try again.",
      });
      setError("Failed to add skill. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay to disable interactions with background */}
      <div className="fixed inset-0  bg-opacity-30 z-40" onClick={onClose} />

      {/* Modal Panel */}
      <div className="fixed top-0 right-0 h-full w-[310px] bg-white border-l border-gray-300 shadow-lg z-50 transition-transform transform translate-x-0">
        {/* Header */}
        <div className="flex justify-between items-center p-2 border-b">
          <h2 className="text-lg font-semibold">Add Skills</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
  <img src={closeImage} alt="Close" className="w-5 h-5" />
</button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          {/* Role Field */}
          {/* <div>
            <label className="block text-sm font-medium">
              Skill Name <span className="text-red-500">*</span>
            </label>
            <select className="border p-2 rounded w-full">
              <option>Select</option>
            </select>
          </div> */}

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium">
              Skill Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter"
              value={skillName}
              onChange={(e) => {
                setSkillName(e.target.value);
                setError(""); // Clear error when typing
              }}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Department Field */}
          <div>
            <label  value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setError(""); // Clear error when selecting a category
              }} className="block text-sm font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <select
  value={selectedCategory}
  onChange={(e) => {
    setSelectedCategory(e.target.value);
    setError(""); // Clear error when selecting a category
  }}
  className="border p-2 rounded w-full"
  required
>
  <option value="">Select</option>
  {categories.map((category) => (
    <option key={category.category_id} value={category.category_id}>
      {category.category_name} {/* Corrected mapping */}
    </option>
  ))}
</select>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Show error message */}
          </div>
          <div className=" flex justify-end gap-2 mt-[15rem]">
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

export default SkillModal;
