export default interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    user_role: string;
    status: string;
    profile_picture_id: number | null;
    createdAt: string;
    updatedAt: string;
  }
  
