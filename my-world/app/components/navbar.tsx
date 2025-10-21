import React, { useState } from 'react'
import { ThemeToggle } from './themeToggle'
import { FaArrowRightLong } from "react-icons/fa6";
import { Menu, X } from 'lucide-react';

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    console.log("Opening mobile menu");
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log("Mobile menu toggled:", !isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
        <nav className='flex items-center justify-between'>
          {/* Logo/Brand - Empty for now */}
          <div></div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center gap-4'>
            <div className='flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/80 hover:font-bold text-primary-foreground px-4 py-2 text-sm font-medium transition-colors'>
              <a href="https://www.kelvinakhigbe.com" className=''> My Portfolio </a>
              <span className='mx-3'><FaArrowRightLong /></span>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger Button */}
          <div className='flex lg:hidden items-center gap-4'>
            <button
              onClick={toggleMobileMenu}
              className='p-2 rounded-lg border border-primary/40 bg-primary/20 text-secondary-foreground hover:bg-primary/80 transition-colors'
              aria-label='Toggle menu'
            >
              {isMobileMenuOpen ? (
                <X className='size-5 text-background-foreground font-bold' />
              ) : (
                <Menu className='size-5 text-background-foreground font-bold' />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden'
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <div className='fixed top-0 right-0 h-full w-[280px] bg-background border-l border-primary/20 z-50 lg:hidden shadow-2xl'>
              <div className='flex flex-col h-full'>
                {/* Header with Theme Toggle */}
                <div className='flex items-center justify-between p-4 border-b border-primary/20'>
                  <h2 className='text-lg font-semibold text-background-foreground'>Menu</h2>
                  <ThemeToggle />
                </div>

                {/* Navigation Links */}
                <div className='flex-1 overflow-y-auto p-4'>
                  <ul className='space-y-2'>
                    <li>
                      <a
                        href='#ranking'
                        onClick={closeMobileMenu}
                        className='flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 text-background-foreground transition-colors'
                      >
                        <span className='text-lg'>📊</span>
                        <span className='font-medium'>Ranking</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href='#watch-order'
                        onClick={closeMobileMenu}
                        className='flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 text-background-foreground transition-colors'
                      >
                        <span className='text-lg'>📺</span>
                        <span className='font-medium'>Watch Order</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.kelvinakhigbe.com'
                        onClick={closeMobileMenu}
                        className='flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-background-foreground transition-colors'
                      >
                        <span className='text-lg'>💼</span>
                        <span className='font-medium'>My Portfolio</span>
                        <FaArrowRightLong className='ml-auto' />
                      </a>
                    </li>
                  </ul>

                  {/* Divider */}
                  <div className='my-6 border-t border-primary/20' />

                  {/* Social Links */}
                  <div className='space-y-3'>
                    <h3 className='text-sm font-semibold text-background-foreground/60 uppercase tracking-wide'>Connect</h3>
                    <ul className='space-y-2'>
                      <li>
                        <a
                          href='https://github.com/RashnerdUX'
                          target='_blank'
                          rel='noopener noreferrer'
                          onClick={closeMobileMenu}
                          className='flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 text-background-foreground transition-colors'
                        >
                          <span className='text-lg'>💻</span>
                          <span>GitHub</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href='https://linkedin.com/in/kelvinakhigbe'
                          target='_blank'
                          rel='noopener noreferrer'
                          onClick={closeMobileMenu}
                          className='flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 text-background-foreground transition-colors'
                        >
                          <span className='text-lg'>💼</span>
                          <span>LinkedIn</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href='https://twitter.com/yourusername'
                          target='_blank'
                          rel='noopener noreferrer'
                          onClick={closeMobileMenu}
                          className='flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 text-background-foreground transition-colors'
                        >
                          <span className='text-lg'>🐦</span>
                          <span>Twitter</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className='p-4 border-t border-primary/20'>
                  <p className='text-xs text-center text-background-foreground/60'>
                    © 2025 Kelvin Akhigbe
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  )
}
