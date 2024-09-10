import CustomButton from '@/lib/ui/useable-components/button';
import CustomPhoneTextField from '@/lib/ui/useable-components/phone-input-field';
import { Card } from 'primereact/card';

export default function PhoneVerificationScreen() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-2/6">
        <Card>
          <div className="flex flex-col mb-2 p-2">
            <i className="pi pi-mobile mb-4" style={{ fontSize: '50px' }} />
            <span className="text-3xl">What&apos;s your mobile number?</span>
            <span className="text-gray-400 text-sm">
              We need this to verify and secure your account.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <CustomPhoneTextField
              name="otp"
              type="text"
              mask="(999) 999-9999"
              placeholder="(999) 999-9999"
              showLabel={false}
            />

            <CustomButton
              className="w-full h-12 bg-primary-color text-white border-primary-color hover:bg-white hover:text-primary-color"
              label="Continue"
              rounded={true}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
