import { GlobalButtonPropsType } from '@/app/types/global-types';
import { Button } from 'primereact/button';

export default function GlobalButton({ Icon, title }: GlobalButtonPropsType) {
  return (
    <Button className="bg-black py-2 px-3 rounded-md flex gap-3 items-center justify-center hover:bg-[#272727]">
      <span>
        <Icon size={20} color="white" />
      </span>
      <span className="text-white">{title}</span>
    </Button>
  );
}
