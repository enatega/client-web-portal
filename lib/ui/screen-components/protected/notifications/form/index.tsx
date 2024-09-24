//queries
import { SEND_NOTIFICATION_USER } from '@/lib/api/graphql';

//contexts
import { ToastContext } from '@/lib/context/toast.context';

//icons

//prime react

//components
import CustomTextAreaField from '@/lib/ui/useable-components/custom-text-area-field';
import CustomTextField from '@/lib/ui/useable-components/input-field';

//hooks & react interfaces
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
  //toast
  const { showToast } = useContext(ToastContext);

  //intial state
  const initialValues = {
    title: '',
    body: '',
  };

  //mutation
  const [sendNotificationUser] = useMutation(SEND_NOTIFICATION_USER);

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      position="right"
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
            return setSubmitting(false);
          } catch (err) {
            setVisible(true);
            showToast({
              title: 'New Notification',
              type: 'error',
              message: 'Something went wrong',
              duration: 2500,
            });
            return console.log(err);
          }
        }}
        validateOnChange={true}
      >
        {({ handleSubmit, handleChange, values, isSubmitting }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <CustomTextField
                value={values.title}
                onChange={handleChange}
                name="title"
                className="w-full py-2 px-1 text-sm"
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
                className="block float-end bg-black rounded-md px-12 py-2 my-2 text-white"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <ProgressSpinner
                    className="w-6 h-6 items-center self-center m-0 p-0"
                    strokeWidth="5"
                    style={{ fill: 'white', accentColor: 'white' }}
                    color="white"
                  />
                ) : (
                  'Send'
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
    </Sidebar>
  );
}
