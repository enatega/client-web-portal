/* eslint-disable @next/next/no-img-element */

'use client';

// Core
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Assets
import { AppLogo } from '@/lib/utils/assets/svgs/logo';

// Prime React
import { Dropdown } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

// Components
import CustomButton from '@/lib/ui/useable-components/button';

// Styles

import classes from './app-bar.module.css';

const AppTopbar = () => {
  // Hooks
  const router = useRouter();

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  return (
    <div className={`${classes['layout-topbar']}`}>
      <div>
        <div className="flex flex-row items-center gap-6">
          <Link href="/" className="layout-topbar-log">
            <AppLogo />
          </Link>

          <div>
            <i className="pi pi-map-marker" />
            <Dropdown
              value={cities[0]}
              options={cities}
              optionLabel="name"
              placeholder="Select a City"
              className="border-none outline:none focus:outline-none focus:shadow-none"
            />
          </div>
        </div>
      </div>

      <div className="w-app-bar-search-width border-2 rounded-3xl">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText
            v-model="value1"
            placeholder="Search"
            className="border-none w-full rounded-3xl p-2 pl-10"
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
                router.push('/login');
              }}
            />
          </div>
          <div className="w-custom-button h-custom-button">
            <CustomButton
              className="w-full h-full bg-primary-color border-primary-color hover:bg-white hover:text-black"
              label="Sign up"
              rounded={true}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
