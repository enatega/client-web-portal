// Prime React
import { Sidebar } from 'primereact/sidebar';

// Interface and Types
import { IVendorAddFormComponentProps } from '@/lib/utils/interfaces';

export default function VendorAddForm({
  position = 'right',
  visible,
  setVisibility,
}: IVendorAddFormComponentProps) {
  return (
    <Sidebar
      visible={visible}
      position={position}
      onHide={() => setVisibility(false)}
    >
      <h2>Right Sidebar</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </Sidebar>
  );
}
