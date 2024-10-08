// GraphQL
import { GET_NOTIFICATIONS, SEND_NOTIFICATION_USER } from '@/lib/api/graphql';

// Contexts
import { ToastContext } from '@/lib/context/global/toast.context';

//Components
import CustomTextAreaField from '@/lib/ui/useable-components/custom-text-area-field';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import { NotificationErrors } from '@/lib/utils/constants';

// Hooks & react interfaces
import { INotificationFormProps } from '@/lib/utils/interfaces/notification.interface';
import { onErrorMessageMatcher } from '@/lib/utils/methods';
import { NotificationSchema } from '@/lib/utils/schema/notification';
import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Sidebar } from 'primereact/sidebar';
import { ChangeEvent, useContext } from 'react';

export default function NotificationForm({
  setVisible,
  visible,
}: INotificationFormProps) {
  //Toast
  const { showToast } = useContext(ToastContext);

  //Intial state
  const initialValues = {
    title: '',
    body: '',
  };

  //Mutation
  const [sendNotificationUser] = useMutation(SEND_NOTIFICATION_USER, {
    refetchQueries: [{ query: GET_NOTIFICATIONS }],
    onCompleted: () => {
      showToast({
        title: 'New Notification',
        type: 'success',
        message: 'Notification has been sent successfully',
        duration: 2500,
      });
    },
    onError: (err) => {
      showToast({
        title: 'Error Notification',
        type: 'error',
        message: err.cause?.message || 'Something went wrong',
        duration: 2500,
      });
    },
  });

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      position="right"
      className="w-full sm:w-[450px]"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={NotificationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await sendNotificationUser({
            variables: {
              notificationTitle: values.title,
              notificationBody: values.body,
            },
          });

          setSubmitting(false);
          setVisible(false);
        }}
        validateOnChange={true}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting, errors }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="mb-2 flex flex-col">
                <h2 className='className="mb-3 text-xl font-bold'>
                  Send Notification
                </h2>
              </div>
              <div className="space-y-4">
                <CustomTextField
                  value={values.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('title', e.target.value)
                  }
                  name="title"
                  showLabel={true}
                  placeholder="Title"
                  type="text"
                  className={`${
                    onErrorMessageMatcher(
                      'title',
                      errors.title,
                      NotificationErrors
                    )
                      ? 'border border-red-500'
                      : ''
                  }`}
                />
                <CustomTextAreaField
                  value={values.body}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setFieldValue('body', e.target.value)
                  }
                  showLabel={true}
                  label="Description"
                  name="body"
                  placeholder="Add description here"
                  className={`${
                    onErrorMessageMatcher(
                      'body',
                      errors.body,
                      NotificationErrors
                    )
                      ? 'border border-red-500'
                      : ''
                  }`}
                  rows={5}
                />
                <button
                  className="float-end my-2 block rounded-md bg-black px-12 py-2 text-white"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <ProgressSpinner
                      className="m-0 h-6 w-6 items-center self-center p-0"
                      strokeWidth="5"
                      style={{ fill: 'white', accentColor: 'white' }}
                      color="white"
                    />
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Sidebar>
  );
}
