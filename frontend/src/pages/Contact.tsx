import { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Create mailto link
    const mailtoLink = `mailto:shubhampatil1356@gmail.com?subject=PlanEase%20Contact%20Request%20from%20${encodeURIComponent(
      form.name
    )}&body=Name: ${encodeURIComponent(
      form.name
    )}%0AEmail: ${encodeURIComponent(form.email)}%0A%0A${encodeURIComponent(
      form.message
    )}`;

    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <section className='min-h-screen flex items-center justify-center px-6 py-12'>
      <div className='max-w-3xl w-full bg-background-50 shadow-xl rounded-lg p-10 md:p-16'>
        <h1 className='text-4xl font-extrabold text-text-950 md:text-5xl text-center'>
          Contact <span className='text-primary'>Us</span>
        </h1>
        <div className='w-24 h-1 bg-primary mx-auto my-4'></div>

        <p className='text-lg text-text-700 text-center mb-6'>
          Have questions? Fill out the form and we'll get back to you soon.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className='grid gap-6'>
          <div>
            <label className='block text-text-800 font-medium mb-2'>Name</label>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border border-background-300 rounded-md bg-white dark:bg-background-50 text-text-950 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none'
              placeholder='Your Name'
            />
          </div>

          <div>
            <label className='block text-text-800 font-medium mb-2'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border border-background-300 rounded-md bg-white dark:bg-background-50 text-text-950 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none'
              placeholder='Your Email'
            />
          </div>

          <div>
            <label className='block text-text-800 font-medium mb-2'>
              Message
            </label>
            <textarea
              name='message'
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className='w-full px-4 py-3 border border-background-300 rounded-md bg-white dark:bg-background-50 text-text-950 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none'
              placeholder='Your Message'
            />
          </div>

          <button
            type='submit'
            className='px-6 py-3 bg-primary-500 text-text-50 dark:text-text-950 font-semibold text-lg rounded-lg hover:shadow-2xl hover:bg-primary-600 hover:shadow-primary-400 hover:-translate-y-1 transform transition duration-300'>
            Send Message
          </button>
        </form>

        {/* Back to Home */}
        <div className='text-center mt-6'>
          <Link to='/' className='text-text-500 font-medium hover:underline'>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
