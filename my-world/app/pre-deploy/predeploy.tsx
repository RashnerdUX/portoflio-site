import React from 'react'
import { Link } from 'react-router'

export const Predeploy = () => {
  return (
    <div className='text-center flex flex-col gap-6 items-center justify-center min-h-screen bg-gradient-to-br from-background/80 to-background text-foreground transition-all duration-300'>
      <div className='flex flex-col items-center justify-center'>
        <h1  className='font-black text-5xl text-foreground'>In preparation for Doomsday</h1>
        <p className='mt-4 text-lg text-foreground/70'>Begin your Watch Journey Here</p>
      </div>

      <Link to={"mcu-index"} className='bg-primary text-primary-foreground w-auto py-2 px-6 rounded-md transition-all hover:bg-primary/80'> Enter the Index</Link>
    </div>
  )
}
