import React, { useMemo } from 'react'

const StarIcon: React.FC<{ fill: number }> = ({ fill }) => {
  
  // Clip the overlay star so fractional ratings render proportionally
  const clipStyle = useMemo(() => ({
    clipPath: `inset(0 ${Math.max(0, Math.min(1, 1 - fill)) * 100}% 0 0)`
  }), [fill])

  return (
    <span className='relative inline-flex h-5 w-5'>
      <svg
        viewBox='0 0 24 24'
        aria-hidden
        className='h-full w-full text-gray-300'
      >
        <path
          fill='currentColor'
          d='M12 17.25 6.545 20.4l1.042-6.076L2.75 9.9l6.1-.886L12 3.5l3.15 5.514 6.1.886-4.837 4.424 1.042 6.076Z'
        />
      </svg>
      <svg
        viewBox='0 0 24 24'
        aria-hidden
        className='absolute inset-0 h-full w-full text-yellow-400'
        style={clipStyle}
      >
        <path
          fill='currentColor'
          d='M12 17.25 6.545 20.4l1.042-6.076L2.75 9.9l6.1-.886L12 3.5l3.15 5.514 6.1.886-4.837 4.424 1.042 6.076Z'
        />
      </svg>
    </span>
  )
}

export default StarIcon;