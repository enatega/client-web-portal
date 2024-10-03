import React, { useContext, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { ProfileContext } from '@/lib/context/profile.context';
import UpdateRestaurantDetails from './update-profile-detail';
import UpdateRestaurantLocation from './update-restaurant-location';
import { IRestaurantsAddFormComponentProps } from '@/lib/utils/interfaces';

const UpdateRestaurantsProfileForm = ({
  position = 'right',
}: IRestaurantsAddFormComponentProps) => {
  const stepperRef = useRef(null);

  const {
    isUpdateProfileVisible,
    setIsUpdateProfileVisible,
    activeIndex,
    onActiveStepChange,
  } = useContext(ProfileContext);

  const onHandleStepChange = (order: number) => {
    onActiveStepChange(order);
  };

  const onSidebarHideHandler = () => {
    onActiveStepChange(0);
    setIsUpdateProfileVisible(false);
  };

  return (
    <Sidebar
      visible={isUpdateProfileVisible}
      position={position}
      onHide={onSidebarHideHandler}
      className="w-full sm:w-[600px]"
    >
      <div ref={stepperRef}>
        <Stepper linear headerPosition="bottom" activeStep={activeIndex}>
          <StepperPanel header="Update Details">
            <UpdateRestaurantDetails
              stepperProps={{
                onStepChange: onHandleStepChange,
                order: activeIndex,
              }}
            />
          </StepperPanel>
          <StepperPanel header="Update Location">
            <UpdateRestaurantLocation
              stepperProps={{
                onStepChange: onHandleStepChange,
                order: activeIndex,
                isLastStep: true,
              }}
            />
          </StepperPanel>
        </Stepper>
      </div>
    </Sidebar>
  );
};

export default UpdateRestaurantsProfileForm;
