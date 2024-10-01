'use client';

// Core imports
import { useContext, useMemo, useRef } from 'react';


// PrimeReact components
import { Sidebar } from 'primereact/sidebar';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';

// Interfaces
import { ICategory, ICategoryByRestaurantResponse, IFoodAddFormComponentProps, IQueryResult } from '@/lib/utils/interfaces';
import { FoodsContext } from '@/lib/context/foods.context';
import FoodDetails from './food.index';
import { GET_CATEGORY_BY_RESTAURANT_ID } from '@/lib/api/graphql';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import VariationAddForm from './variations';


const FoodForm = ({ position = "right" }: IFoodAddFormComponentProps) => {
  // Ref
  const stepperRef = useRef(null);

  // Context
  const { activeIndex, isFoodFormVisible, onClearFoodData, onActiveStepChange } = useContext(FoodsContext)
  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext)


  // Query
  const { data } = useQueryGQL(
    GET_CATEGORY_BY_RESTAURANT_ID,
    { id: restaurantLayoutContextData?.restaurantId ?? "" },
    {
      fetchPolicy: 'network-only',
      enabled: !!restaurantLayoutContextData?.restaurantId,
      // onCompleted: onFetchCategoriesByRestaurantCompleted,
      //  onError: onErrorFetchCategoriesByRestaurant,
    }
  ) as IQueryResult<ICategoryByRestaurantResponse | undefined, undefined>;

  // Memo
  // Memoized Data
  const categoriesDropdown = useMemo(
    () =>
      data?.restaurant?.categories.map((category: ICategory) => {
        return { label: category.title, code: category._id };
      }),
    [data?.restaurant?.categories]
  );




  // Handlers
  const onHandleStepChange = (order: number) => {
    onActiveStepChange(order);
  };

  const onSidebarHideHandler = () => {
    onClearFoodData()
  };



  return (
    <Sidebar
      visible={isFoodFormVisible}
      position={position}
      onHide={onSidebarHideHandler}
      className="w-full sm:w-[600px]">
      <div ref={stepperRef}>
        <Stepper linear headerPosition="bottom" activeStep={activeIndex}>
          <StepperPanel header="Add Food">
            <FoodDetails categoryDropdown={categoriesDropdown ?? []}
              stepperProps={{
                onStepChange: onHandleStepChange,
                order: activeIndex,
              }} />
          </StepperPanel>
          <StepperPanel header="Add Variations">
            <VariationAddForm stepperProps={{
              onStepChange: onHandleStepChange,
              order: activeIndex,
            }} />
          </StepperPanel>
          <StepperPanel header="Add Addons">
            <div>Addons</div>
          </StepperPanel>
        </Stepper>
      </div>
    </Sidebar>
  );
};

export default FoodForm;
