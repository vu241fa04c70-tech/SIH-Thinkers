import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  text?: string;
}

export const LoadingSpinner: React.FC<Props> = ({ text = "Processing AI calculations..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      <p className="text-sm font-medium text-slate-700">{text}</p>
    </div>
  );
};
