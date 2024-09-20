// import { createBanner, editBanner } from '@/lib/api/graphql/mutation/banners';
import { getBannerActions } from '@/lib/api/graphql/queries/banners';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
// import useToast from '@/lib/hooks/useToast';
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import { BannersErrors } from '@/lib/utils/constants';
import { IBannersAddFormComponentProps } from '@/lib/utils/interfaces/banner.interface';
import { IBannersForm } from '@/lib/utils/interfaces/forms/banners.form.interface';
import { onErrorMessageMatcher } from '@/lib/utils/methods';
import { BannerSchema } from '@/lib/utils/schema/banner';
import { gql } from '@apollo/client';
import { Form, Formik } from 'formik';
import { Sidebar } from 'primereact/sidebar';

// const CREATE_BANNER = gql`
//   ${createBanner}
// `;
// const EDIT_BANNER = gql`
//   ${editBanner}
// `;
// const GET_BANNERS = gql`
//   ${getBanners}
// `;
const GET_BANNER_ACTIONS = gql`
  ${getBannerActions}
`;

const BannersAddForm = ({
  isAddBannerVisible,
  onHide,
  banner,
  position = 'right',
}: IBannersAddFormComponentProps) => {
  // State
  const initialValues: IBannersForm = {
    title: '',
    description: '',
    action: 'navigate',
    screen: '',
    file: '',
    ...banner,
  };

  // Hooks
  // const { showToast } = useToast();

  const { data } = useQueryGQL(GET_BANNER_ACTIONS, {});
  console.log(data);

  const handleSubmit = async (values: IBannersForm) => {
    console.log(values);
    // try {
    //   if (banner) {
    //     // Edit banner logic
    //     await editBanner({ ...values, file: values.file });
    //   } else {
    //     // Create banner logic
    //     await createBanner({ ...values, file: values.file });
    //   }
    //   showToast({
    //     severity: 'success',
    //     summary: 'Success',
    //     detail: 'Banner saved successfully.',
    //   });
    // } catch (error) {
    //   showToast({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: 'Failed to save banner.',
    //   });
    // }
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
                {({ values, errors, handleChange, handleSubmit }) => {
                  return (
                    <Form onSubmit={handleSubmit}>
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

                        <div className="flex justify-end mt-4">
                          <CustomButton
                            className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                            label={banner ? 'Update' : 'Add'}
                            type="submit"
                            // loading={mutationLoading}
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
