import { memo, useState } from "react"
import { z } from "zod"
import { cn } from "@/lib/utils"
export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:    string
  error?:    string
  schema?:   z.ZodType<any>
  value?:    string
  required?: boolean
}

export const CustomInput = memo(({
  label,
  error,
  className,
  schema,
  value = "",
  onChange,
  required,
  ...props
}: CustomInputProps) => {
  const [ validationError, setValidationError ] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (schema) {
      try {
        schema.parse(newValue)
        setValidationError("")
      } catch (err) {
        if (err instanceof z.ZodError) {
          setValidationError(err.errors[0].message)
        }
      }
    }

    onChange?.(e)
  }

  const displayError = error || validationError

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <input
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          displayError && "border-destructive focus-visible:ring-destructive",
          className
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {displayError && <p className="text-sm text-destructive">{displayError}</p>}
    </div>
  )
})

CustomInput.displayName = "CustomInput"

export const Dialog = ({
  children,
  open,
  onOpenChange
}: {
  children:     React.ReactNode,
  open:         boolean,
  onOpenChange: (open: boolean) => void
}) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center overflow-y-auto">
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </div>
  )
}

export const DialogContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`fixed z-50 grid w-full gap-4 rounded-b-lg border bg-background p-6 shadow-lg animate-in fade-in-90 slide-in-from-bottom-10 sm:max-w-lg sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 ${className}`}>
      {children}
    </div>
  )
}

export const DialogHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
      {children}
    </div>
  )
}

export const DialogTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h2>
  )
}

export const DialogDescription = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  )
}

export const DialogFooter = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}>
      {children}
    </div>
  )
}

export const DialogTrigger = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
  return (
    <div onClick={onClick}>
      {children}
    </div>
  )
}

export const Input = ({
  id,
  value,
  onChange,
  placeholder,
  className = '',
  ...props
}: {
  id:            string,
  value:         string,
  onChange:      (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder:   string,
  className?:    string,
  [key: string]: any
}) => {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

export const Select = ({
  children,
  value,
  onValueChange,
  disabled = false
}: {
  children:      React.ReactNode,
  value:         string,
  onValueChange: (value: string) => void,
  disabled?:     boolean
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onValueChange(e.target.value)}
        disabled={disabled}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {children}
      </select>
    </div>
  )
}

export const SelectTrigger = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const SelectContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const SelectItem = ({
  children,
  value
}: {
  children: React.ReactNode,
  value:    string
}) => {
  return <option value={value}>{children}</option>
}

export const SelectValue = ({ placeholder }: { placeholder: string }) => {
  return <option value="">{placeholder}</option>
}

export const Label = ({
  children,
  htmlFor,
  className = ''
}: {
  children:   React.ReactNode,
  htmlFor:    string,
  className?: string
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  )
}

export const Switch = ({
  checked,
  onCheckedChange
}: {
  checked:         boolean,
  onCheckedChange: (checked: boolean) => void
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-primary"
    >
      <span
        className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}