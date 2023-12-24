export type User = {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string | null;
  photoURL?: string | null;
};
