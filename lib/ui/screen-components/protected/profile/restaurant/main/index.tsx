import React from 'react';
// import { Camera } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IInfoItemProps } from '@/lib/utils/interfaces/profile.interface';
import { IRestaurantProfileProps } from '@/lib/utils/interfaces/profile.interface';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';

const InfoItem: React.FC<IInfoItemProps> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 mb-2">{label}</p>
    <p className="font-bold">{value}</p>
  </div>
);

const RestaurantMain: React.FC<IRestaurantProfileProps> = ({
  restaurantName,
  userName,
  password,
  name,
  address,
  deliveryTime,
  minOrder,
  salesTax,
  orderPrefix,
  shopCategory,
  cuisines,
}) => {
  return (
    <div className="flex items-center justify-center mt-8">
      <div className="bg-white p-8 w-full border-2 border-dotted rounded border-inherit">
        <div className="flex items-center mb-6">
          <FontAwesomeIcon icon={faCamera} className="text-4xl mr-4" />
          <div>
            <h1 className="text-xs text-gray-500">Restaurant Name</h1>
            <h2 className="text-2xl font-bold">{restaurantName}</h2>
          </div>
        </div>
        <hr className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoItem label="User Name" value={userName} />
          <InfoItem label="Password" value={password} />
          <div className="md:row-span-4">
            <p className="text-xs text-gray-500 mb-2">Images</p>
            <div className="flex space-x-2">
              {/* <Image
                src="/api/placeholder/100/100"
                alt="Image of grocery store with fruits and vegetables"
                className="object-cover rounded"
                width= {96}
                height= {96}
              />
              <Image
                src="/api/placeholder/100/100"
                alt="Image of grocery store aisle"
                className="object-cover rounded"
                width= {96}
                height= {96} */}
              {/* /> */}
            </div>
          </div>
          <InfoItem label="Name" value={name} />
          <InfoItem label="Address" value={address} />
          <InfoItem label="Delivery Time" value={deliveryTime} />
          <InfoItem label="Min Order" value={minOrder} />
          <InfoItem label="Sales Tax" value={salesTax} />
          <InfoItem label="Order Prefix" value={orderPrefix} />
          <InfoItem label="Shop Category" value={shopCategory} />
          <InfoItem label="Cuisines" value={cuisines} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantMain;
