

// import React, { useContext, useEffect, useState } from "react";
// import { Button } from "@mui/material";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import AuthContext from "../Contexts/AuthContext";
// import MainAPI from "../API/MainAPI"; 
// import LookUp from "../Interfaces/Lookup";

// const CounselingForm = () => {
//   const { id } = useParams();
//   const { pathname } = useLocation();
//   const { cookies } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const isViewMode = pathname.includes("/v1/");


//   // State to store fetched data
//   const [counselingData, setCounselingData] = useState<any>(null);
//   const [buttonText, setButtonText] = useState<string>("");
//   const [counselingStatus, setCounselingStatus] = useState<LookUp[]>([]);
//   const [selectedStatus, setSelectedStatus] = useState<string>("");


//   useEffect(() => {
//     const fetchCounselingData = async () => {
//       try {
//         const response = await MainAPI.getSingle(
//           cookies.login_token,
//           `crud/getform/counseling`,
//           Number(id)
//         );
  
//         if (response?.status) {
//           // Normalize the status to lowercase for comparison
//           const normalizedStatus = response.status.toLowerCase();
  
//           setButtonText(normalizedStatus === "solved" ? "Solved" : "NotSolved");
//           setCounselingData(response);
//         } else {
//           console.error("Unexpected response format:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching counseling data:", error);
//         setButtonText("Error");
//       }
//     };
  
//     fetchCounselingData();
//   }, [id, cookies.login_token]);
  

//   useEffect(() => {
//     const fetchCounselingStatus = async () => {
//       try {
//         const condition = {
//           category: {
//             operator: "equal",
//             value: "counselingStatus",
//           },
//         };
//         const response = await MainAPI.getAll(
//           cookies.login_token,
//           "crud/getlist/lookup",
//           1,
//           100,
//           condition
//         );
//         setCounselingStatus(response.Items || []);
//       } catch (error) {
//         console.error("Error fetching counseling statuses:", error);
//       }
//     };

//     fetchCounselingStatus();
//   }, [cookies.login_token]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedStatus(e.target.value);
//   };

//   const handleUpdateStatus = async () => {
//     if (!selectedStatus) {
//       alert("Please select a counseling status to update.");
//       return;
//     }

//       const dataToUpdate = {
//       tableName: "counseling",
//       data: {
//         id: counselingData?.id,
//         type: counselingData?.type,
//         number_of_participant: counselingData?.number_of_participant,
//         full_name: counselingData?.full_name,
//         age: counselingData?.age,
//         gender: counselingData?.gender,
//         marital_status: counselingData?.marital_status,
//         occupation_status: counselingData?.occupation_status,
//         reason: counselingData?.reason,
//         status: selectedStatus, // Adding the updated status
//       },
//     };

//     try {
//       const response = await MainAPI.update(
//         cookies.login_token,
//         "crud/update",
//         dataToUpdate
//       );

//       if (response.success) {
//         alert("Status updated successfully!");
//         setCounselingData((prev: any) => ({
//           ...prev,
//           status: selectedStatus,
//         }));
//       } else {
//       alert(`${response.message}`);
//       }
//     } catch (error) {
//       console.error("Error updating counseling status:", error);
//       alert("An error occurred while updating the status.");
//     }
//   };

//   return (
//     <div className="items-center p-7 min-h-screen">
//       {/* Back Button */}
//       <div className="mb-4">
//         <Button
//           variant="outlined"
//           sx={{
//             backgroundColor: "#f9fafb",
//             color: "black",
//             borderColor: "#e2e8f0",
//           }}
//           onClick={() => navigate(-1)}
//         >
//           &larr;
//         </Button>
//       </div>

//       {/* Main Content */}
//       <div className="bg-white rounded-lg shadow p-8">
//         {/* Header */}
//         <div className="pb-4 mb-6 p-2">
//           <h2 className="text-lg ml-16 font-bold">Counseling Detail</h2>
//         </div>

//         {/* Form */}
//         <div className="w-[800px] ml-[200px]">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//             {/* Read-Only Inputs */}
//             {[
//               { label: "Counseling Type", value: counselingData?.type },
//               { label: "Number of Attendees", value: counselingData?.number_of_participant },
//               { label: "Age", value: counselingData?.age },
//               { label: "Gender", value: counselingData?.gender },
//               { label: "Marital Status", value: counselingData?.marital_status },
//               { label: "Occupation Status", value: counselingData?.occupation_status },
//             ].map((field, index) => (
//               <div key={index}>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   {field.label}
//                 </label>
//                 <input
//                   type="text"
//                   value={field.value || "Loading..."}
//                   readOnly
//                   className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-800"
//                 />
//               </div>
//             ))}

//             {/* Reason */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Why do you seek counseling?
//               </label>
//               <textarea
//                 value={counselingData?.reason || "Loading..."}
//                 readOnly
//                 className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-800"
//                 rows={5}
//               />
//             </div>

//             {/* Counseling Status Dropdown */}
//             <div className="flex flex-col">
//               <label className="text-gray-600 text-sm mb-2">Counseling Status</label>
//               <select
//                 name="counselingStatus"
//                 value={selectedStatus}
//                 onChange={handleInputChange}
//                 className="bg-gray-50 text-gray-800 rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Counseling Status</option>
//                 {counselingStatus.map((status) => (
//                   <option key={status.id} value={status.value}>
//                     {status.value}
//                   </option>
//                 ))}
//               </select>
//               <div className="flex justify-center mt-6 ml-4">
//             <button className="bg-green-100 text-green-700 font-semibold py-2 px-6 rounded-md hover:bg-green-200  w-[200px]">
//               {buttonText || "Loading..."}
//             </button>
//           </div>

//             </div>


//             {/* Update Status Button */}
//             {!isViewMode && (
//             <div className=" mt-6 ml-4">
//               <button
//                 onClick={handleUpdateStatus}
//                 className="bg-black text-white px-6 py-2 rounded-md shadow-lg hover:bg-gray-800 transition-colors"
//               >
//                 Update Status
//               </button>
//             </div>
//             )}
//           </div>

//           {/* Solved Button */}
//           {/* <div className="flex justify-center mt-6 ml-4">
//             <button className="bg-green-100 text-green-700 font-semibold py-2 px-6 rounded-md hover:bg-green-200">
//               {buttonText || "Loading..."}
//             </button>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CounselingForm;
