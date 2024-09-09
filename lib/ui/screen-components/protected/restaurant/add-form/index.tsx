// Prime React
import { Sidebar } from 'primereact/sidebar';

// Interface and Types
import { VendorContext } from '@/lib/context/vendor-context';
import { IVendorAddFormComponentProps } from '@/lib/utils/interfaces';
import { useContext } from 'react';

export default function VendorAddForm({
  position = 'right',
}: IVendorAddFormComponentProps) {
  const { vendorFormVisible, onSetVendorFormVisible } =
    useContext(VendorContext);

  return (
    <Sidebar
      visible={vendorFormVisible}
      position={position}
      onHide={() => onSetVendorFormVisible(false)}
      className="w-full sm:w-[450px] z-10"
    >
      <div className="flex items-start justify-center min-h-screen ">
        <div className="bg-white p-8 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Add Restaurant</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder="vendor name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-eye-slash"></i>
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </Sidebar>
  );
}
