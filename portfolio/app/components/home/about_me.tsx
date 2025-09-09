import React from 'react'

export const AboutMe = () => {
  return (
    <div className='container mx-auto max-w-5xl'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-foreground text-3xl md:text-4xl font-bold tracking-tight'>About Me</h2>
        {/* TODO: Work on this introduction */}
        <p className="text-lg md:text-xl font-normal leading-relaxed text-muted-foreground">
                  I'm Kelvin Akhigbe, a full-stack developer with a unique background. I transitioned from a career in pharmacy to pursue my passion for software engineering. This
                  journey has equipped me with a strong analytical mindset, attention to detail, and a commitment to continuous learning. I'm a fast learner, always eager to explore
                  new technologies and solve complex problems. My inquisitive nature drives me to understand the 'why' behind every solution, ensuring I deliver robust and efficient
                  code. I'm dedicated to crafting exceptional user experiences and building innovative applications.
        </p>
      </div>
    </div>
  )
}
