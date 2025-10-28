import { Label } from 'radix-ui';
import React from 'react'

interface CustomSliderProps {
    name: string;
    tooltipInfo: string;
    defaultValue?: number;
    minLabel: string;
    midLabel: string;
    maxLabel: string;
}


export const CustomSlider = ({ name, tooltipInfo, defaultValue, minLabel, midLabel, maxLabel }: CustomSliderProps) => {
  return (
    <div className=''>
      <div className='space-y-2'>
          <input type="range" min="0" max="100" step="10" name={name} defaultValue={defaultValue} className="w-full h-2 bg-foreground/60 rounded-lg appearance-none cursor-grab" />
          <div className='flex justify-between font-bold'>
              <span className="text-xs text-foreground/50">{minLabel}</span>
              <span className="text-xs text-foreground/50">{midLabel}</span>
              <span className="text-xs text-foreground/50">{maxLabel}</span>
          </div>
      </div>
    </div>
  )
}

export default CustomSlider;