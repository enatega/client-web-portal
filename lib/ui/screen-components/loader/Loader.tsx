import { CgSpinner } from 'react-icons/cg';
export default function Loader() {
  return (
    <div className="flex m-auto justify-center items-center">
      <CgSpinner
        color="green"
        size={35}
        className="animate-spin self-center items-center mt-[20%]"
      />
    </div>
  );
}
