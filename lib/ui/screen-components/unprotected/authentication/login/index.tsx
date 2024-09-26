'use client';

// Core
import { useRouter } from 'next/navigation';

// Components
import CustomButton from '@/lib/ui/useable-components/button';

// Prime React
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

export default function LoginMain() {
  const router = useRouter();

  return (
    <div className="h-full w-screen gap-4 flex  items-center justify-center">
      <div className="w-1/3">
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col text-center">
              <span className="text-2xl">Welcome!</span>
              <span className="text-gray-400 text-sm">
                Sign up or Login to continue
              </span>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center">
              <CustomButton
                className="w-full h-12 bg-transparent text-black border border-gray-30 hover:bg-gray-100"
                label="Login with Google"
                rounded={true}
                icon="pi pi-google"
              />

              <CustomButton
                className="w-full h-12 bg-black text-white border-gray-30 hover:bg-gray-100 px-32: hover:text-black"
                label="Login with Apple"
                rounded={true}
                icon="pi pi-apple"
              />
            </div>

            <Divider />

            <div className="flex flex-col gap-2 items-center justify-center">
              <CustomButton
                className="w-full h-12 bg-primary-color text-white border border-gray-30 hover:bg-gray-100 hover:text-black"
                label="Login"
                rounded={true}
                onClick={() => router.push('/authentication/login')}
              />

              <CustomButton
                className="w-full h-12 bg-secondary-color text-white border border-gray-30 hover:bg-gray-100 hover:text-black"
                label="Sign up"
                rounded={true}
                onClick={() => router.push('/authentication/sign-up')}
              />
            </div>

            <div className="text-center">
              <span className="text-gray-400 text-sm">
                By signing up, you agree to our&nbsp;
                <span className="font-bold">Terms and Conditions&nbsp;</span>
                and<span className="font-bold">&nbsp;Privacy Policy.</span>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
