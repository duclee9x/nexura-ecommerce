import { memo } from "react"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Switch } from "./switch"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Button } from "./button"
import { Label } from "./label"
import { Textarea } from "./textarea"
import { Checkbox } from "./checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Badge } from "./badge"
import { Progress } from "./progress"
import { Separator } from "./separator"
import { Skeleton } from "./skeleton"
import { Slider } from "./slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

export const MemoizedInput = memo(Input)
export const MemoizedSelect = memo(Select)
export const MemoizedSelectTrigger = memo(SelectTrigger)
export const MemoizedSelectContent = memo(SelectContent)
export const MemoizedSelectItem = memo(SelectItem)
export const MemoizedSelectValue = memo(SelectValue)
export const MemoizedSwitch = memo(Switch)
export const MemoizedRadioGroup = memo(RadioGroup)
export const MemoizedRadioGroupItem = memo(RadioGroupItem)
export const MemoizedButton = memo(Button)
export const MemoizedLabel = memo(Label)
export const MemoizedTextarea = memo(Textarea)
export const MemoizedCheckbox = memo(Checkbox)
export const MemoizedTabs = memo(Tabs)
export const MemoizedTabsContent = memo(TabsContent)
export const MemoizedTabsList = memo(TabsList)
export const MemoizedTabsTrigger = memo(TabsTrigger)
export const MemoizedCard = memo(Card)
export const MemoizedCardContent = memo(CardContent)
export const MemoizedCardDescription = memo(CardDescription)
export const MemoizedCardFooter = memo(CardFooter)
export const MemoizedCardHeader = memo(CardHeader)
export const MemoizedCardTitle = memo(CardTitle)
export const MemoizedDialog = memo(Dialog)
export const MemoizedDialogContent = memo(DialogContent)
export const MemoizedDialogDescription = memo(DialogDescription)
export const MemoizedDialogFooter = memo(DialogFooter)
export const MemoizedDialogHeader = memo(DialogHeader)
export const MemoizedDialogTitle = memo(DialogTitle)
export const MemoizedDialogTrigger = memo(DialogTrigger)
export const MemoizedForm = memo(Form)
export const MemoizedFormControl = memo(FormControl)
export const MemoizedFormDescription = memo(FormDescription)
export const MemoizedFormField = memo(FormField)
export const MemoizedFormItem = memo(FormItem)
export const MemoizedFormLabel = memo(FormLabel)
export const MemoizedFormMessage = memo(FormMessage)
export const MemoizedAlert = memo(Alert)
export const MemoizedAlertDescription = memo(AlertDescription)
export const MemoizedAlertTitle = memo(AlertTitle)
export const MemoizedAvatar = memo(Avatar)
export const MemoizedAvatarFallback = memo(AvatarFallback)
export const MemoizedAvatarImage = memo(AvatarImage)
export const MemoizedBadge = memo(Badge)
export const MemoizedProgress = memo(Progress)
export const MemoizedSeparator = memo(Separator)
export const MemoizedSkeleton = memo(Skeleton)
export const MemoizedSlider = memo(Slider)
export const MemoizedTooltip = memo(Tooltip)
export const MemoizedTooltipContent = memo(TooltipContent)
export const MemoizedTooltipProvider = memo(TooltipProvider)
export const MemoizedTooltipTrigger = memo(TooltipTrigger) 