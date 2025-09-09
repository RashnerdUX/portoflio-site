import React from 'react'

export const HeroSection = () => {
  return (
    <>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        {/* Background Color */}
        <div className="absolute bottom-0 left-0 right-0 top-0" style={{ background: 'var(--circle-gradient)' }}></div>
        {/* Main content */}
        <div className="relative z-10 flex h-full grow flex-col">
          <div className="flex flex-1 items-center justify-center p-4 md:p-8">
            <div className="max-w-3xl text-center">
              <h1 className="text-5xl font-bold tracking-tighter text-foreground md:text-7xl lg:text-8xl">Kelvin Akhigbe</h1>
              <p className="mt-4 text-lg text-primary-muted-foreground md:text-xl">Full-Stack Developer, turning prescriptions into code.</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a className="flex w-full cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 sm:w-auto" href="#work"> See My Work </a>
                <a className="flex w-full cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3 text-base font-bold text-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 sm:w-auto" href="#contact"> Get in Touch </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="animate-bounce">
              {/* TODO: Change the bounce svg */}
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
