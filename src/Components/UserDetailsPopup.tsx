
import React from "react";
import ParticipantData from "../Interfaces/ParticipantData";
import MainAPI from "../API/MainAPI";

interface UserDetailsPopupProps {
  participant: ParticipantData;
  onClose: () => void;
  eventType: string
}

const UserDetailsPopup: React.FC<UserDetailsPopupProps> = ({ participant, onClose, eventType }) => {
    const imageUrl = new MainAPI().imageUrl;
  return (
    

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white  md:w-3/4 lg:w-1/2 p-6  rounded-lg shadow-lg relative">
      
      <button
        className="absolute top-4 left-4 bg-white hover:bg-gray-300 text-[#202224] text-xl rounded border border-[#AFAEAE] w-8 h-8 flex items-center justify-center"
        onClick={onClose}
      >
        ←
      </button>

     
      <h2 className="text-xl font-semibold mb-4 text-center">
        Registered Users Detail
      </h2>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div>
            <label className="block text-sm font-medium text-gray-700">
            Full Name
            </label>
            <input
            type="text"
            value={participant.full_name}
            readOnly
            className="bg-gray-50 text-gray-800 rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]" 
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">
            Email
            </label>
            <input
            type="email"
            value={participant.email}
            readOnly
            className="bg-gray-50 text-gray-800 rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]" 
            />
        </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Phone Number
    </label>
    <input
      type="text"
      value={participant.phone}
      readOnly
      className="bg-gray-50 text-gray-800 rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]" 
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Age
    </label>
    <input
      type="number"
      value="30"
      readOnly
      className="bg-gray-50 text-gray-800 rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]" 
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Number of Tickets Purchased
    </label>
    <input
      type="number"
      value={participant.total_number_of_seat}
      readOnly
      className="bg-gray-50 text-gray-800 rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]" 
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Gender
    </label>
    <input
      type="text"
      value={participant.gender}
      readOnly
      className="bg-gray-50 text-gray-800 rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]" 
    />
  </div>
</div>


  {eventType === "paid" && (
          <>
            <h3 className="text-lg font-semibold mt-8 mb-4">Payment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-11">
              <div>
                <label className="block text-sm font-medium text-gray-700">Receipt Image</label>
                <div className="mt-1 flex items-center justify-center border border-gray-300 rounded-md shadow-sm p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Receipt.pdf</p>
                    <p className="text-xs text-gray-500">700 KB</p>
                    <a
                      href={`${imageUrl}/${participant.receipt_id}`}
                      target="_blank"
                      className="text-indigo-600 hover:underline text-sm mt-2 block"
                    >
                      Click to view
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bank or Digital Wallet Name</label>
                <input
                  type="text"
                  value={participant.bank_name}
                  readOnly
                  className="bg-gray-50 text-gray-800 rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]"
                />
              </div>
            </div>
          </>
        )}
     
    </div>
  </div>
  );
};

export default UserDetailsPopup;
