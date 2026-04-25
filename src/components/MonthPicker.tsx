import { cn } from "@/lib/utils";
import { MONTH_SHORT } from "@/types";

interface MonthPickerProps {
  selected: number;
  onChange: (month: number) => void;
}

export function MonthPicker({ selected, onChange }: MonthPickerProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {MONTH_SHORT.map((name, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={cn(
            "px-3 py-2 md:py-1.5 rounded-full text-sm font-medium transition-colors",
            selected === i
              ? "bg-green-600 text-white"
              : "bg-secondary text-secondary-foreground hover:bg-green-100 hover:text-green-800"
          )}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
