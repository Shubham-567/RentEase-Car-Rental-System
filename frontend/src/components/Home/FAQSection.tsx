import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "What documents are needed?",
    answer:
      "You need a valid driver’s license, proof of insurance, and a credit card for the security deposit.",
  },
  {
    question: "Can someone else pick up the rental car for me?",
    answer:
      "No, the person who made the reservation must be present at pickup with a valid driver’s license and meet all rental requirements.",
  },
  {
    question: "Is there a mileage limit?",
    answer:
      "Yes, some cars have mileage limits. Please check the rental terms for details.",
  },
  {
    question: "What happens in case of an accident?",
    answer:
      "Contact our 24/7 support team immediately and follow the instructions provided in the rental agreement.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='py-20 px-6 sm:px-8 md:px-12 bg-background-50'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start'>
        {/* Left Side Content */}
        <div className='md:col-span-1 self-start'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-950 tracking-wide mb-6'>
            FAQs
          </h2>
          <p className='text-gray-500 text-base sm:text-lg leading-relaxed'>
            Find answers to the most common questions regarding our service.
          </p>
        </div>

        {/* Right Side Accordion */}
        <div className='md:col-span-2 flex flex-col gap-6'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className='p-6 rounded-xl border transition-all duration-300 cursor-pointer bg-secondary-50 border-accent-500 shadow-lg hover:shadow-md'
              onClick={() => toggleFAQ(index)}>
              <div className='flex justify-between items-center'>
                <h3 className='text-base sm:text-lg md:text-xl font-semibold text-text-950'>
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <X className='text-accent-500 w-6 h-6 transition-transform transform rotate-90' />
                ) : (
                  <Plus className='text-accent-500 w-6 h-6 transition-transform transform' />
                )}
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "mt-4 opacity-100 max-h-[300px]"
                    : "opacity-0 max-h-0"
                }`}>
                <p className='text-text-900 leading-relaxed'>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
