import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = (props: any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 text-text-800'>
      {/* Icon */}
      <div className='flex items-center justify-center w-20 h-20 rounded-full bg-red-500 shadow-lg animate-fade-in'>
        <AlertTriangle className='w-12 h-12 text-white' />
      </div>

      {/* Title */}
      <h1 className='mt-6 text-5xl font-bold text-text-900 animate-slide-up sm:text-6xl'>
        404
      </h1>
      <h2 className='mt-2 text-2xl font-semibold sm:text-3xl'>
        {props.title ? props.title : "Page Not Found"}
      </h2>

      {/* Message */}
      <p className='mt-4 text-text-800 text-center max-w-md sm:text-lg'>
        {props.message
          ? props.message
          : "Oops! The page you are looking for might have been removed or is temporarily unavailable."}
      </p>

      {/* Back Button */}
      <Link
        to='/'
        className='mt-6 px-6 py-3 bg-primary-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-primary-600 transition-all duration-300 active:scale-95'>
        Back to Home
      </Link>

      {/* Blurred Background Effect */}
      <div className='absolute inset-0 -z-10 flex items-center justify-center'>
        <div className='w-72 h-72 bg-primary-500/50 dark:bg-primary-300/30 rounded-full blur-3xl opacity-50'></div>
      </div>
    </div>
  );
};

export default NotFound;
