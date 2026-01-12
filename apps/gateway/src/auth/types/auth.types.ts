export type UserContext = {
  clerkUserID: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user';
  isAdmin: boolean;
};
