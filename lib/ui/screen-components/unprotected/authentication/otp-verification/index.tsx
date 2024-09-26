// Component
import CustomButton from '@/lib/ui/useable-components/button';

// Prime React
import { Card } from 'primereact/card';
import { InputOtp } from 'primereact/inputotp';

// Style

export default function OTPVerificationMain() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-2/6">
        <Card>
          <div className="flex flex-col mb-2 p-2 items-center">
            <span className="text-xl">
              We have sent OTP code to john@email.com
            </span>
            <span className="text-gray-400 text-sm">
              Please check your inbox
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-full h-26 flex justify-center">
              <InputOtp />
            </div>

            <div className="flex justify-center">
              <span className="text-gray-400 text-sm">Valid for 1min</span>
            </div>

            <CustomButton
              className="w-full h-12 bg-primary-color text-white border-primary-color hover:bg-white hover:text-primary-color"
              label="Continue"
              rounded={true}
            />

            <CustomButton
              className="w-full h-full bg-transparent text-black border-secondary-border-color hover:bg-gray-100"
              label="Resend OTP"
              rounded={true}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
