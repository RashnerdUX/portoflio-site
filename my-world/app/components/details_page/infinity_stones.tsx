import React from 'react'

interface InfinityStoneCardProps {
    stoneName: string;
    description: string;
    rating: number; // Rating out of 5
    color: string; // CSS color value (e.g. #c084fc or rgb(99 102 241))
}

const clampRating = (value: number, max = 5) => Math.min(Math.max(value, 0), max)

const hexToRgba = (hex: string, alpha = 1) => {
  const sanitized = hex.replace('#', '')
  const full = sanitized.length === 3
    ? sanitized.split('').map((char) => char + char).join('')
    : sanitized

  const value = Number.parseInt(full, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const InfinityStoneCard: React.FC<InfinityStoneCardProps> = ({ stoneName, description, rating, color }) => {
  const normalizedRating = clampRating(rating)
  const fillPercent = (normalizedRating / 5) * 100
  const isHexColor = color.trim().startsWith('#')
  const glowPrimary = isHexColor ? hexToRgba(color, 0.6) : color
  const glowSecondary = isHexColor ? hexToRgba(color, 0.3) : color

  return (
    <div className="flex flex-col bg-card p-4 gap-2 rounded-lg">
        <h3 className="text-lg font-semibold" style={{ color }}>{stoneName}</h3>
        <span className="text-[32px] text-foreground/70 font-bold leading-tight">{normalizedRating.toFixed(1)}</span>
        <p className="text-base text-foreground/40 font-medium">{description}</p>
        <div className="w-full rounded-full bg-tertiary h-2.5 mt-3">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${fillPercent}%`,
                backgroundColor: color,
                boxShadow: `0 0 12px ${glowPrimary}, 0 0 24px ${glowSecondary}`,
              }}
            />
        </div>
    </div>
  )
}

interface InfinityStonesBreakdownProps {
    ratings: [];
}

export const InfinityStonesBreakdown: React.FC = () => {
  const stones = [
    { stoneName: "Power Stone", description: "Action and Spectacle", rating: 3, color: "#a755f7" },
    { stoneName: "Space Stone", description: "Worldbuilding", rating: 4, color: "#3b82f6" },
    { stoneName: "Reality Stone", description: "Visual Effects", rating: 2, color: "#ee4444" },
    { stoneName: "Mind Stone", description: "Complexity and Depth", rating: 3.4, color: "#f9cc1a" },
    { stoneName: "Time Stone", description: "Rewatch Value", rating: 2, color: "#25c460" },
    { stoneName: "Soul Stone", description: "Emotion and Connection", rating: 5, color: "#f97216" },
  ];

    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {stones.map((stone, index) => (
          <InfinityStoneCard key={index} {...stone} />
        ))}
      </div>
    ) 
}

export default InfinityStonesBreakdown;
