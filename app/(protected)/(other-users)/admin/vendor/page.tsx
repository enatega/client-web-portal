'use client';

// Core
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RestaurantPage() {
  // Hooks
  const router = useRouter();

  // Effects
  useEffect(() => {
    router.push('/admin/restaurant/dashboard'); // vendor or restaurant based on user type
  }, []);

  return <></>;
}
