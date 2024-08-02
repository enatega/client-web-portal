export default function HomeHeader() {
  return (
    <div className="w-full pt-4">
      <div className="flex justify-center">
        <div className="flex gap-2">
          <div className="flex gap-2 items-center bg-[#63abcd] text-cyan-50 p-2 border-2 rounded-full cursor-pointer">
            <i className="pi pi-home" />
            <span>Discovery</span>
          </div>
          <div className="flex gap-2 items-center bg-[#63abcd] text-cyan-50 p-2 border-2 rounded-full cursor-pointer">
            <i className="pi pi-home" />
            <span>Restaurants</span>
          </div>
          <div className="flex gap-2 items-center bg-[#63abcd] text-cyan-50 p-2 border-2 rounded-full cursor-pointer">
            <i className="pi pi-home" />
            <span>Store</span>
          </div>
        </div>
      </div>
    </div>
  );
}
