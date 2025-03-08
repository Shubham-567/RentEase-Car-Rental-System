import { useState, useCallback } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import DangerAlert from "../components/DangerAlert";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (!name || !email || !password || !phone) {
        setError("All fields are required.");
        return;
      }

      setLoading(true);

      try {
        const message = await register(name, email, password, phone);

        if (message === "Registration successful. You can now log in.") {
          navigate("/login");
        } else {
          setError(message || "Registration failed. Please try again.");
        }
      } catch (error) {
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [name, email, password, phone, register, navigate]
  );

  return (
    <div className='flex items-center justify-center py-10 px-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-secondary-50 border border-secondary-200 p-6 shadow-lg rounded-xl w-full max-w-md'>
        <h2 className='text-3xl text-center text-text-900 font-bold mb-6'>
          Register
        </h2>

        {error && <DangerAlert message={error} />}

        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-text-800 font-medium mb-1'>
            Name
          </label>
          <input
            type='text'
            id='name'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='bg-background dark:bg-background-950 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400'
            required
          />
        </div>

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
            className='bg-background dark:bg-background-950 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400'
            required
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
            className='bg-background dark:bg-background-950 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 pr-10'
            required
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute flex items-center bottom-3 right-3 text-primary-500 text-lg font-medium'>
            {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}{" "}
          </button>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='phone'
            className='block text-text-800 font-medium mb-1'>
            Phone
          </label>
          <input
            type='text'
            id='phone'
            placeholder='Enter your phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='bg-background dark:bg-background-950 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400'
            required
          />
        </div>

        <button
          type='submit'
          className='bg-primary-400 text-text-950 font-medium p-3 w-full rounded-lg shadow-md hover:bg-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className='text-text-900 text-center mt-4'>
          Already have an account?{" "}
          <Link
            to='/login'
            className='text-primary-600 font-bold hover:underline'>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
