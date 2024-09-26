import React from 'react';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { TPaymentType } from '@/lib/utils/types/payment-type';
import { StripeSVG } from '@/lib/utils/assets/svgs/stripeLogo';
import { IPaymentCardProps } from '@/lib/utils/interfaces';

export default function PaymentCard({
  name,
  description,
  onClick,
  loading,
  icon,
  type,
}: IPaymentCardProps & { type: TPaymentType }) {
  const LogoComponent = type === 'stripe' ? StripeSVG : null;

  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center bg-white">
      <div className="mb-6 flex items-center justify-center">
        {LogoComponent && <LogoComponent />}
      </div>
      <h2 className="text-lg font-bold text-black mb-2">{name}</h2>
      <p className="text-gray-500 mb-4 text-center">{description}</p>
      <TextIconClickable
        className="bg-black text-white  border-gray-300 rounded"
        icon={icon}
        iconStyles={{ color: 'white' }}
        title={`Connect with ${name}`}
        onClick={onClick}
        loading={loading}
      />
    </div>
  );
}
