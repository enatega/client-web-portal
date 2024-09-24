// Core
import { FieldArray, Form, Formik, FormikErrors } from 'formik';

// Prime React
import { Sidebar } from 'primereact/sidebar';

// Interface and Types
import { IOptionForm } from '@/lib/utils/interfaces/forms';

// Components

// Utilities and Constants

//Toast
import useToast from '@/lib/hooks/useToast';

//GraphQL
import {
  CREATE_OPTIONS,
  EDIT_OPTION,
  GET_OPTIONS_BY_RESTAURANT_ID,
} from '@/lib/api/graphql';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';
import { useConfiguration } from '@/lib/hooks/useConfiguration';
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextAreaField from '@/lib/ui/useable-components/custom-text-area-field';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomNumberField from '@/lib/ui/useable-components/number-input-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { OptionErrors } from '@/lib/utils/constants';
import { IOptionsAddFormComponentProps } from '@/lib/utils/interfaces';
import {
  omitExtraAttributes,
  onErrorMessageMatcher,
} from '@/lib/utils/methods';
import { OptionSchema } from '@/lib/utils/schema';
import { useMutation } from '@apollo/client';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fieldset } from 'primereact/fieldset';
import { useContext } from 'react';

// State
const initialFormValuesTemplate: IOptionForm = {
  title: '',
  description: '',
  price: 1,
};
const initialEditFormValuesTemplate: IOptionForm = {
  _id: '',
  title: '',
  description: '',
  price: 1,
};

export default function OptionAddForm({
  onHide,
  option,
  position = 'right',
  isAddOptionsVisible,
}: IOptionsAddFormComponentProps) {
  // Hooks
  const { showToast } = useToast();
  // Context
  const { CURRENT_SYMBOL } = useConfiguration();
  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext);
  const restaurantId = restaurantLayoutContextData?.restaurantId || '';

  // Constants
  const initialValues = {
    options: [
      {
        ...initialFormValuesTemplate,
        ...option,
      },
    ],
  };

  // Mutation
  const [createOption, { loading: mutationLoading }] = useMutation(
    option ? EDIT_OPTION : CREATE_OPTIONS,
    {
      refetchQueries: [
        {
          query: GET_OPTIONS_BY_RESTAURANT_ID,
          variables: { id: restaurantId },
        },
      ],
      onCompleted: () => {
        showToast({
          type: 'success',
          title: 'New Option(s)',
          message: `Option(s) have been ${option ? 'edited' : 'added'} successfully.`,
        });

        onHide();
      },
      onError: (error) => {
        console.log({ error });
        let message = '';
        try {
          message = error.graphQLErrors[0]?.message;
        } catch (err) {
          message = 'Something went wrong.';
        }
        showToast({
          type: 'error',
          title: 'New Option(s)',
          message,
        });
      },
    }
  );

  // Form Submission
  const handleSubmit = ({ options }: { options: IOptionForm[] }) => {
    console.log({ options, option });
    createOption({
      variables: {
        optionInput: {
          restaurant: restaurantId,
          options: option
            ? omitExtraAttributes(options[0], initialEditFormValuesTemplate)
            : options,
        },
      },
    });
  };

  return (
    <Sidebar
      visible={isAddOptionsVisible}
      position={position}
      onHide={onHide}
      className="w-full sm:w-[450px]"
    >
      <div className="w-full h-full flex items-center justify-start">
        <div className="h-full w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col mb-2">
              <span className="text-lg">{option ? 'Edit' : 'Add'} Option</span>
            </div>

            <div className="mb-2">
              <Formik
                initialValues={initialValues}
                validationSchema={OptionSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  handleChange,
                  setFieldValue,
                  handleSubmit,
                }) => {
                  const _errors: FormikErrors<IOptionForm>[] =
                    (errors?.options as FormikErrors<IOptionForm>[]) ?? [];

                  return (
                    <Form onSubmit={handleSubmit}>
                      <div>
                        <FieldArray name="options">
                          {({ remove, push }) => (
                            <div>
                              {values.options.length > 0 &&
                                values.options.map(
                                  (value: IOptionForm, index: number) => {
                                    return (
                                      <div
                                        className="mb-2"
                                        key={`option-${index}`}
                                      >
                                        <div className="relative">
                                          {!!index && (
                                            <button
                                              className="absolute top-2 -right-1"
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
                                            legend={`Option ${index + 1} ${value.title ? `(${value.title})` : ''}`}
                                            toggleable
                                          >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                              <div>
                                                <CustomTextField
                                                  type="text"
                                                  name={`options[${index}].title]`}
                                                  placeholder="Title"
                                                  maxLength={35}
                                                  value={value.title}
                                                  onChange={(e) =>
                                                    setFieldValue(
                                                      `options[${index}].title`,
                                                      e.target.value
                                                    )
                                                  }
                                                  showLabel={true}
                                                  style={{
                                                    borderColor:
                                                      onErrorMessageMatcher(
                                                        'title',
                                                        _errors[index]?.title,
                                                        OptionErrors
                                                      )
                                                        ? 'red'
                                                        : '',
                                                  }}
                                                />
                                              </div>
                                              <div>
                                                <CustomNumberField
                                                  prefix={CURRENT_SYMBOL}
                                                  min={1}
                                                  max={99999}
                                                  minFractionDigits={0}
                                                  maxFractionDigits={0}
                                                  placeholder="Price"
                                                  name={`[options[${index}]price]`}
                                                  showLabel={true}
                                                  value={value.price}
                                                  onChangeFieldValue={
                                                    setFieldValue
                                                  }
                                                  style={{
                                                    borderColor:
                                                      onErrorMessageMatcher(
                                                        'price',
                                                        _errors[index]?.price,
                                                        OptionErrors
                                                      )
                                                        ? 'red'
                                                        : '',
                                                  }}
                                                />
                                              </div>
                                              <div className="col-span-1 sm:col-span-2">
                                                <CustomTextAreaField
                                                  name="description"
                                                  placeholder="Description"
                                                  value={value.description}
                                                  onChange={handleChange}
                                                  showLabel={true}
                                                  className={''}
                                                  rows={0}
                                                />
                                              </div>
                                            </div>
                                          </Fieldset>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              {!option && (
                                <div className="flex justify-end mt-4">
                                  <TextIconClickable
                                    className="w-full bg-transparent text-black border border-black rounded"
                                    icon={faAdd}
                                    iconStyles={{ color: 'black' }}
                                    title="Add New Option"
                                    onClick={() =>
                                      push(initialFormValuesTemplate)
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </FieldArray>

                        <div className="flex justify-end mt-4">
                          <CustomButton
                            className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                            label={option ? 'Edit' : 'Add'}
                            type="submit"
                            loading={mutationLoading}
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
    </Sidebar>
  );
}
