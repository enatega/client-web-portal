import CustomButton from '@/lib/ui/useable-components/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

export default function LoginScreen() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-2/6">
        <Card>
          <div className="flex flex-col mb-2 p-2">
            <span className="text-2xl">Welcome!</span>
            <span className="text-gray-400 text-sm">
              Sign up or Login to continue
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <CustomButton
              className="w-full h-12 bg-transparent text-black border-gray-300 hover:bg-whit px-32"
              label="Login with Google"
              rounded={true}
              icon="pi pi-google"
            />

            <CustomButton
              className="w-full h-full bg-black text-white border-gray-300 hover:bg-gray-400 px-32"
              label="Login with Apple"
              rounded={true}
              icon="pi pi-apple"
            />
          </div>

          <Divider />

          <div className="flex flex-col gap-2">
            <CustomButton
              className="w-full h-12 bg-primary-color text-white border-primary-color hover:bg-white hover:text-primary-color"
              label="Login"
              rounded={true}
            />

            <CustomButton
              className="w-full h-full bg-transparent text-black border-secondary-border-color hover:bg-gray-100"
              label="Sign up"
              rounded={true}
            />
          </div>

          <div className="mb-2 p-2">
            <span className="text-gray-400 text-sm">
              By signing up, you agree to our&lsquo;
              <span className="font-bold">Terms and Conditions</span>
              and<span className="font-bold">Privacy Policy.</span>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
