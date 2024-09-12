'use client';

// Core
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RestaurantPage() {
  // Hooks
  const router = useRouter();

  // Use Effects
  useEffect(() => {
    router.push('/admin/restaurant/dashboard');
  }, []);

  return <></>;
}
