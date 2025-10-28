import React from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'

interface TooltipProps {
    tooltipInfo: string;
}

export const CustomTooltip = ({ tooltipInfo }: TooltipProps) => {
  return (
     <div className="relative inline-block group cursor-help">
        <HiOutlineInformationCircle className="size-4 text-foreground/50" />
        <span className="hidden px-2 py-1 bg-tertiary text-foreground/80 text-center text-[10px] leading-[1.5] rounded shadow-md absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 transition-all duration-300 translate-y-1 group-hover:block group-hover:opacity-100 group-hover:translate-y-0">
        {tooltipInfo}
        </span>
    </div>
  )
}

export default CustomTooltip;
