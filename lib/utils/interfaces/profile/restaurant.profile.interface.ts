import { IGlobalComponentProps } from "../global.interface";
import { IProvider } from "../layout.interface";
import { IQueryResult } from '@/lib/utils/interfaces';


export interface IProfileProviderProps extends IProvider{
}

export interface IProfileHeaderProps extends IGlobalComponentProps {
    setIsUpdateProfileVisible: (visible: boolean) => void;
  }

  export interface IRestaurantData extends IGlobalComponentProps {
    restaurant: IRestaurantData | undefined;
    restaurantName: string;
    username: string;
    password: string;
    image: string;
    logo: string;
    name: string;
    address: string;
    deliveryTime?: number;
    minimumOrder?: number;
    tax?: number;
    orderPrefix: string;
    shopType: string;
    cuisines: string;
  }

  export interface IRestaurantProfileProps extends IGlobalComponentProps {
   restaurant: IRestaurantData
  }

  export interface IInfoItemProps extends IGlobalComponentProps {
    label?: string;
    value?: string;
  }

  export interface IProfileContextData extends IGlobalComponentProps {
    isUpdateProfileVisible: boolean;
    setIsUpdateProfileVisible: (isVisible: boolean) => void;
    handleUpdateProfile: () => void;
    restaurantProfileResponse: IQueryResult< IRestaurantProfileProps | undefined, undefined>;
  }
  


  