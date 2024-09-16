import { SEVERITY_STYLES } from '@/lib/utils/constants';
import { INotificationComponentProps } from '@/lib/utils/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomNotification = ({
  type,
  title,
  message,
}: INotificationComponentProps) => {
  const styles = SEVERITY_STYLES[type];

  return (
    <div className="flex w-full h-full">
      <div
        className={`w-[0.5rem] rounded-tl-lg rounded-bl-lg`}
        style={{ backgroundColor: styles.textColor }}
      >
        <FontAwesomeIcon
          icon={styles.icon}
          size="2xl"
          color={styles.textColor}
          className="m-4 ml-4"
        />
      </div>

      <div className="m-4 ml-14">
        <div className={`font-semibold ${styles.textColor}`}>{title}</div>
        <div className={`font-[400] text-sm  ${styles.textColor}`}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default CustomNotification;
