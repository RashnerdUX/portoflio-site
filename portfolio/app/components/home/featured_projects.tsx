import React from 'react'

interface StackTileProps {
    label: string;
}

export const StackTile: React.FC<StackTileProps> = ({ label }) => {
  return (
      <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">{label}</span>
  )
}

interface StackTilesProps {
    labels: string[];
}
export const StackTiles: React.FC<StackTilesProps> = ({ labels }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {labels.map((label) => (
        <StackTile key={label} label={label} />
      ))}
    </div>
  )
}


const image_placeholder = "/assets/images/web-app.png";

interface ProjectCardProps {
    title: string;
    description: string;
    stack_labels: string[];
    project_image?: string;
    live_link?: string;
    github_link?: string;
    reverse: boolean;
}
export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, live_link, github_link, stack_labels, project_image, reverse }) => {
  return (
    <div className="group grid md:grid-cols-2 gap-8 items-center">
        <div className={`relative ${reverse ? 'md:order-last' : ''}`}>
            <div className="w-full aspect-video bg-cover bg-center rounded-2xl shadow-lg transition-all duration-300">
                <img src={project_image || image_placeholder} alt="Project Image" className="w-full h-full object-cover rounded-2xl" />
            </div>
        </div>
        <div className={`md:pl-8 ${reverse ? 'md:order-first' : ''}`}>
            <h3 className="text-foreground text-xl font-bold leading-tight mb-2">{title}</h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">{description}</p>
            <StackTiles labels={stack_labels} />
            <div className="flex items-center space-x-4">
                <a className="text-white bg-primary hover:bg-primary-900 font-medium  hover:font-bold rounded-full text-sm px-5 py-2.5 text-center transition-colors" href={live_link}>Live Demo</a>
                <a className="text-muted-foreground hover:text-black font-medium text-sm" href={github_link}>GitHub</a>
            </div>
        </div>
    </div>
  )
}

const projects: ProjectCardProps[] = [
  {
    title: "Modella",
    description: "An AI-powered fashion stylist designed to help users create personalized outfits and style recommendations based on their preferences and current fashion trends.",
    live_link: "https://modella.vercel.com",
    github_link: "https://github.com/RashnerdUX/modella",
    stack_labels: ['React', 'Django', 'PostgreSQL', 'AWS S3', 'Tailwind CSS'],
    project_image: image_placeholder,
    reverse: false
  },
  {
    title: "Lynqup",
    description: "A mentorship platform that connects aspiring professionals with experienced mentors in their desired fields, facilitating knowledge sharing and career growth.",
    live_link: "https://lynqup.netlify.com",
    github_link: "https://github.com/RashnerdUX/Lynqup",
    stack_labels: ['Django', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
    project_image: "~/assets/images/web-app.png",
    reverse: true
  },
  {
    title: "Shared Activity Planner",
    description: "A personal project management tool for organizing events among friends and family. Users can open groups, delegate roles and tasks, and plan events collaboratively. Includes chat with async streaming for smooth communication.",
    live_link: "",
    github_link: "",
    stack_labels: ['Django', 'React', 'PostgreSQL', 'WebSockets'],
    project_image: "~/assets/images/web-app.png",
    reverse: false
  },
  {
    title: "AI Career Assistant",
    description: "An AI-powered agent that helps early-career professionals with career advice and resources. Built using Gemini API and LangChain, exposed via FastAPI, with Gradio for MVP prototyping and React for the polished frontend.",
    live_link: "",
    github_link: "",
    stack_labels: ['FastAPI', 'LangChain', 'Gemini API', 'React', 'Gradio'],
    project_image: "~/assets/images/web-app.png",
    reverse: true
  },
];

export const FeaturedProjects = () => {
  return (
    <div>
        <div className="relative flex size-full min-h-screen flex-col bg-background overflow-x-hidden">
            <h2 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight mb-8">Featured Projects</h2>
            <div className="space-y-16">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
            <div className="h-32 flex items-center justify-center mt-10">
              <a href='https://github.com/RashnerdUX/' className="primary-link">View all projects</a>
            </div>
        </div>
    </div>
  )
}
