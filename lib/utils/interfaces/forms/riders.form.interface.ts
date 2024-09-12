export interface IRiderForm {
  riderName: string;
  riderEmail: string;
  riderPassword: string;
  riderConfirmPassword: string;
  riderPhoneNumber: string;
  riderZone: string;
}

export interface IRiderErrors {
  name: string[];
  email: string[];
  password: string[];
  confirmPassword: string[];
}
