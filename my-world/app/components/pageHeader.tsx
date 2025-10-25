import React from 'react'
import { NavBar } from './navbar'

export const PageHeader = () => {
  return (
    <header className='border-b border-solid border-tertiary bg-background/70 backdrop-blur-md shadow-sm'>
        <div className='py-4 px-4 sm:px-6 lg:px-16 border-b border-solid border-tertiary flex items-center justify-between'>
          {/* Put an SVG Icon here later */}
          <h1 className='text-lg text-secondary-foreground font-bold font-family'> The Index </h1>
          <NavBar />
        </div>
    </header>
  )
}


export default PageHeader;