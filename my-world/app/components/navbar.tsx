import React, {useState} from 'react'
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import ThemeToggle from './themeToggle';
import { NavLink } from 'react-router';

export const NavBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    console.log("Opening menu");
    setIsMenuOpen(true);
  }

  const closeMenu = () => {
    console.log("Closing menu");
    setIsMenuOpen(false);
  }

  const mobileMenuItems = [
    { name: 'Home', href: '/' },
    { name: 'Watch Order', href: '/about' },
    { name: 'Portfolio', href: 'https://www.kelvinakhigbe.com' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/RashnerdUX' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/kelvinakhigbe/' },
    { name: 'Twitter', href: 'https://twitter.com/rash_nerd' },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className='sticky top-0 bg-background border-b border-b-tertiary backdrop-blur-md z-50'>
        {/* Main container */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Navbar Content */}
          <div className='flex items-center justify-between h-16'>

            {/* Web logo */}
            <div className='flex-shrink-0'>
              <a href='/' className='text-xl font-bold text-foreground/90 hover:text-foreground transition-colors duration-200'>
                The Index
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-4'>
              {/* Only Link on Desktop */}
              <a 
                href="https://www.kelvinakhigbe.com" 
                className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Portfolio
              </a>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden'>
              <button className='p-2 rounded-md text-primary-foreground hover:bg-primary/80 transition-colors' onClick={isMenuOpen ? closeMenu : openMenu} aria-label='Toggle Menu'>
                {isMenuOpen ? <X className='size-6' /> : <Menu className='size-6'/>}
              </button> 
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
        {/* Back drop */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}/>
        )}

        {/* Side Panel */}
        <div className={`fixed top-0 right-0 h-full w-full bg-card backdrop-blur-lg border-l border-primary/20 shadow-lg transform transition-transform duration-300 z-50 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

            {/* Mobile Menu Items */}
          <nav className="flex flex-col justify-between h-full p-6">

              {/* Close Button */}
              <div className="flex justify-between">
                {/* Add the Logo */}
                <h2 className='text-lg font-bold text-foreground/90 hover:text-foreground transition-colors duration-200 mr-auto self-center'>The Index</h2>
                <button className="p-2 rounded-md text-primary-foreground hover:bg-primary/80 transition-colors" onClick={closeMenu} aria-label="Close Menu">
                  <X className='size-6' />
                </button>
              </div>

              {/* Main Mobile Items */}
              <div className='flex flex-col items-center justify-center flex-grow'>
                <div className='flex flex-col gap-12 items-center justify-center'>
                  {mobileMenuItems.map((item) => (
                    <NavLink key={item.name} to={item.href} className={({ isActive, isPending }) => `text-2xl font-medium ${isActive ? 'text-primary' : 'text-foreground/90'} ${isActive ? 'font-bold' : 'font-normal'} focus:text-foreground transition-colors duration-200`} onClick={closeMenu}>
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className='flex items-center justify-between py-4'>
                {socialLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    className='text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-200'
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </nav>
        </div>
      </>
  )
}

export default NavBar;
