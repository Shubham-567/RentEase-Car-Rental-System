import { useState, useCallback } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import DangerAlert from "../../components/DangerAlert";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      const message = await login(email, password);
      setLoading(false);

      if (message === "Login successful") {
        navigate("/profile");
      } else {
        setError(message || "Something went wrong. Try again.");
      }
    },
    [email, password, login, navigate]
  );

  return (
    <div className='flex items-center justify-center py-10 px-4 pt-20'>
      <form
        onSubmit={handleSubmit}
        className='bg-secondary-50 border border-secondary-200 p-6 shadow-lg rounded-xl w-full max-w-md'>
        <h2 className='text-3xl text-center text-text-900 font-bold mb-6'>
          Login
        </h2>

        {error && <DangerAlert message={error} />}

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-text-800 font-medium mb-1'>
            Email
          </label>
          <input
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-background p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400'
            required
            aria-required='true'
          />
        </div>

        <div className='mb-4 relative'>
          <label
            htmlFor='password'
            className='block text-text-800 font-medium mb-1'>
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-background p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 pr-10'
            required
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute flex items-center bottom-3 right-3 text-text-800 text-lg font-medium'>
            {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}{" "}
          </button>
        </div>

        <button
          type='submit'
          className='bg-primary-400 text-text-950 font-medium p-3 w-full rounded-lg shadow-md hover:bg-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className='text-text-900 text-center mt-4'>
          Don't have an account?{" "}
          <Link
            to='/register'
            className='text-primary-600 font-bold hover:underline'>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
