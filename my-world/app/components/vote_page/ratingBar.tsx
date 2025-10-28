import React, {useState} from 'react';

interface RatingBarProps {
  name: string;
  color: string;
  defaultValue: number;
  onChange: (value: number) => void;
}

export const RatingBar = ({
  name,
  defaultValue,
  color,
  onChange,
}: RatingBarProps) => {

  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const handleChange = (value: number) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const segments = [1,2,3,4,5]
          

  return (
      <div 
        className="flex gap-0.5 items-center"
        onMouseLeave={() => setHoveredValue(null)}
        style={{ height: '16px' }}
      >
        {segments.map((value) => {
          const isSelected = value === selectedValue;
          const isHovered = hoveredValue !== null && value <= hoveredValue;
          const isBeyondSelected = value > selectedValue;
          
          let bgColor = '#2c2541';
          let boxShadow = 'none';
          
          if (isHovered) {
            bgColor = color;
            boxShadow = `0 0 8px 1px ${color}`;
          } else if (isSelected) {
            bgColor = color;
            boxShadow = `0 0 8px 1px ${color}`;
          } else if (hoveredValue === null && !isBeyondSelected) {
            bgColor = '#2c2541';
          }
          
          return (
            <div
              key={value}
              className="flex-1 cursor-pointer transition-all duration-200 ease-in-out"
              style={{
                height: '16px',
                backgroundColor: bgColor,
                boxShadow: boxShadow,
                filter: (isHovered || isSelected) ? 'brightness(1.2)' : 'brightness(1)',
                borderRadius: '2px'
              }}
              onMouseEnter={() => setHoveredValue(value)}
              onClick={() => handleChange(value)}
            >
              <input
                type="radio"
                name={name}
                value={value}
                checked={selectedValue === value}
                onChange={() => handleChange(value)}
                className="hidden"
              />
            </div>
          );
        })}
      </div>
  );
};