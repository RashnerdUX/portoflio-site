import React from 'react'
import { NavBar } from './navbar'

export const PageHeader = () => {
  return (
    <header className='py-4 px-4 sm:px-6 lg:px-16 border-b border-solid border-tertiary flex items-center justify-between'>
        <div className='flex items-center justify-start'>
          {/* Put an SVG Icon here later */}
          <h1 className='text-lg text-secondary-foreground font-bold font-family'> The Index </h1>
        </div>
        <NavBar />
      </header>
  )
}


export default PageHeader;