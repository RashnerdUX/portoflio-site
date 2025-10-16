import React from 'react'

interface SagaRelevanceProps {
    nextMovieInSaga?: string;
    previousMovieInSaga?: string;
    overallSagaImpact?: string;
}

export const SagaRelevance: React.FC<SagaRelevanceProps> = ({ nextMovieInSaga, previousMovieInSaga, overallSagaImpact }) => {
  return (
    <div className='py-4'>
        {/* Previous film */}
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cover bg-center" data-alt="Poster for Captain America: The First Avenger" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA44_5kArgIeG33aluGMsLM5j2Pq03KjEsAOAhngp0vzl-iUXgLPGOOHEsImo6PZDW5eu8WrzOKbA8Qn7aQjY4EOTdJXiAaboxshkxrQU5VmJJl4afNNQNYYcEpk7xp14pBWwnlQwqI3PrEfi-9SdzJ5p_6UFCCICD9_yaphwq_26KOnVW1klHC7eolUG35eUkwswFTJZwt8StKjBhW8P6th7-VFz4A2YFfZ-TpZ90NlA3TVZsJIunyTazhakChK72f5eGRB4hwPoG9')" }}></div>
            <p className="text-sm font-medium dark:text-white/90">Continues from <span className="font-bold text-primary">{previousMovieInSaga}</span></p>
        </div>
        {/* Next film */}
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cover bg-center" data-alt="Poster for Captain America: The First Avenger" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA44_5kArgIeG33aluGMsLM5j2Pq03KjEsAOAhngp0vzl-iUXgLPGOOHEsImo6PZDW5eu8WrzOKbA8Qn7aQjY4EOTdJXiAaboxshkxrQU5VmJJl4afNNQNYYcEpk7xp14pBWwnlQwqI3PrEfi-9SdzJ5p_6UFCCICD9_yaphwq_26KOnVW1klHC7eolUG35eUkwswFTJZwt8StKjBhW8P6th7-VFz4A2YFfZ-TpZ90NlA3TVZsJIunyTazhakChK72f5eGRB4hwPoG9')" }}></div>
            <p className="text-sm font-medium dark:text-white/90">Leads to <span className="font-bold text-primary">{nextMovieInSaga}</span></p>
        </div>
        {/* Overall saga impact */}
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cover bg-center" data-alt="Poster for Captain America: The First Avenger" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA44_5kArgIeG33aluGMsLM5j2Pq03KjEsAOAhngp0vzl-iUXgLPGOOHEsImo6PZDW5eu8WrzOKbA8Qn7aQjY4EOTdJXiAaboxshkxrQU5VmJJl4afNNQNYYcEpk7xp14pBWwnlQwqI3PrEfi-9SdzJ5p_6UFCCICD9_yaphwq_26KOnVW1klHC7eolUG35eUkwswFTJZwt8StKjBhW8P6th7-VFz4A2YFfZ-TpZ90NlA3TVZsJIunyTazhakChK72f5eGRB4hwPoG9')" }}></div>
            <p className="text-sm font-medium dark:text-white/90"><span className="font-bold text-primary">{overallSagaImpact}</span></p>
        </div>
    </div>
  )
}
