import React from 'react'
import { BiLogoTypescript } from 'react-icons/bi';
import { 
    DiJavascript,
    DiReact,
    DiPython,
    DiHtml5,
    DiCss3,
    DiGit,
    DiDocker,
    DiPostgresql,
    DiRedis,
    DiDjango
} from "react-icons/di";
import { RiTailwindCssFill } from 'react-icons/ri';
import { SiCelery, SiFastapi, SiLangchain, SiSqlalchemy } from 'react-icons/si';

interface SkillProps {
    icon: React.ReactNode;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
}

const backendSkills: SkillProps[] = [
  { icon: <DiPython />, name: 'Python', level: 'Intermediate' },
  { icon: <DiDjango />, name: 'Django', level: 'Intermediate' },
  { icon: <SiFastapi />, name: 'FastAPI', level: 'Beginner' },
  { icon: <SiSqlalchemy />, name: 'SQLAlchemy', level: 'Beginner' },
];

const frontendSkills: SkillProps[] = [
  { icon: <DiReact />, name: 'React', level: 'Beginner' },
  { icon: <DiJavascript />, name: 'JavaScript', level: 'Intermediate' },
  { icon: <BiLogoTypescript />, name: 'TypeScript', level: 'Beginner' },
  { icon: <DiHtml5 />, name: 'HTML5', level: 'Intermediate' },
  { icon: <DiCss3 />, name: 'CSS3', level: 'Intermediate' },
  { icon: <RiTailwindCssFill />, name: 'Tailwind CSS', level: 'Intermediate' },
];

const toolSkills: SkillProps[] = [
  { icon: <DiGit />, name: 'Git', level: 'Intermediate' },
  { icon: <DiDocker />, name: 'Docker', level: 'Beginner' },
  { icon: <DiPostgresql />, name: 'PostgreSQL', level: 'Intermediate' },
  { icon: <SiCelery />, name: 'Celery', level: 'Intermediate' },
  { icon: <DiRedis />, name: 'Redis', level: 'Beginner' },
  { icon: <SiLangchain />, name: 'Langchain', level: 'Beginner' },
];

const SkillCard: React.FC<SkillProps> = ({ icon, name, level }) => (
    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm hover:shadow-md transition-shadow">
        <div className="text-primary">
            {icon}
        </div>
        <h4 className="text-foreground text-base font-semibold">{name}</h4>
    </div>
);

export const Skills = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background overflow-x-hidden">
      <div className="flex flex-col gap-8">
        <h2 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight">My Skills</h2>
        {/* Backend */}
        <div>
          <h3 className="text-foreground text-xl md:text-2xl font-bold tracking-tight mb-2 pb-2 border-b-4 border-primary inline-block">Backend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {backendSkills.map((skill, index) => (
                  <SkillCard key={index} {...skill} />
              ))}
          </div>
        </div>
        {/* Frontend */}
        <div>
          <h3 className="text-foreground text-xl md:text-2xl font-bold tracking-tight mb-2 pb-2 border-b-4 border-primary inline-block">Frontend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {frontendSkills.map((skill, index) => (
                  <SkillCard key={index} {...skill} />
              ))}
          </div>
        </div>
        {/* Tools & Technologies */}
        <div>
          <h3 className="text-foreground text-xl md:text-2xl font-bold tracking-tight mb-2 pb-2 border-b-4 border-primary inline-block">Tools & Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 mb-16">
              {toolSkills.map((skill, index) => (
                  <SkillCard key={index} {...skill} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
