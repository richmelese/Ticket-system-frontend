// /* eslint-disable @typescript-eslint/no-explicit-any */
// // EventPage.tsx
// import  { useState } from "react";
// import HeaderCard from "../Components/HeaderCard";

// import { useContext, useEffect } from "react";
// import AlertContext from "../Contexts/AlertContext";
// import MainAPI from "../API/MainAPI";
// import AuthContext from "../Contexts/AuthContext";
// import ContactUs from "../Interfaces/ContactUs"; 
// import Table from "../Components/Table";
// import { useNavigate } from "react-router-dom";

// const ContactUsPage = () => {
 

//   const [contactUs, setCountactUs] = useState<ContactUs[]>([]);

//   const { setWaiting } = useContext(AlertContext);
//   const { cookies } = useContext(AuthContext);
//    const navigate = useNavigate();


//   const [paging, setPaging] = useState({
//     pageSize: 10,
//     totalCount: 0,
//     currentPage: 1,
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setWaiting(true);
//       try {
//         const response = await MainAPI.getAll(cookies.login_token, "crud/getlist/contactUs", paging.currentPage, paging.pageSize);
//         console.log("Fetched users:", response);
//         setPaging((prevPaging) => ({ 
//           ...prevPaging, 
//           totalCount: response.TotalCount,
//         }));
//         setCountactUs(response.Items);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setWaiting(false);
//       }
//     };
  
//     fetchUsers();
//   }, [cookies.login_token, paging.currentPage, paging.pageSize]);


//   const data = contactUs.map((event) => ({
//     id: event.id,
//     type: "tableData", 
//     full_name: event.full_name,
//     createdAt: new Date(event.createdAt).toISOString().split("T")[0],
//     subject: event.subject,
//     message:   event.message.length > 50 
//     ? `${event.message.substring(0, 50)}...` 
//     : event.message,
    
//   }));
  

  
//   const columns = [
//     { header: "User name", key: "full_name", filterable: true },
//     { header: "Date", key: "createdAt", filterable: true },
//     { header: "Subject", key: "subject", filterable: true },
//     { header: "Message", key: "message", filterable: true },
//     { header: "Action", key: "action", filterable: false },
//   ];

//   const handleAction = (action: any, row: any) => {
//     console.log('row', row.id);
//     switch (action) {
//       case "edit":
       
//        navigate(`/contactUs/${row.id}`)
//         break;
//       case "delete":
        
//         alert(`Deleting ${row.name}`);
//         break;
//       case "view":
//         navigate(`/contactUs/v1/${row.id}`)
//         break;
//       default:
//         break;
//     }
//   };
//   const allowedActions = {
    
//     edit: false,
//     view: true,
//     delete: true,
   
//   }

//   return (
//     <div className="p-4">
//      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h1>
//       <HeaderCard
//         title="Total Messages"
//         value={contactUs.length.toString()}
//         icon={<img src="images/chat.png" width={30} height={30} style={{ color: "##F5E5FF", fontSize: "2rem" }} />} width={""}      />

  

// <div className="mt-5">
//       <Table
//         columns={columns}
//         data={data}
//         onAction={handleAction} 
//         allowedActions={allowedActions}
//       />
//       </div>
      
//     </div>
//   );
// };

// export default ContactUsPage;
