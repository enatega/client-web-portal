import TippingAddForm from '@/lib/ui/screen-components/protected/tipping/add-form/add-form';
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextComponent from '@/lib/ui/useable-components/text-field';

export default function TippingScreen() {
  return (
    <div className="py-9 px-6">
      <HeaderText className="heading" text="Tipping" />
      <TippingAddForm />
    </div>
  );
}
