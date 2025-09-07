import React from 'react'
import { HeroSection } from '~/components/home/hero_section';
import { StickyNav } from '~/components/home/sticky_nav';
import { Skills} from '~/components/home/skills';
import { Themetoggle } from '~/components/Themetoggle';
import { FeaturedProjects } from '~/components/home/featured_projects';
import { AboutMe } from '~/components/home/about_me';

export const Index = () => {
  return (
    <div className='bg-background'>
    {/* Theme toggle button */}
    <Themetoggle />
    {/* Sticky sidebar navigation */}

    {/* Hero section */}
    <section id='hero-section'>
      <HeroSection />
    </section>

    {/* About me section */}
    <section id='about-me-section' className='mx-auto max-w-5xl'>
      <AboutMe />
    </section>

    {/* Skills section */}
    <section className='mx-auto max-w-5xl'>
      <Skills />
    </section>

    {/* Featured Projects section */}
    <section id='featured-projects-section' className='mx-auto max-w-5xl'>
      <FeaturedProjects />
    </section>

    {/* Journey so far */}
    <section id='experience-section' className='mx-auto max-w-5xl'>
    </section>

    {/* Contact section */}
    <section id='contact-section' className='mx-auto max-w-5xl'>
    </section>
    </div>
  )
}

export default Index;
