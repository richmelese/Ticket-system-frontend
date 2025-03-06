export default interface ParticipantData {
    id: number;
    event_id: number;
    full_name: string;
    email: string;
    gender: string;
    phone: string;
    age: number;
    total_number_of_seat: number;
    is_paid: boolean;
    bank_name: string;
    receipt_id: number;
    createdAt: string;  
    updatedAt: string;  
}
