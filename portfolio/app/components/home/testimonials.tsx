import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { ImQuotesLeft } from 'react-icons/im';

interface TestimonialsCardProps {
    name: string;
    role: string;
    quote: string;
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({ name, role, quote }) => {
  return (
    <div className="flex flex-col justify-between bg-white dark:bg-gray-800 w-xs h-[256px] p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700">
        {/* The quote icon*/}
      <div className='flex flex-col gap-4'>
        <ImQuotesLeft className='size-8 text-primary'/>
        {/* The quote */}
        <p className="text-foreground font-bold">{quote}</p>
      </div>

      {/* The author */}
      <div className="mt-4">
        <div className='w-[48px] h-[4px] bg-foreground mb-2'></div>
        <p className="font-bold">{name}</p>
        <p className="text-sm text-primary-muted-foreground">{role}</p>
      </div>
    </div>
  )
}

const testimonials: TestimonialsCardProps[] = [
  {
    name: "Jane Doe",
    role: "CEO, Company A",
    quote: "This is the best service I have ever used!"
  },
  {
    name: "John Smith",
    role: "CTO, Company B",
    quote: "I can't believe how much this has helped my business."
  },
    {
    name: "John Smith",
    role: "CTO, Company B",
    quote: "I can't believe how much this has helped my business."
  },
    {
    name: "Jane Doe",
    role: "CEO, Company A",
    quote: "This is the best service I have ever used!"
  },
  {
    name: "John Smith",
    role: "CTO, Company B",
    quote: "I can't believe how much this has helped my business."
  },
]

export const Testimonials = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Animation refuses to work
  // TODO: Fix the animation later on
  return (
    <div className='container mx-auto max-w-5xl'>
        <div className='text-center mb-8'>
            <h2 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight mb-2">What my clients say</h2>
        </div>
        <div className='overflow-hidden mt-12'>
          {/* Carousel scroll right */}
          <div className='flex w-max animate-scroll-right'>
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={index} className='p-4'>
                <TestimonialsCard {...testimonial} />
              </div>
            ))}
          </div>
          {/* Carousel scroll left */}
          <div className='flex w-max animate-scroll-left'>
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={index} className='p-4'>
                <TestimonialsCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

// TODO: Delete if this is not needed later on
export const testimonial_star_component = () => {
    return (
        <div className='flex items-center mt-2 justify-center gap-x-2 bg-amber-400 mx-auto py-2 px-4 rounded-4xl'>
            <div className='rounded-full size-8 bg-secondary flex items-center justify-center'>
                <FaStar className="text-white" />
            </div>
            <span className="ml-2 text-sm text-gray-600">Rated by over 10 clients</span>
        </div>
    )
}
