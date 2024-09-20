//queries
import { SEND_NOTIFICATION_USER } from '@/lib/api/graphql';

//contexts
import { ToastContext } from '@/lib/context/toast.context';

//icons
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//prime react
import { Button } from 'primereact/button';

//components
import CustomTextAreaField from '@/lib/ui/useable-components/custom-text-area-field';
import CustomTextField from '@/lib/ui/useable-components/input-field';

//hooks & react interfaces
import { useMutation } from '@apollo/client';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export default function SendNotification({
  setVisible,
}: {
  setVisible: Dispatch<SetStateAction<boolean>>;
}) {
  //toast
  const { showToast } = useContext(ToastContext);

  //states
  const [notificationData, setNotificationData] = useState({
    title: '',
    body: '',
  });

  //mutation
  const [sendNotificationUser, { loading, error }] = useMutation(
    SEND_NOTIFICATION_USER
  );

  //form change
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setNotificationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //handle

  //form submit
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await sendNotificationUser({
        variables: {
          notificationTitle: notificationData.title,
          notificationBody: notificationData.body,
        },
      });
      setNotificationData({
        body: '',
        title: '',
      });
      return showToast({
        title: 'Success',
        type: 'success',
        message: 'Successfully sent the notification',
        duration: 2500,
      });
    } catch (err) {
      setVisible(true);
      showToast({
        title: 'Error',
        type: 'error',
        message: error?.message ?? 'Something went wrong',
        duration: 2500,
      });
      return console.log(err);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
        <h2 className="font-bold mb-3 text-xl">Send a Notification</h2>
        <CustomTextField
          value={notificationData.title}
          onChange={handleFormChange}
          name="title"
          className="w-full py-2 px-1 text-sm"
          showLabel={true}
          placeholder="Title"
          type="text"
        />
        <CustomTextAreaField
          value={notificationData.body}
          onChange={handleFormChange}
          name="body"
          className="w-full text-sm"
          rows={5}
        />
        <Button
          type="submit"
          className="bg-black text-white p-2 w-32 right-0 self-end flex items-center justify-center hover:bg-[#000000d8]"
        >
          {loading ? (
            <FontAwesomeIcon
              color="white"
              icon={faSpinner}
              className="animate-spin self-center items-center"
            />
          ) : (
            'Send'
          )}
        </Button>
      </form>
    </div>
  );
}
