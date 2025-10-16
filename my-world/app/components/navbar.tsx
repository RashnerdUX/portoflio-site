import React from 'react'
import { Themetoggle } from './themeToggle'

export const NavBar = () => {
  return (
    <div>
        <nav className='flex items-center'>
          <div></div>
          <div>
            <a href="/mcu" className='text-secondary-foreground hover:underline'> Check Portfolio </a>
            <Themetoggle />
          </div>
        </nav>
    </div>
  )
}
