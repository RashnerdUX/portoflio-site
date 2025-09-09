import React from 'react'
import { HeroSection } from '~/components/home/hero_section';
import { StickyNav } from '~/components/home/sticky_nav';
import { Skills} from '~/components/home/skills';
import { Themetoggle } from '~/components/Themetoggle';
import { FeaturedProjects } from '~/components/home/featured_projects';
import { AboutMe } from '~/components/home/about_me';
import { Testimonials } from '~/components/home/testimonials';
import { ContactMe } from '~/components/home/contact';

export const Index = () => {
  return (
    <div className='bg-background min-h-screen text-foreground px-4 md:px-6 lg:px-8'>
    {/* Theme toggle button */}
    <Themetoggle />
    {/* Sticky sidebar navigation */}
    <StickyNav />
    {/* Hero section */}
    <section id='hero-section'>
      <HeroSection />
    </section>

    {/* About me section */}
    <section id='about-me-section' className='section'>
      <AboutMe />
    </section>

    {/* Skills section */}
    <section id='skills-section' className='section'>
      <Skills />
    </section>

    {/* Featured Projects section */}
    <section id='featured-projects-section' className='section'>
      <FeaturedProjects />
    </section>

    {/* TODO: There are two sections to work on later */}
    {/* Journey so far */}
    {/* <section id='experience-section' className='section'>
    </section> */}

    {/* Testimonials */}
    {/* <section id='testimonials-section' className='section'>
      <Testimonials />
    </section> */}

    {/* Contact section */}
    <section id='contact-section' className='section'>
      <ContactMe />
    </section>
    </div>
  )
}

export default Index;
