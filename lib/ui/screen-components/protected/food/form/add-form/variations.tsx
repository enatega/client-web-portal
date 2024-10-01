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
    IFoodGridItem,
    IFoodVariationsAddRestaurantComponentProps,
} from '@/lib/utils/interfaces';
import {
    onErrorMessageMatcher,
} from '@/lib/utils/methods';

// Schema 
import { VariationSchema } from '@/lib/utils/schema';

// Icons
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { FoodsContext } from '@/lib/context/foods.context';

const initialFormValuesTemplate: IVariationForm = {
    title: '',
    price: 0,
    discount: 0
}

export default function VariationAddForm({ stepperProps }: IFoodVariationsAddRestaurantComponentProps) {

    // Props
    const { onStepChange, order } = stepperProps ?? {
        onStepChange: () => { },
        type: '',
        order: -1,
    };

    // Context
    const { onSetFoodContextData, foodContextData } = useContext(FoodsContext)

    // Constants
    const initialValues = {
        variations: [
            {
                ...initialFormValuesTemplate,
            },
        ],
    };

    // Handlers
    const onHandleSubmit = ({variations}: {variations: IVariationForm[]}) => {
        onSetFoodContextData({ food: { _id: foodContextData?.food?._id ?? null, data: foodContextData?.food?.data ?? {} as IFoodGridItem, variations: variations } })
        onStepChange(order + 1)
    }


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

                                setFieldValue,
                                handleSubmit,
                            }: FormikProps<{ variations: IVariationForm[] }>) => {
                                const _errors: FormikErrors<IVariationForm>[] =
                                    errors?.variations as FormikErrors<IVariationForm>[] ?? [];



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
                                                                                {!!index && (
                                                                                    <button
                                                                                        className="absolute -right-1 top-2"
                                                                                        onClick={() => remove(index)}
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

                                                                                        <div className="col-span-6 sm:col-span-6">
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
                                                                                                            _errors[index]
                                                                                                                ?.price,
                                                                                                            VariationErrors
                                                                                                        )
                                                                                                            ? 'red'
                                                                                                            : '',
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-span-6 sm:col-span-6">
                                                                                            <CustomNumberField
                                                                                                prefix='%'
                                                                                                name={`variations[${index}].discount`}
                                                                                                min={0}
                                                                                                max={100}
                                                                                                minFractionDigits={0}
                                                                                                maxFractionDigits={2}

                                                                                                placeholder="Discount"
                                                                                                showLabel={true}
                                                                                                value={value.discount}
                                                                                                onChangeFieldValue={
                                                                                                    setFieldValue
                                                                                                }
                                                                                                style={{
                                                                                                    borderColor:
                                                                                                        onErrorMessageMatcher(
                                                                                                            'discount',
                                                                                                            _errors[index]
                                                                                                                ?.discount,
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
                                                                onClick={() =>
                                                                    push(initialFormValuesTemplate)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </FieldArray>

                                            <div className="mt-4 flex justify-end">
                                                <CustomButton
                                                    className="h-10 w-fit border-gray-300 bg-black px-8 text-white"
                                                    label={'Add'}
                                                    type="submit"
                                                    loading={false} // Replace with actual loading state if available
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
        </div>
    );
}
