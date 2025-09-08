import React from 'react'
import { FiDownload} from 'react-icons/fi'
import { FaXTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6';

export const ContactMe = () => {
  return (
    <div className='flex flex-col gap-y-8'>
        {/* Title */}
        <div className='mx-auto px-4 text-center'>
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">Let's Build Something<br className="hidden md:block"/> Together.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-muted-foreground md:text-xl">I'm currently open to new opportunities. Feel free to reach out.</p>
        </div>

        {/* Contact Buttons */}
        <div className='flex flex-col gap-y-2'>
            {/* CTA buttons */}
            <div>
                <div className='mt-8 flex justify-center gap-x-4'>
                    <a href="mailto:akhigbek6@gmail.com" className="flex w-full cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 sm:w-80">Email Me</a>
                </div>
                <div className="mt-4 flex justify-center">
                    <a className="group flex w-full max-w-xs items-center justify-center gap-3 rounded-full border-2 border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-primary-muted-foreground transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-50" download="" href="/files/resume.pdf">
                    <FiDownload className="size-4 text-primary-muted-foreground group-hover:text-gray-800" />
                    <span>Download Resume</span>
                    </a>
                </div>
            </div>

            {/* Social Contact */}
            <div className='mt-10 flex justify-center space-x-6'>
                <a href="https://twitter.com/rash_nerd" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter className="h-6 w-6 text-primary-muted-foreground transition-colors duration-200 hover:text-gray-800" />
                </a>
                <a href="https://linkedin.com/in/kelvinakhigbe" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="h-6 w-6 text-primary-muted-foreground transition-colors duration-200 hover:text-gray-800" />
                </a>
                <a href="https://github.com/RashnerdUX" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="h-6 w-6 text-primary-muted-foreground transition-colors duration-200 hover:text-gray-800" />
                </a>
            </div>
        </div>
    </div>
  )
}
