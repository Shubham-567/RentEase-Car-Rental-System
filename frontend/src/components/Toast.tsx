import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, AlertTriangle, XCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Trigger exit animation
      setTimeout(onClose, 400); // Remove after animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: {
      color:
        "text-green-500 bg-green-100 dark:bg-green-700 dark:text-green-100",
      icon: <CheckCircle className='w-6 h-6' />,
    },
    error: {
      color: "text-red-500 bg-red-100 dark:bg-red-700 dark:text-red-100",
      icon: <XCircle className='w-6 h-6' />,
    },
    warning: {
      color:
        "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-100",
      icon: <AlertTriangle className='w-6 h-6' />,
    },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }} // Start slightly below
          animate={{ opacity: 1, y: 0 }} // Slide up
          exit={{ opacity: 0, y: 30 }} // Slide down on exit
          transition={{ duration: 0.4, ease: "easeOut" }}
          className='fixed bottom-5 right-5 z-50 flex items-center w-full max-w-sm p-4 text-text-950 bg-secondary-50 rounded-xl shadow-lg border-2 border-secondary-500'>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${icons[type].color}`}>
            {icons[type].icon}
          </div>
          <div className='ml-4 text-sm font-bold'>{message}</div>
          <button
            onClick={() => setVisible(false)}
            className='ml-auto bg-transparent text-accent-500 hover:text-accent-800 rounded-lg focus:ring-2 focus:ring-accent-300 p-2 hover:bg-accent-100'>
            <X className='w-5 h-5' />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
