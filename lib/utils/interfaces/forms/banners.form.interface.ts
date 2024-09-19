export type IBannersForm = {
  title: string;
  description: string;
  action: 'navigate' | 'openModal';
  screen: string;
  file: string;
};

export interface IBannersErrors {
  title: string[];
  description: string[];
  action: string[];
  screen: string[];
  file: string[];
}
