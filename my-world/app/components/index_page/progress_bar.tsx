import * as Progress from "@radix-ui/react-progress";

export function ProgressBar({ value }: { value: number }) {
  return (
    <Progress.Root className="relative w-full h-3 bg-tertiary rounded-full overflow-hidden" value={value}>
      <Progress.Indicator
        className="h-full bg-primary transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </Progress.Root>
  );
}

export default ProgressBar;