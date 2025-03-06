interface DangerAlertProps {
  message?: string;
}

const DangerAlert: React.FC<DangerAlertProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
      role='alert'>
      <span className='font-bold'>Error! </span>
      {message}
    </div>
  );
};

export default DangerAlert;
