export default interface Event {
    id: number;
    event_name: string;
    event_description: string;
    start_date: string; 
    end_date: string; 
    location: string;
    event_start_time: string; 
    event_type: "free" | "paid"; 
    event_image_id: number;
    amount: number | null;
    status: "pending" | "active" | "completed"; 
    createdAt: string; 
    updatedAt: string;
  }
  