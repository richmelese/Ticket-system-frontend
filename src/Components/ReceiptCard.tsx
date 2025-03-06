/* eslint-disable @typescript-eslint/no-explicit-any */

import MainAPI from "../API/MainAPI";


function ReceiptCard({ receiptId }: any) {
  const imageUrl = new MainAPI().imageUrl; 
  const handleOpenPdf = () => {
    if (receiptId) {
      const pdfUrl = `${imageUrl}/${receiptId}`; 
      window.open(pdfUrl, '_blank');
    } else {
      alert('Receipt not available');
    }
  };

  return (
    <>
      <h2 className="text-xs ml-20 text-gray-800 mb-0">Receipt Image</h2>
      <div className="max-w-96 bg-[#E8E0E0] rounded-lg border border-[#B2B2B2] shadow p-4 ml-20">
        <div className="flex items-start gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Receipt.pdf</p>
            <p className="text-xs text-gray-500">700 KB</p>
          </div>
        </div>
        <button
          onClick={handleOpenPdf}
          className="block mt-4 text-sm font-medium text-purple-600 hover:underline"
        >
          Click to view
        </button>
      </div>
    </>
  );
}

export default ReceiptCard;
