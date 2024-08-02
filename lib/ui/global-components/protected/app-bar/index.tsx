/* eslint-disable @next/next/no-img-element */

'use client';

// Core
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Assets
import { AppLogo } from '@/lib/utils/assets/svgs/logo';

// Prime React
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomInputText from '@/lib/ui/useable-components/input-field';
// Styles

import classes from './app-bar.module.css';

const AppTopbar = () => {
  // Hooks
  const router = useRouter();

  return (
    <div className={`${classes['layout-topbar']}`}>
      <div>
        <div className="flex flex-row items-center gap-6">
          <Link href="/" className="layout-topbar-log">
            <AppLogo />
          </Link>

          <div className="flex gap-2 items-center">
            <i className="pi pi-map-marker" />
            <span>New York</span>
            <i className="pi pi-chevron-down" />
          </div>
        </div>
      </div>

      <div className="w-app-bar-search-width md:w-1/4 mb-4 md:mb-0">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search"> </InputIcon>
          <CustomInputText
            className="rounded-full"
            name="search"
            placeholder="Search for Restaurants"
            type="search"
          />
        </IconField>
      </div>

      <div>
        <div className="flex">
          <div className="mr-2 w-custom-button h-custom-button">
            <CustomButton
              className="w-full h-full bg-transparent text-black border-secondary-border-color hover:bg-gray-100"
              label="Login"
              rounded={true}
              onClick={() => {
                router.push('/authentication');
              }}
            />
          </div>
          <div className="w-custom-button h-custom-button">
            <CustomButton
              className="w-full h-full bg-primary-color border-primary-color hover:bg-white hover:text-black"
              label="Sign up"
              rounded={true}
              onClick={() => {
                router.push('/authentication/sign-up');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
