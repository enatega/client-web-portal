const Toggle = ({ checked }: { checked: boolean }) => {
  return (
    <label className="ml-2 flex items-center cursor-pointer flex-shrink-0">
      <div className="relative">
        <div className="flex items-center space-x-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={checked} />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-primary-color"></div>
            <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>
    </label>
  );
};

export default Toggle;