export interface IOptionForm {
  _id?: string;
  title: string;
  description: string;
  price: number;
}

export interface IOptionErrors {
  _id?: string[];
  title: string[];
  description: string[];
  price: string[];
}
export interface IOptionError {
  _id?: string;
  title: string;
  description: string;
  price: string;
}
