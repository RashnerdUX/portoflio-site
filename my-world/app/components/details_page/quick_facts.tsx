import React from 'react'

interface QuickFactsProps {
    director: string;
    phase: number;
    runtime: string;
    releaseDate: string;
}

interface QuickFactsTileProps {
    title: string;
    value: string;
}

export const QuickFactsTile: React.FC<QuickFactsTileProps> = ({ title, value }) => {
    return (
        <div className='flex justify-between py-2'>
            <h4 className='text-black/40 dark:text-white/60'>{title}:</h4>
            <p className='text-black dark:text-white font-bold'>{value}</p>
        </div>
    );
};


export const QuickFacts: React.FC<QuickFactsProps> = ({ phase, releaseDate, director, runtime }) => {
  const facts: QuickFactsTileProps[] = [
    { title: "Director", value: director },
    { title: "Phase", value: phase.toString() },
    { title: "Runtime", value: runtime },
    { title: "Release Date", value: releaseDate },
  ];

  return (
    <div className='text-sm gap-4 py-4'>
      {facts.map((fact) => (
        <QuickFactsTile key={fact.title} title={fact.title} value={fact.value} />
      ))}
    </div>
  )
}

export default QuickFacts;
