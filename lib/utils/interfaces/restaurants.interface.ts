import { TSideBarFormPosition } from '../types/sidebar';
import { IDropdownSelectItem, IGlobalComponentProps } from './global.interface';

export interface IRestaurantsSelectedVendorData {
  restaurant?: {
    _id: IDropdownSelectItem | null;
  };
  vendor?: {
    _id: IDropdownSelectItem | null;
  };
  isEditing?: boolean;
}

export interface IRestaurantsContextProps {
  isRestaurantsFormVisible: boolean;
  onRestaurantsFormVisible: (status: boolean) => void;
  activeIndex: number;
  onActiveStepChange: (activeStep: number) => void;
  onClearRestaurntsData: () => void;
  restaurantsContextData: IRestaurantsSelectedVendorData | null;
  onSetRestaurantsContextData: (
    data: IRestaurantsSelectedVendorData | null
  ) => void;
}

export interface IRestaurantsProvider extends IGlobalComponentProps {}

export interface IRestaurantsAddFormComponentProps
  extends IGlobalComponentProps {
  position?: TSideBarFormPosition;
}
export interface IRestaurantsHeaderProps {
  globalFilterValue: string;
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedActions: string[];
  setSelectedActions: (actions: string[]) => void;
}

export interface IRestaurantsMainComponentsProps
  extends IGlobalComponentProps {}

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
