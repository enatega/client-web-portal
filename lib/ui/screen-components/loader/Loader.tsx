import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Loader() {
  return (
    <div className="flex m-auto justify-center items-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin self-center items-center mt-[20%]"
        color="green"
      />
    </div>
  );
}
