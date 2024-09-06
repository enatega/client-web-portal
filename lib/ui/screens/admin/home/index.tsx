// Styles
import classes from './home.module.css';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div className={`${classes['card']} ${classes['highlight']}`}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total User</h2>
              <p className="text-3xl font-bold">40,689</p>
              <p className="text-green-500 flex items-center">
                <i className="fas fa-arrow-up mr-1"></i> 8.5% Up from yesterday
              </p>
            </div>
            <div className="text-2xl text-gray-400">
              <i className="fas fa-users"></i>
            </div>
          </div>
        </div>

        <div className={`${classes['card']}`}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Vendors</h2>
              <p className="text-3xl font-bold">7,689</p>
              <p className="text-green-500 flex items-center">
                <i className="fas fa-arrow-up mr-1"></i> 8.5% Up from yesterday
              </p>
            </div>
            <div className="text-2xl text-gray-400">
              <i className="fas fa-store"></i>
            </div>
          </div>
        </div>
        <div className={`${classes['card']}`}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Restaurants</h2>
              <p className="text-3xl font-bold">20,689</p>
              <p className="text-red-500 flex items-center">
                <i className="fas fa-arrow-down mr-1"></i> 8.5% Down from
                yesterday
              </p>
            </div>
            <div className="text-2xl text-gray-400">
              <i className="fas fa-utensils"></i>
            </div>
          </div>
        </div>
        <div className={`${classes['card']}`}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Riders</h2>
              <p className="text-3xl font-bold">12,689</p>
              <p className="text-green-500 flex items-center">
                <i className="fas fa-arrow-up mr-1"></i> 8.5% Up from yesterday
              </p>
            </div>
            <div className="text-2xl text-gray-400">
              <i className="fas fa-bicycle"></i>
            </div>
          </div>
        </div>
      </div>
      <div className={`${classes['card']}`}>
        <h2 className="text-lg font-semibold">Progress Graph</h2>
        <p className="text-gray-500">Secondary text</p>
        <div className="mt-4">
          <img
            src="https://placehold.co/600x300?text=Graph"
            alt="Graph showing progress over months"
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mt-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></span>
            <span>Total User</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="w-3 h-3 bg-gray-500 rounded-full inline-block mr-2"></span>
            <span>Total Vendor</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="w-3 h-3 bg-gray-500 rounded-full inline-block mr-2"></span>
            <span>Total Restaurants</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="w-3 h-3 bg-gray-500 rounded-full inline-block mr-2"></span>
            <span>Total Riders</span>
          </div>
        </div>
      </div>
    </div>
  );
}
