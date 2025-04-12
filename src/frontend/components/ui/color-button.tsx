import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ColorButtonProps {
  onClick: () => void
  name: string
  color: string
  isSelected?: boolean
  disabled?: boolean
  isColor?: boolean
}

export function ColorButton({
  onClick,
  name,
  color,
  isColor,
  isSelected = false,
  disabled = false,
}: ColorButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 h-auto",
        isSelected && "border-primary ring-1 ring-primary",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {isColor && (
        <div
          className="w-4 h-4 rounded-full border border-border"
          style={{ backgroundColor: color }}
        />
      )}
      <span className="text-sm">{name}</span>
    </Button>
  )
}
