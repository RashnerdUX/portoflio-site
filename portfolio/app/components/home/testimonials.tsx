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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700">
        {/* The quote icon*/}
      <div className='mb-2'>
        <ImQuotesLeft className='size-8 text-primary'/>
      </div>
      {/* The quote */}
      <p className="text-foreground font-bold">{quote}</p>

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
  }
]

export const Testimonials = () => {
  return (
    <>
        <div className='text-center mb-8'>
            <h2 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight mb-2">What our clients say</h2>
        </div>
        <div>
          {/* A carousel consisting of two rows of testimonials which displays the name, role, and quote for each testimonial */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialsCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
    </>
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
