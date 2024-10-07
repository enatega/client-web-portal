// GraphQL
import { SEND_NOTIFICATION_USER } from '@/lib/api/graphql';

// Contexts
import { ToastContext } from '@/lib/context/global/toast.context';

//Components
import CustomTextAreaField from '@/lib/ui/useable-components/custom-text-area-field';
import CustomTextField from '@/lib/ui/useable-components/input-field';

// Hooks & react interfaces
import { INotificationFormProps } from '@/lib/utils/interfaces/notification.interface';
import { NotificationSchema } from '@/lib/utils/schema/notification';
import { useMutation } from '@apollo/client';
import { ErrorMessage, Form, Formik } from 'formik';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Sidebar } from 'primereact/sidebar';
import { useContext } from 'react';

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
  const [sendNotificationUser] = useMutation(SEND_NOTIFICATION_USER);

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      position="right"
      className="w-full sm:w-[600px]"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={NotificationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await sendNotificationUser({
              variables: {
                notificationTitle: values.title,
                notificationBody: values.body,
              },
            });
            showToast({
              title: 'New Notification',
              type: 'success',
              message: 'Notification has been sent successfully',
              duration: 2500,
            });
            setSubmitting(false);
          } catch (err) {
            setVisible(true);
            showToast({
              title: 'New Notification',
              type: 'error',
              message: 'Something went wrong',
              duration: 2500,
            });

          }
        }}
        validateOnChange={true}
      >
        {({ handleSubmit, handleChange, values, isSubmitting }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="mb-2 flex flex-col">
                <span className="text-lg">Send Notification</span>
              </div>
              <div className="space-y-4">
                <CustomTextField
                  value={values.title}
                  onChange={handleChange}
                  name="title"
                  className="w-full px-1 py-2 text-sm"
                  showLabel={true}
                  placeholder="Title"
                  type="text"
                />

                <ErrorMessage
                  name="title"
                  component="span"
                  className="text-red-600"
                />
                <CustomTextAreaField
                  value={values.body}
                  onChange={handleChange}
                  showLabel={true}
                  label="Description"
                  name="body"
                  placeholder="Add description here"
                  className="w-full text-sm"
                  rows={5}
                />
                <ErrorMessage
                  name="body"
                  component="span"
                  className="text-red-600"
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
