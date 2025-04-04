
import React, { useCallback, useState, useEffect } from "react";
import Swal from "sweetalert2";
import closeImage from '../../assets/images/closeIcon.png';

const AddRatings = ({ onClose, refreshSkills, user_id }) => {
    const [categories, setCategories] = useState([]);
    const [skillId, setSkillId] = useState("");
    const [selfRating, setSelfRating] = useState("");
    const [requiredRating, setRequiredRating] = useState("");
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    console.log("user id*************",user_id);
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

    const validateForm = () => {
        let errors = {};
        if (!skillId) errors.skill = "Please select a skill.";
        if (!selfRating) errors.self = "Please select a self rating.";
        // if (!requiredRating) errors.required = "Please select a required rating.";
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        console.log("Submitting data:", { user_id, skill_id: skillId, self_rating: Number(selfRating) });
    
        try {
            const response = await fetch("http://localhost:3002/skills/insert-skill-ratings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: Number(user_id),
                    skill_id: skillId,
                    self_rating: Number(selfRating),
                    // required_rating: Number(requiredRating)
                })
            });

            const data = await response.json();
            if (data.success) {
                Swal.fire({ icon: "success", title: "Rating added successfully!", showConfirmButton: true });
                // onRatingIdUpdate(data.data.rating_id);
                refreshSkills();
                onClose();
            } else {
                throw new Error(data.message || "Failed to add Ratings");
            }
        } catch (error) {
            console.error("Error adding Ratings:", error);
            Swal.fire({ icon: "warning", title: "Failed to add Ratings!", text: error.message || "Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-opacity-30 z-40" onClick={onClose} />
            <div className="fixed top-0 right-0 h-full w-[310px] bg-white border-l border-gray-300 shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-2 border-b">
                    <h2 className="text-lg font-semibold">Add Ratings</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">
                        <img src={closeImage} alt="Close" className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-black text-left mb-1">Skill Name <span className="text-red-500">*</span></label>
                        <select value={skillId} onChange={(e) => { setSkillId(e.target.value); setError({ ...error, skill: "" }); }} className="border p-2 rounded w-full text-black">
                            <option value="">Select</option>
                            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>
                        {error.skill && <p className="text-red-500 text-sm mt-1">{error.skill}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black text-left mb-1">Self Rating <span className="text-red-500">*</span></label>
                        <select value={selfRating} onChange={(e) => { setSelfRating(e.target.value); setError({ ...error, self: "" }); }} className="border p-2 rounded w-full text-black">
                            <option value="">Select Rating</option>
                            {[1,1.5,2,2.5,3,3.5,4,4.5,5].map(num => <option key={num} value={num}>{num}</option>)}
                        </select>
                        {error.self && <p className="text-red-500 text-sm mt-1">{error.self}</p>}
                    </div>
                    <div>
                        {/* <label className="block text-sm font-medium text-black text-left mb-1">Required Rating <span className="text-red-500">*</span></label>
                        <select value={requiredRating} onChange={(e) => { setRequiredRating(e.target.value); setError({ ...error, required: "" }); }} className="border p-2 rounded w-full text-black">
                            <option value="">Select Rating</option>
                            {[1,1.5,2,2.5,3,3.5,4,4.5,5].map(num => <option key={num} value={num}>{num}</option>)}
                        </select>
                        {error.required && <p className="text-red-500 text-sm mt-1">{error.required}</p>} */}
                    </div>
                    <div className="flex justify-end gap-2 mt-10">
                        <button type="button" onClick={onClose} className="w-[91px] h-[40px] border border-[#013579] rounded-md text-[#013579] font-semibold text-[14px]">Cancel</button>
                        <button type="submit" className="w-[91px] h-[40px] border border-[#013579] rounded-md bg-[#013579] text-white font-semibold text-[14px]" disabled={loading}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddRatings;
