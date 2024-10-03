// Core
import { Fieldset } from 'primereact/fieldset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldArray, Form, Formik, FormikErrors, FormikProps } from 'formik';

// Interface and Types
import { IVariationForm } from '@/lib/utils/interfaces/forms';

// Components UI
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomNumberField from '@/lib/ui/useable-components/number-input-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Constants
import { MAX_PRICE, MIN_PRICE, VariationErrors } from '@/lib/utils/constants';

// Interfaces
import {
  IAddon,
  IAddonByRestaurantResponse,
  IDropdownSelectItem,
  IFoodGridItem,
  IFoodVariationsAddRestaurantComponentProps,
  IQueryResult,
} from '@/lib/utils/interfaces';
import { onErrorMessageMatcher } from '@/lib/utils/methods';

// Schema
import { VariationSchema } from '@/lib/utils/schema';

// Icons
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useContext, useMemo, useState } from 'react';
import { FoodsContext } from '@/lib/context/foods.context';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import {
  CREATE_FOOD,
  EDIT_FOOD,
  GET_ADDONS_BY_RESTAURANT_ID,
  GET_FOODS_BY_RESTAURANT_ID,
} from '@/lib/api/graphql';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';
import { ToastContext } from '@/lib/context/toast.context';
import CustomMultiSelectComponent from '@/lib/ui/useable-components/custom-multi-select';
import AddonAddForm from '../../../add-on/add-form';
import { useMutation } from '@apollo/client';

const initialFormValuesTemplate: IVariationForm = {
  title: '',
  price: 0,
  discount: 0,
  addons: null,
};

