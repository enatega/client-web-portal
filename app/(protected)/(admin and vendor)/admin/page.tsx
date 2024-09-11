'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  // Hooks
  const router = useRouter();

  // Effects
  useEffect(() => {
    router.push('/admin/restaurant/dashboard');
  }, []);

  return <></>;
}
