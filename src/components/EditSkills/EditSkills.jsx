import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import closeImage from '../../assets/images/closeIcon.png';

const EditSkillModal = ({ skillData, onClose, refreshSkills }) => {
  const [skillName, setSkillName] = useState(skillData.skill);
  const [selectedCategory, setSelectedCategory] = useState(skillData.category);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    fetch("http://localhost:3002/skills/skill-categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.data.skillsCategories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3002/skills/update-skill?skill_id=${skillData.skill_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skill_id: skillData.skill_id,
          skill_name: skillName,
          category_name: selectedCategory,
        }),
      });
console.log("response*********",response)
      const result = await response.json();

      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Skill updated successfully!",
          showConfirmButton: true,
        });
        refreshSkills();
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update skill",
          text: "Please try again.",
        });
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Please try again later.",
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
          <h2 className="text-lg font-semibold">Edit Skill</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <img src={closeImage} alt="Close" className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleUpdate} className="p-4 flex flex-col gap-4">
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
                setError(""); 
              }}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Category <span className="text-red-500">*</span>
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
              <option value="">Select</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-end gap-2 mt-[15rem]">
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

export default EditSkillModal;
