import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import closeImage from '../../assets/images/closeIcon.png'
const ViewProficiencyLevel = ({ onClose, refreshSkills, user_id, onRatingIdUpdate }) => {
    const [categories, setCategories] = useState([]);
    const [skillName, setSkillName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [skillId, setSkillId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [managerRating, setManagerRating] = useState("");
    const [requiredRating, setRequiredRating] = useState("");
    return (
        <>
          <div className="fixed inset-0  bg-opacity-30 z-40" onClick={onClose} />
          <div className="fixed top-0 right-0 h-full w-[310px] bg-white border-l border-gray-300 shadow-lg z-50 transition-transform transform translate-x-0"
            onClick={(e) => e.stopPropagation()} >
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-2 border-b">
              <h2 className="text-lg font-semibold">Proficiency Levels Criteria</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-black">
                {/* <MdClose className="w-5 h-5" /> */}
                <img src={closeImage} alt="Close" className="w-5 h-5" />

              </button>
            </div>
    
            {/* Proficiency Levels Table */}
            <div className="p-4">
              <table className="w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Rating</th>
                    <th className="border border-gray-300 p-2">Proficiency Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">4.5 - 5.0</td>
                    <td className="border border-gray-300 p-2 text-center">Expert</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">3.5 - 4.4</td>
                    <td className="border border-gray-300 p-2 text-center">Advanced</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">2.5 - 3.4</td>
                    <td className="border border-gray-300 p-2 text-center">Intermediate</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">0 - 2.4</td>
                    <td className="border border-gray-300 p-2 text-center">Beginner</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
};

export default ViewProficiencyLevel;
