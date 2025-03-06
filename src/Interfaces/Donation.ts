export default interface Donation {
    id: number;
    donater_name: string;
    amount: number;
    bank_name: string;
    receipt_id: number;
    is_paid: boolean;
    createdAt: string; 
    updatedAt: string; 
  }