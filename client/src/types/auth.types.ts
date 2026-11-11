export type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type ResetPasswordForm = {
  newPassword: string;
  confirmNewPassword: string;
};
