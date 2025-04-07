import { useState } from "react";
import { Car } from "lucide-react";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  startDate: Date | null;
  endDate: Date | null;
  userName: string;
  userEmail: string;
  userPhone: string;
  onProceed: (details: {
    name: string;
    email: string;
    phone: string;
    pickupLocation?: string;
    dropoffLocation?: string;
    alternatePhone?: string;
    note?: string;
  }) => void;
  showToast: (message: string, type: "success" | "error" | "warning") => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  isOpen,
  onClose,
  carName,
  startDate,
  endDate,
  userName,
  userEmail,
  userPhone,
  onProceed,
  showToast,
}) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState(userPhone);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [note, setNote] = useState("");
  const [agree, setAgree] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !phone ||
      !agree ||
      !pickupLocation ||
      !dropoffLocation
    ) {
      showToast(
        "Please fill all required fields and accept the terms.",
        "warning"
      );
      return;
    }

    onProceed({
      name,
      email,
      phone,
      pickupLocation,
      dropoffLocation,
      alternatePhone,
      note,
    });

    onClose();
  };

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString("en-GB") : "N/A";

  const locationOptions = [
    "",
    "Mumbai Airport T2",
    "Mumbai CST Station",
    "Pune Station",
    "Delhi IGI Airport",
    "Bangalore City Center",
  ];

  return (
    <div
      className='fixed inset-0 bg-black/60 flex justify-center items-center z-50 animate-fadeIn'
      onClick={onClose}>
      <div
        className='bg-background-50 p-6 sm:p-8 rounded-xl shadow-2xl w-[95%] max-w-lg border border-gray-200 overflow-auto max-h-[90vh]'
        onClick={(e) => e.stopPropagation()}>
        <h2 className='text-2xl font-bold text-text-900 flex items-center gap-2 mb-4'>
          <Car size={24} className='text-primary-500' />
          Booking Form
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4 text-text-900'>
          <div>
            <label className='block mb-1 font-medium'>
              Car<span className='text-red-500'>*</span>
            </label>
            <p className='input-field'>{carName}</p>{" "}
          </div>

          <div className='flex gap-4 flex-col sm:flex-row'>
            <div className='flex-1'>
              <label className='block mb-1 font-medium'>
                Start Date<span className='text-red-500'>*</span>
              </label>
              <p className='input-field'>{formatDate(startDate)}</p>
            </div>
            <div className='flex-1'>
              <label className='block mb-1 font-medium'>
                End Date<span className='text-red-500'>*</span>
              </label>
              <p className='input-field'>{formatDate(endDate)}</p>
            </div>
          </div>

          <div>
            <label className='block mb-1 font-medium'>
              Full Name<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='input-field'
              required
            />
          </div>

          <div>
            <label className='block mb-1 font-medium'>
              Email<span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input-field'
              required
            />
          </div>

          <div>
            <label className='block mb-1 font-medium'>
              Phone<span className='text-red-500'>*</span>
            </label>
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='input-field'
              required
            />
          </div>

          <div>
            <label className='block mb-1 font-medium'>
              Pickup Location<span className='text-red-500'>*</span>
            </label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className='input-field cursor-pointer'>
              {locationOptions.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc || "Select a location"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block mb-1 font-medium'>
              Drop-off Location<span className='text-red-500'>*</span>
            </label>
            <select
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className='input-field cursor-pointer'>
              {locationOptions.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc || "Select a location"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block mb-1 font-medium'>
              Alternate Contact Number (optional)
            </label>
            <input
              type='tel'
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
              className='input-field'
              placeholder='e.g. +91 98765 43210'
            />
          </div>

          <div>
            <label className='block mb-1 font-medium'>Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className='input-field resize-none'
              rows={3}
              placeholder='Any special request or instructions?'
            />
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={agree}
              onChange={() => setAgree(!agree)}
              className='accent-primary-500 size-4'
              id='agree-policy'
            />
            <label htmlFor='agree-policy' className='text-sm text-gray-700'>
              I agree to the{" "}
              <span className='text-primary-600 underline cursor-pointer'>
                rental policy
              </span>
              .
            </label>
          </div>

          <div className='flex justify-end gap-4 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-5 py-2 bg-gray-200 rounded font-medium hover:bg-gray-300'>
              Cancel
            </button>
            <button
              type='submit'
              className='px-6 py-2 bg-primary-500 text-white rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-primary-600 transition-all'>
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
