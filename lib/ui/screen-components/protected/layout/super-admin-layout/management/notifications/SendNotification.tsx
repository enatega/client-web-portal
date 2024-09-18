import { SEND_NOTIFICATION_USER } from '@/lib/api/graphql/mutations';
import { useMutation } from '@apollo/client';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useState,
} from 'react';

export default function SendNotification({
  toast,
  setVisible,
}: {
  toast: RefObject<Toast>;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) {
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
      return toast?.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Successfully sent the notification',
      });
    } catch (err) {
      setVisible(true);
      toast?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error?.message,
      });
      return console.log(err);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
        <h2 className="font-bold mb-3 text-xl">Send a Notification</h2>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="title">
            Title
          </label>
          <InputText
            value={notificationData.title}
            onChange={handleFormChange}
            name="title"
            id="title"
            className="w-full py-2 px-1 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="body">
            Body
          </label>
          <InputTextarea
            value={notificationData.body}
            onChange={handleFormChange}
            name="body"
            id="body"
            className="w-full text-sm"
            rows={5}
          />
        </div>
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
