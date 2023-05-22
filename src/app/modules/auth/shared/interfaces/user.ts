export interface UserType {
  name: string;
  scopes: string[];
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
  is_active: boolean;
  is_verified: boolean;
}
