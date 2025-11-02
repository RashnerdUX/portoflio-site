import React from 'react'

interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  isChecked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, name, isChecked, onChange }) => {
  return (
    <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 has-[:checked]:bg-primary has-[:checked]:shadow-[0_0_8px_hsl(var(--primary)/0.5)] has-[:checked]:text-primary-foreground text-secondary-foreground/70 text-sm font-medium leading-normal transition-all duration-300 hover:text-secondary-foreground">
      <span className="truncate">{label}</span>
      <input 
        className="invisible w-0" 
        name={name} 
        type="radio" 
        value={value}
        checked={isChecked}
        onChange={() => onChange(value)}
      />
    </label>
  )
}

interface OrderOption {
  label: string;
  value: string;
}

const orderOptions: OrderOption[] = [
  { label: 'Chronological', value: 'chronological' },
  { label: 'Release', value: 'release' },
  { label: 'Phase', value: 'phase' },
]

interface OrderNavigationProps {
  selectedOrder: string;
  onOrderChange: (order: string) => void;
}

export const OrderNavigation: React.FC<OrderNavigationProps> = ({ selectedOrder, onOrderChange }) => {
  return (
    <div className="flex h-10 items-center justify-center rounded-lg bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-primary/15 dark:border-white/60 p-0.5 mb-4">
      {orderOptions.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          name="order_type"
          isChecked={selectedOrder === option.value}
          onChange={onOrderChange}
        />
      ))}
    </div>
  )
}

export default OrderNavigation;
