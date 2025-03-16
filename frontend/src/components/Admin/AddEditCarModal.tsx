import { useState } from "react";
import { useCarStore, Car } from "../../store/carsStore";
import { X, Trash2, Loader2, PlusCircle } from "lucide-react";

const AddEditCarModal = ({
  car,
  onClose,
  setToast,
}: {
  car: Car | null;
  onClose: () => void;
  setToast: React.Dispatch<
    React.SetStateAction<{
      id: number;
      message: string;
      type: "success" | "error" | "warning";
    } | null>
  >;
}) => {
  const { addNewCar, updateExistingCar } = useCarStore();
  const token = localStorage.getItem("token");

  // Form state
  const [formData, setFormData] = useState({
    name: car?.name || "",
    brand: car?.brand || "",
    model: car?.model || "",
    year: car?.year || new Date().getFullYear(),
    type: car?.type || "Sedan",
    price_per_day: car?.price_per_day || 1000,
    fuel_type: car?.fuel_type || "Petrol",
    transmission: car?.transmission || "Automatic",
    seats: car?.seats || 4,
    availability: car?.availability ?? true,
    images: car?.images || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year" || name === "price_per_day" || name === "seats"
          ? Number(value)
          : value,
    }));
  };

  // Add a new image input
  const addImageField = () => {
    if (formData.images.length < 5) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ""],
      }));
    }
  };

  // Update an image URL
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  // Remove an image input
  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Filter out empty image fields
    const filteredImages = formData.images.filter((url) => url.trim() !== "");

    if (filteredImages.length === 0) {
      setError("Please provide at least one image URL.");
      setLoading(false);
      return;
    }

    if (formData.year > new Date().getFullYear()) {
      setError("Year cannot be in the future.");
      setLoading(false);
      return;
    }

    try {
      const carData = {
        ...formData,
        images: filteredImages,
        availability: formData.availability ? 1 : 0,
      };

      if (car) {
        await updateExistingCar(car.id, carData, token!);

        setToast({
          id: Date.now(),
          message: "Car updated successfully!",
          type: "success",
        });
      } else {
        await addNewCar(carData, token!);

        setToast({
          id: Date.now(),
          message: "Car added successfully!",
          type: "success",
        });
      }
      onClose();
    } catch (err) {
      setToast({
        id: Date.now(),
        message: "Failed to save car!",
        type: "error",
      });
      setError("Failed to save car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
      <div className='bg-background-50 p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto'>
        {/* Header */}
        <div className='flex justify-between items-center border-b-2 border-accent-500 pb-3 mb-5'>
          <h3 className='text-2xl font-semibold text-text-900'>
            {car ? "Edit Car" : "Add New Car"}
          </h3>
          <button
            onClick={onClose}
            className='text-text-700 hover:text-red-500 transition'>
            <X size={24} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className='text-red-600 text-sm mb-3 text-center'>{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Name & Brand */}
          <div className='grid grid-cols-2 gap-4'>
            <input
              type='text'
              name='name'
              placeholder='Car Name'
              value={formData.name}
              onChange={handleChange}
              className='bg-white/80 dark:bg-background-50 text-primary-950 p-3 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'
              required
            />
            <input
              type='text'
              name='brand'
              placeholder='Brand'
              value={formData.brand}
              onChange={handleChange}
              className='bg-white/80 dark:bg-background-50 text-primary-950 p-3 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'
              required
            />
          </div>

          {/* Model and Year */}
          <div className='grid grid-cols-2 gap-4'>
            <input
              type='text'
              name='model'
              placeholder='Model'
              value={formData.model}
              onChange={handleChange}
              className='bg-white/80 dark:bg-background-50 text-primary-950 p-3 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'
              required
            />
            <input
              type='number'
              name='year'
              placeholder='Year'
              value={formData.year}
              onChange={handleChange}
              className='bg-white/80 dark:bg-background-50 text-primary-950 p-3 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'
              required
            />
          </div>

          {/* Type and Price */}
          <div className='grid grid-cols-2 gap-4'>
            <select
              name='type'
              value={formData.type}
              onChange={handleChange}
              className='bg-white/80 dark:bg-background-50 text-primary-950 p-3 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'>
              <option value='Sedan'>Sedan</option>
              <option value='SUV'>SUV</option>
              <option value='Hatchback'>Hatchback</option>
              <option value='Luxury'>Luxury</option>
              <option value='Electric'>Electric</option>
            </select>
            <input
              type='number'
              name='price_per_day'
              placeholder='Price per Day'
              value={formData.price_per_day}
              onChange={handleChange}
              className='bg-white/80 dark:bg-background-50 text-primary-950 p-3 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'
              required
            />
          </div>

          {/* Fuel Type and Transmission */}
          <div className='grid grid-cols-2 gap-4'>
            <select
              name='fuel_type'
              value={formData.fuel_type}
              onChange={handleChange}
              className='bg-white/80 dark:bg-background-50 text-primary-950 p-3 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'>
              <option value='Petrol'>Petrol</option>
              <option value='Diesel'>Diesel</option>
              <option value='Electric'>Electric</option>
              <option value='Hybrid'>Hybrid</option>
            </select>
            <select
              name='transmission'
              value={formData.transmission}
              onChange={handleChange}
              className='bg-white/80 dark:bg-background-50 text-primary-950 p-3 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'>
              <option value='Automatic'>Automatic</option>
              <option value='Manual'>Manual</option>
            </select>
          </div>

          {/* Seats & Availability */}
          <div className='grid grid-cols-2 gap-4'>
            <input
              type='number'
              name='seats'
              placeholder='Seats'
              value={formData.seats}
              onChange={handleChange}
              className='bg-white/80 dark:bg-background-50 text-primary-950 p-3 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'
              required
            />
            <label className='flex items-center gap-2 text-text-800'>
              <input
                type='checkbox'
                checked={Boolean(formData.availability)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    availability: e.target.checked,
                  }))
                }
                className='w-4 h-4 accent-primary-500'
              />
              Available
            </label>
          </div>

          {/* Images Section */}
          <div>
            <label className='text-text-800 block mb-2 font-medium'>
              Images (Max 5)
            </label>
            {formData.images.map((image, index) => (
              <div key={index} className='flex items-center gap-2 mb-2'>
                <input
                  type='text'
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className='bg-white/80 dark:bg-background-50 text-primary-950 p-3 flex-1 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'
                  placeholder='Enter image URL'
                />
                <button
                  type='button'
                  onClick={() => removeImageField(index)}
                  className='p-2 rounded bg-red-500 text-white hover:bg-red-600 transition'>
                  <Trash2 size={28} />
                </button>
              </div>
            ))}
            {formData.images.length < 5 && (
              <button
                type='button'
                onClick={addImageField}
                className='mt-2 flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition'>
                <PlusCircle size={18} />
                Add Image
              </button>
            )}
          </div>

          {/* Buttons */}
          <div className='flex justify-end gap-3 pt-3'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-500 text-white font-medium rounded-lg shadow-md hover:bg-gray-600 transition-all'>
              Cancel
            </button>
            <button
              type='submit'
              className={`px-4 py-2 flex items-center gap-2 text-white font-medium rounded-lg shadow-md transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600"
              }`}
              disabled={loading}>
              {loading ? <Loader2 size={18} className='animate-spin' /> : null}
              {loading ? "Saving..." : car ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditCarModal;
