import CustomButton from '@/lib/ui/useable-components/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';

export default function EmailVerificationScreen() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-2/6">
        <Card>
          <div className="flex flex-col mb-2 p-2">
            <i className="pi pi-envelope" style={{ fontSize: '40px' }} />
            <span className="text-3xl">What&apos;s your email?</span>
            <span className="text-gray-400 text-sm">
              We&apos;ll check if you have an account.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="border-2 rounded-3xl">
              <InputText
                v-model="value1"
                placeholder="Enter your email address"
                className="border-none w-full rounded-3xl"
              />
            </div>

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
