import { IGlobalComponentProps } from './global.interface';

export interface IProfileCardProps extends IGlobalComponentProps {
  name: string;
  jobTitle: string;
  rating: number;
  imageSrc: string;
  reviewContent: string;
  orderId: string;
  createdAt: string;
}

export interface IRating extends IGlobalComponentProps {
  name: string;
  jobTitle: string;
  rating: number;
  imageSrc: string;
  reviewContent: string;
}

export interface IReview extends IGlobalComponentProps {
  _id: string;
  order: {
    _id: string;
    orderId: string;
    items: Array<{ title: string }>;
    user: {
      _id: string;
      name: string;
      email: string;
    };
  };
  restaurant: {
    _id: string;
    name: string;
    image: string;
  };
  rating: number;
  description: string;
  createdAt: string;
}

export interface ICustomDataViewProps extends IGlobalComponentProps {
  products: IReview[];
  header: React.ReactNode;
}

export interface IItems extends IGlobalComponentProps {
  title: string;
}
