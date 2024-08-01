export interface ISignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignFormErrors {
  firstName: string[];
  lastName: string[];
  email: string[];
  password: string[];
  confirmPassword: string[];
}
