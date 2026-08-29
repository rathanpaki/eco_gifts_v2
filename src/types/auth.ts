export type AuthError = {
  message: string;
};

export type SignInValues = {
  email: string;
  password: string;
};

export type SignUpValues = SignInValues & {
  fullName: string;
  marketingOptIn: boolean;
};

export type PasswordResetValues = {
  email: string;
};

export type SessionUser = {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  role: "USER" | "ADMIN";
};
