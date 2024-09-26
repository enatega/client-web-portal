// import { createBanner, editBanner } from '@/lib/api/graphql/mutation/banners';
import { CREATE_BANNER, EDIT_BANNER, GET_RESTAURANTS } from '@/lib/api/graphql';
import { GET_BANNERS } from '@/lib/api/graphql/queries/banners';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import useToast from '@/lib/hooks/useToast';
// import useToast from '@/lib/hooks/useToast';
import CustomButton from '@/lib/ui/useable-components/button';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomUploadImageComponent from '@/lib/ui/useable-components/upload/upload-image';
import {
  ACTION_TYPES,
  BannersErrors,
  SCREEN_NAMES,
} from '@/lib/utils/constants';
import {
  IQueryResult,
  IRestaurantsResponseGraphQL,
} from '@/lib/utils/interfaces';
import { IBannersAddFormComponentProps } from '@/lib/utils/interfaces/banner.interface';
import { IBannersForm } from '@/lib/utils/interfaces/forms/banners.form.interface';
import { onErrorMessageMatcher } from '@/lib/utils/methods';
import { getLabelByCode } from '@/lib/utils/methods/label-by-code';
import { BannerSchema } from '@/lib/utils/schema/banner';
import { useMutation } from '@apollo/client';
import { Form, Formik, FormikHelpers } from 'formik';
import { Sidebar } from 'primereact/sidebar';

const BannersAddForm = ({
  isAddBannerVisible,
  onHide,
  banner,
  position = 'right',
}: IBannersAddFormComponentProps) => {
  console.log(banner);
  const { data, loading } = useQueryGQL(GET_RESTAURANTS, {
    fetchPolicy: 'cache-and-network',
  }) as IQueryResult<IRestaurantsResponseGraphQL | undefined, undefined>;

  let RESTAURANT_NAMES =
    data?.restaurants.map((v) => {
      return { label: v.name, code: v.name };
    }) || [];

  //State
  const initialValues: IBannersForm = {
    title: banner?.title || '',
    description: banner?.description || '',
    action: banner
      ? {
        label: getLabelByCode(ACTION_TYPES, banner.action),
        code: banner.action,
      }
      : null,
    screen: banner
      ? banner.action === 'Navigate Specific Page'
        ? {
          label: getLabelByCode(SCREEN_NAMES, banner.screen),
          code: banner.screen,
        }
        : banner.action === 'Navigate Specific Store'
          ? {
            label: banner.screen,
            code: banner.screen,
          }
          : null
      : null,
    file: banner?.file || '',
  };

  // Hooks
  const { showToast } = useToast();

  let mutation = banner ? EDIT_BANNER : CREATE_BANNER;
  const [mutate, { loading: mutationLoading }] = useMutation(mutation, {
    refetchQueries: [{ query: GET_BANNERS }],
  });

  // Form Submission
  const handleSubmit = (
    values: IBannersForm,
    { resetForm }: FormikHelpers<IBannersForm>
  ) => {
    if (data) {
      mutate({
        variables: {
          bannerInput: {
            _id: banner ? banner._id : '',
            title: values.title,
            description: values.description,
            file: values.file,
            action: values.action?.code,
            screen: values.screen?.code,
          },
        },
        onCompleted: () => {
          showToast({
            type: 'success',
            title: 'Success!',
            message: banner ? 'Banner updated' : 'Banner added',
            duration: 3000,
          });
          resetForm();
          onHide();
        },
        onError: (error) => {
          let message = '';
          try {
            message = error.graphQLErrors[0]?.message;
          } catch (err) {
            message = 'ActionFailedTryAgain';
          }
          showToast({
            type: 'error',
            title: 'Error!',
            message,
            duration: 3000,
          });
        },
      });
    }
  };

  return (
    <Sidebar
      visible={isAddBannerVisible}
      position={position}
      onHide={onHide}
      className="w-full sm:w-[450px]"
    >
      <div className="w-full h-full flex items-center justify-start">
        <div className="h-full w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col mb-2">
              <span className="text-lg">{banner ? 'Edit' : 'Add'} Banner</span>
            </div>

            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={BannerSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                }) => {
                  return (
                    <Form
                      onClick={() => console.log(values)}
                      onSubmit={handleSubmit}
                    >
                      <div className="space-y-4">
                        <div>
                          <CustomTextField
                            type="text"
                            name="title"
                            placeholder="Title"
                            maxLength={35}
                            value={values.title}
                            onChange={handleChange}
                            showLabel={true}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'title',
                                errors?.title,
                                BannersErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>
                        <div>
                          <CustomTextField
                            type="text"
                            name="description"
                            placeholder="Description"
                            maxLength={35}
                            value={values.description}
                            onChange={handleChange}
                            showLabel={true}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'description',
                                errors?.description,
                                BannersErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomDropdownComponent
                            placeholder="Actions"
                            options={ACTION_TYPES}
                            showLabel={true}
                            name="action"
                            filter={false}
                            selectedItem={values.action}
                            setSelectedItem={setFieldValue}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'action',
                                errors?.action,
                                BannersErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomDropdownComponent
                            placeholder="Screen"
                            options={
                              values.action?.code === 'Navigate Specific Store'
                                ? RESTAURANT_NAMES
                                : values.action?.code ===
                                  'Navigate Specific Page'
                                  ? SCREEN_NAMES
                                  : []
                            }
                            showLabel={true}
                            name="screen"
                            loading={loading}
                            selectedItem={values.screen}
                            setSelectedItem={setFieldValue}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'screen',
                                errors?.screen,
                                BannersErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div
                          className={`${errors.file && !values.file
                            ? 'border-red-500'
                            : 'border-gray-200'
                            } border p-4 rounded-lg`}
                        >
                          <CustomUploadImageComponent
                            key={'file'}
                            name="file"
                            title="Upload Image"
                            onSetImageUrl={setFieldValue}
                            showExistingImage={banner ? true : false}
                            existingImageUrl={banner && values.file}
                          />
                        </div>

                        <div className="flex justify-end mt-4">
                          <CustomButton
                            className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                            label={banner ? 'Update' : 'Add'}
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
};

export default BannersAddForm;
