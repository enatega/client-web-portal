import { TSideBarFormPosition } from '../types/sidebar';
import { IDropdownSelectItem, IGlobalComponentProps } from './global.interface';
import { IRestaurantResponse } from './restaurant.interface';

export interface IRestaurantsSelectedVendor {
  _id: IDropdownSelectItem | null;
}

export interface IRestaurantsContextProps {
  isRestaurantsFormVisible: boolean;
  onRestaurantsFormVisible: (status: boolean) => void;
  activeIndex: number;
  onActiveStepChange: (activeStep: number) => void;
  onClearRestaurntsData: () => void;
  restaurantsVendor: IRestaurantsSelectedVendor | undefined;
  onSetRestaurantsVendor: (
    vendor: IRestaurantsSelectedVendor | undefined
  ) => void;
}

export interface IRestaurantsProvider extends IGlobalComponentProps {}

export interface IRestaurantsAddFormComponentProps
  extends IGlobalComponentProps {
  position?: TSideBarFormPosition;
  isAddRestaurantVisible: boolean;
  restaurant: IRestaurantResponse | null;
  onHide: () => void;
}
export interface IRestaurantsHeaderProps {
  globalFilterValue: string;
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedActions: string[];
  setSelectedActions: (actions: string[]) => void;
  setIsAddRestaurantVisible: (visible: boolean) => void;
}

export interface IRestaurantsMainComponentsProps extends IGlobalComponentProps {
  setIsAddRestaurantVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRestaurant: React.Dispatch<
    React.SetStateAction<IRestaurantResponse | null>
  >;
}

// Components
interface IStepperFormProps {
  order: number;
  isLastStep?: boolean;
  onStepChange: (order: number) => void;
}

export interface IRestaurantsVendorDetailsComponentProps
  extends IGlobalComponentProps {
  stepperProps?: IStepperFormProps;
  vendorsDropdown: IDropdownSelectItem[];
}
export interface IRestaurantsAddRestaurantComponentProps
  extends IGlobalComponentProps {
  stepperProps?: IStepperFormProps;
}
export interface IRestaurantsRestaurantLocationComponentProps
  extends IGlobalComponentProps {
  stepperProps?: IStepperFormProps;
}
