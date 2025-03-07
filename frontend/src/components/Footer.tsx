import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Car,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-secondary-100 text-text-950 py-8 px-6 md:px-16 shadow-lg mt-10'>
      <div className='max-w-7xl mx-auto flex flex-wrap justify-between gap-10'>
        {/* Company Info & Newsletter */}
        <div className='max-w-md'>
          <h2 className='text-3xl font-bold text-primary-600 flex items-center'>
            <Car size={35} className='mr-2 text-primary-600' />
            RentEase
          </h2>
          <p className='mt-4 text-base text-text-800 leading-relaxed'>
            Your trusted partner for affordable and luxury car rentals. Find
            your perfect ride today.
          </p>

          {/* Newsletter */}
          <h3 className='mt-6 text-xl font-semibold text-primary-700'>
            Subscribe
          </h3>
          <form className='mt-4 flex items-center bg-background-200 rounded-lg overflow-hidden shadow-md'>
            <input
              type='email'
              placeholder='Enter your email'
              className='px-4 py-2 flex-1 bg-transparent text-text-950 placeholder-text-800 text-base focus:outline-none'
              aria-label='Email address'
            />
            <button className='bg-primary-500 px-5 py-2 flex items-center gap-2 text-white text-base font-medium hover:bg-primary-600 transition-all'>
              <Mail size={18} /> Subscribe
            </button>
          </form>
        </div>

        {/* Navigation Contact and Social Section */}
        <div className='flex flex-col sm:flex-row items-start gap-10'>
          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-semibold text-primary-700'>
              Quick Links
            </h3>
            <ul className='mt-4 space-y-2 text-text-800 text-base'>
              {["Home", "Browse Cars", "About Us", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      to={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                      }
                      className='hover:text-primary-500 transition-colors duration-200'>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className='flex justify-center flex-col gap-10 md:gap-5 md:flex-row lg:flex-col'>
            {/* Contact Info */}
            <div>
              <h3 className='text-xl font-semibold text-primary-700'>
                Contact Us
              </h3>
              <p className='mt-4 text-base text-text-800'>
                Phone: +1 (123) 456-7890
              </p>
              <p className='text-base text-text-800'>
                Email: support@rentEase.com
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h3 className='text-xl font-semibold text-primary-700'>
                Follow Us
              </h3>
              <div className='flex gap-4 mt-4'>
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href='#'
                    className='p-3 bg-background-200 rounded-full hover:bg-primary-500 hover:text-white transition-all duration-200 shadow-md'
                    aria-label={Icon.name}>
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='text-center text-text-700 text-base mt-10 border-t border-text-300 pt-3'>
        © {currentYear} RentEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
