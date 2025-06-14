import { AlertCircle } from "lucide-react";

interface DangerAlertProps {
  message?: string;
}

const DangerAlert: React.FC<DangerAlertProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className='flex items-start gap-3 p-4 mb-4 rounded-lg border border-red-300 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-100 dark:border-red-800 shadow-sm'
      role='alert'>
      <AlertCircle className='w-5 h-5 text-red-500 dark:text-red-400' />

      <div className='flex-1 text-sm leading-relaxed'>{message}</div>
    </div>
  );
};

export default DangerAlert;
