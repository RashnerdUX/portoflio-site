import React from 'react'

export const Footer = () => {
    // This is the footer that shows the copyright information and navigation links
  return (
    <>
        <footer className="w-full border-t border-gray-200 mt-12 md:mt-16 lg:mt-20">
            <div className="container mx-auto flex items-center justify-between px-4 py-6 md:px-20">
                <p className="text-sm text-gray-500">© 2025 Kelvin Akhigbe. All rights reserved.</p>
                <div className="flex items-center space-x-4">
                    <a className="text-sm text-gray-500 hover:text-primary-600" href="#hero-section">Home</a>
                    <a className="text-sm text-gray-500 hover:text-primary-600" href="#about-me-section">About</a>
                    <a className="text-sm text-gray-500 hover:text-primary-600" href="#featured-projects-section">Projects</a>
                    <a className="text-sm text-gray-500 hover:text-primary-600" href="#testimonials-section">Testimonials</a>
                </div>
            </div>
        </footer>
    </>
  )
}
