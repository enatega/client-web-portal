'use client';
import { createContext } from 'react';
export const QueryContext = createContext<any>({
  data: [],
  loading: false,
  error: undefined,
});