export default function VariationAddForm({
  stepperProps,
}: IFoodVariationsAddRestaurantComponentProps) {
  // Props
  const { onStepChange, order } = stepperProps ?? {
    onStepChange: () => {},
    type: '',
    order: -1,
  };

  // State
  const [isAddAddonVisible, setIsAddAddonVisible] = useState(false);
  const [addon, setAddon] = useState<IAddon | null>(null);

  // Context
  const { showToast } = useContext(ToastContext);
  const { onSetFoodContextData, foodContextData, onClearFoodData } =
    useContext(FoodsContext);
  const {
    restaurantLayoutContextData: { restaurantId },
  } = useContext(RestaurantLayoutContext);

  // Constants
  const initialValues = {
    variations:
      foodContextData?.isEditing ||
      (foodContextData?.food?.variations ?? [])?.length > 0
        ? (foodContextData?.food?.variations ?? [])
        : [
            {
              ...initialFormValuesTemplate,
            },
          ],
  };

  // Query
  const { data, loading } = useQueryGQL(
    GET_ADDONS_BY_RESTAURANT_ID,
    { id: restaurantId },
    {
      fetchPolicy: 'network-only',
      enabled: !!restaurantId,
      onCompleted: onFetchAddonsByRestaurantCompleted,
      onError: onErrorFetchAddonsByRestaurant,
    }
  ) as IQueryResult<IAddonByRestaurantResponse | undefined, undefined>;

  const [createFood] = useMutation(
    foodContextData?.isEditing ? EDIT_FOOD : CREATE_FOOD,
    {
      refetchQueries: [
        {
          query: GET_FOODS_BY_RESTAURANT_ID,
          variables: { id: restaurantId },
        },
      ],
      onCompleted: () => {
        showToast({
          type: 'success',
          title: `${foodContextData?.isEditing ? 'Edit' : 'New'} Food`,
          message: `Food has been ${foodContextData?.isEditing ? 'edited' : 'added'} successfully.`,
        });

        onClearFoodData();
      },
      onError: (error) => {
        let message = '';
        try {
          message = error.graphQLErrors[0]?.message;
        } catch (err) {
          message = 'Something went wrong.';
        }
        showToast({
          type: 'error',
          title: 'New Food',
          message,
        });
      },
    }
  );

  // Memoized Data
  const addonsDropdown = useMemo(
    () =>
      data?.restaurant?.addons.map((addon: IAddon) => {
        return { label: addon.title, code: addon._id };
      }),
    [data?.restaurant?.addons]
  );

  // API Handlers
  function onFetchAddonsByRestaurantCompleted() {}
  function onErrorFetchAddonsByRestaurant() {
    showToast({
      type: 'error',
      title: 'Addons Fetch',
      message: 'Addons fetch failed',
      duration: 2500,
    });
  }

  // Handlers
  const onHandleSubmit = ({ variations }: { variations: IVariationForm[] }) => {
    try {
      const _variations = variations.map(
        ({ discount, ...item }: IVariationForm) => {
          return {
            ...item,
            discounted: discount,
            addons: item?.addons?.map((item: IDropdownSelectItem) => item.code),
          };
        }
      );

      const foodInput = {
        _id: foodContextData?.food?._id ?? '',
        restaurant: restaurantId,
        ...foodContextData?.food?.data,
        category: foodContextData?.food?.data.category?.code,
        variations: _variations,
      };

      createFood({
        variables: {
          foodInput,
        },
      });
    } catch (err) {
      showToast({
        type: 'error',
        title: `${foodContextData?.isEditing ? 'Edit' : 'New'} Food`,
        message: `Food ${foodContextData?.isEditing ? 'edit' : 'creation'} failed`,
        duration: 2500,
      });
    }
  };

  const onBackClickHandler = ({
    variations,
  }: {
    variations: IVariationForm[];
  }) => {
    console.log({ back: foodContextData });
    onSetFoodContextData({
      food: {
        _id: foodContextData?.food?._id ?? '',
        data: foodContextData?.food?.data ?? ({} as IFoodGridItem),
        variations: variations,
      },
    });
    onStepChange(order - 1);
  };

  return (
    <div className="flex h-full w-full items-center justify-start">
      <div className="h-full w-full">
        <div className="flex flex-col gap-2">
          <div className="mb-2 flex flex-col">
            <span className="text-lg">Add Variation</span>
          </div>

          <div className="mb-2">
            <Formik
              initialValues={initialValues}
              validationSchema={VariationSchema}
              onSubmit={onHandleSubmit}
              enableReinitialize
            >
              {({
                values,
                errors,
                isSubmitting,
                setFieldValue,
                handleSubmit,
              }: FormikProps<{ variations: IVariationForm[] }>) => {
                const _errors: FormikErrors<IVariationForm>[] =
                  (errors?.variations as FormikErrors<IVariationForm>[]) ?? [];

                return (
                  <Form onSubmit={handleSubmit}>
                    <div>
                      <FieldArray name="variations">
                        {({ remove, push }) => (
                          <div>
                            {values.variations.length > 0 &&
                              values.variations.map(
                                (value: IVariationForm, index: number) => {
                                  return (
                                    <div
                                      className="mb-2"
                                      key={`variations-${index}`}
                                    >
                                      <div className="relative">
                                        {(foodContextData?.isEditing ||
                                          !!index) && (
                                          <button
                                            className="absolute -right-1 top-2"
                                            onClick={() => remove(index)}
                                            type="button"
                                          >
                                            <FontAwesomeIcon
                                              icon={faTimes}
                                              size="lg"
                                              color="#FF6347"
                                            />
                                          </button>
                                        )}
                                        <Fieldset
                                          legend={`Variation ${index + 1} ${value.title ? `(${value.title})` : ''}`}
                                          toggleable
                                        >
                                          <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 sm:col-span-12">
                                              <CustomTextField
                                                type="text"
                                                name={`variations[${index}].title`}
                                                placeholder="Title"
                                                maxLength={35}
                                                value={value.title}
                                                onChange={(e) =>
                                                  setFieldValue(
                                                    `variations[${index}].title`,
                                                    e.target.value
                                                  )
                                                }
                                                showLabel={true}
                                                style={{
                                                  borderColor:
                                                    onErrorMessageMatcher(
                                                      'title',
                                                      _errors[index]?.title,
                                                      VariationErrors
                                                    )
                                                      ? 'red'
                                                      : '',
                                                }}
                                              />
                                            </div>

                                            <div className="relative col-span-6 sm:col-span-6">
                                              <CustomNumberField
                                                name={`variations[${index}].price`}
                                                min={MIN_PRICE}
                                                max={MAX_PRICE}
                                                minFractionDigits={0}
                                                maxFractionDigits={2}
                                                placeholder="Price"
                                                showLabel={true}
                                                // maxLength={6}
                                                value={value.price}
                                                onChangeFieldValue={
                                                  setFieldValue
                                                }
                                                style={{
                                                  borderColor:
                                                    onErrorMessageMatcher(
                                                      'price',
                                                      _errors[index]?.price,
                                                      VariationErrors
                                                    )
                                                      ? 'red'
                                                      : '',
                                                }}
                                              />
                                              {value.discount > 0 && (
                                                <div className="absolute bottom-[-15px] left-[2px] font-semibold text-[10px] flex gap-2">
                                                  <p>
                                                    Actual Price&nbsp;: &nbsp;
                                                    <span className="line-through">
                                                      {value.price +
                                                        value.discount}
                                                    </span>
                                                  </p>
                                                  ,
                                                  <p>
                                                    Discounted Price&nbsp;:
                                                    &nbsp;
                                                    <span>{value.price}</span>
                                                  </p>
                                                </div>
                                              )}
                                            </div>

                                            <div className="col-span-6 sm:col-span-6">
                                              <CustomNumberField
                                                name={`variations[${index}].discount`}
                                                min={0}
                                                placeholder="Discount Price"
                                                showLabel={true}
                                                value={value.discount}
                                                onChangeFieldValue={
                                                  setFieldValue
                                                }
                                                style={{
                                                  borderColor:
                                                    onErrorMessageMatcher(
                                                      'discount',
                                                      _errors[index]?.discount,
                                                      VariationErrors
                                                    )
                                                      ? 'red'
                                                      : '',
                                                }}
                                              />
                                            </div>

                                            <div className="col-span-12 sm:col-span-12">
                                              <CustomMultiSelectComponent
                                                name={`variations[${index}].addons`}
                                                placeholder="Addons"
                                                options={addonsDropdown ?? []}
                                                selectedItems={value.addons}
                                                setSelectedItems={setFieldValue}
                                                showLabel={true}
                                                extraFooterButton={{
                                                  title: 'Add New Addon',
                                                  onChange: () =>
                                                    setIsAddAddonVisible(true),
                                                }}
                                                isLoading={loading}
                                                style={{
                                                  borderColor:
                                                    onErrorMessageMatcher(
                                                      'addons',
                                                      _errors[index]
                                                        ?.addons as string,
                                                      VariationErrors
                                                    )
                                                      ? 'red'
                                                      : '',
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </Fieldset>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            <div className="mt-4 flex justify-end">
                              <TextIconClickable
                                className="w-full rounded border border-black bg-transparent text-black"
                                icon={faAdd}
                                iconStyles={{ color: 'black' }}
                                title="Add New Variation"
                                onClick={() => push(initialFormValuesTemplate)}
                              />
                            </div>
                          </div>
                        )}
                      </FieldArray>

                      <div className="mt-4 flex justify-between">
                        <CustomButton
                          className="h-10 w-fit border-gray-300 bg-black px-8 text-white"
                          label={'Back'}
                          type="button"
                          onClick={() => {
                            onBackClickHandler(values);
                          }}
                        />
                        <CustomButton
                          className="h-10 w-fit border-gray-300 bg-black px-8 text-white"
                          label={'Add'}
                          type="submit"
                          loading={isSubmitting}
                        />
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>

      <AddonAddForm
        addon={addon}
        onHide={() => {
          setIsAddAddonVisible(false);
          setAddon(null);
        }}
        isAddAddonVisible={isAddAddonVisible}
      />
    </div>
  );
}
