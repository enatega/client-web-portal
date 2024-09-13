import TippingAddForm from '@/lib/ui/screen-components/protected/tipping/add-form/add-form';
import TextComponent from '@/lib/ui/useable-components/text-field';

export default function TippingScreen() {
  return (
    <div className="py-9 px-6">
      <TextComponent className="text-4xl font-bold" text="Tipping " />
      <TippingAddForm />
    </div>
  );
}
