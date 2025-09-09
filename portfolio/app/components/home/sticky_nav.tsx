import React, { useState, useEffect } from 'react'

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

const sections = [
  { href: '#hero-section', label: 'Home' },
  { href: '#about-me-section', label: 'About Me' },
  { href: '#skills-section', label: 'Skills' },
  { href: '#featured-projects-section', label: 'Featured Projects' },
  { href: '#contact-section', label: 'Contact' },
];

export const StickyNavLink = ({ href, label, isActive }: NavLinkProps) => {
  return (
    <li>
      <a href={href} className='group flex items-center gap-x-3 md:gap-x-3'>
        {/* Label - always visible on mobile, hover on desktop */}
        <span className='block text-sm md:hidden md:group-hover:block'>{label}</span>
        <div className={`h-6 w-3 md:w-2 rounded-sm transition-colors duration-300 ${
          isActive ? 'bg-primary' : 'bg-border hover:bg-neutral-accent'
        }`}></div>
      </a>
    </li>
  )
}

export const StickyNav = () => {
  const [activeSection, setActiveSection] = useState('#hero-section')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section.href.substring(1))
        
        if (element) {
          const elementTop = element.offsetTop
          if (scrollPosition >= elementTop) {
            setActiveSection(section.href)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop: Right side sticky nav */}
      <nav className='hidden md:block md:fixed md:right-0 md:top-1/2 md:z-20 md:p-4 md:-translate-y-1/2'>
        <ul className='flex flex-col items-end gap-y-4'>
          {sections.map((section) => (
            <StickyNavLink 
              key={section.href} 
              href={section.href} 
              label={section.label} 
              isActive={activeSection === section.href}
            />
          ))}
        </ul>
      </nav>
      
      {/* Mobile: Bottom fixed nav */}
      <nav className='fixed bottom-4 left-1/2 -translate-x-1/2 z-20 md:hidden'>
        <div className='bg-background/80 backdrop-blur-md border border-border rounded-full px-4 py-2'>
          <ul className='flex items-center gap-x-6'>
            {sections.map((section) => (
              <li key={section.href} className='relative'>
                <a href={section.href} className='group block p-2'>
                  {/* Tooltip label - appears on hover */}
                  <span className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap'>
                    {section.label}
                  </span>
                  <div className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    section.href === activeSection ? 'bg-primary' : 'bg-border'
                  }`}></div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
