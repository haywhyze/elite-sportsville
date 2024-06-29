import { Sunrise } from 'lucide-react';
import { ReactNode } from "react";

export const periodColors: { [key: string]: string } = {
  morning: 'bg-blue-800',
  afternoon: 'bg-yellow-400',
  evening: 'bg-orange-400',
  night: 'bg-blue-900',
};

export interface Tab {
  name: string;
  id: string;
}

export const tabs: Tab[] = [
  { name: 'Morning', id: 'morning' },
  { name: 'Afternoon', id: 'afternoon' },
  { name: 'Evening', id: 'evening' },
  { name: 'Night', id: 'night' },
];
