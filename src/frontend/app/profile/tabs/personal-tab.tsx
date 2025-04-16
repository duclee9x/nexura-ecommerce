import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@/components/ui/radio-group";
import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { generateAvatar, getAvatarUrl } from "@/lib/utils";
import { toast } from "sonner";
import { onPersonalSubmitAction, FormState } from "../personalSubmit"
import { useState } from "react";
import { AvatarCropperModal } from "@/components/ui/avatar-cropper-modal";
import { User } from "@/protos/nexura";
import { PersonalSkeleton } from "../skeleton";
import { uploadToImageKit } from "@/lib/imagekit"

const initialState: FormState = {
    message: "",
    success: false
}

export default function PersonalTab({ user, refresh }: { user: User | null, refresh: () => void }) {
    if (!user) {
        return <PersonalSkeleton />;
    }
    const queryClient = useQueryClient();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isCropperOpen, setIsCropperOpen] = useState(false);

    console.log(user, 'user')
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (request: {
            id: string;
            user: {
                id: string;
                firstName: string | null;
                lastName: string | null;
                phone: string | null;
                gender: string | null;
                dateOfBirth: string | null;
                profilePictureUrl: string | null;
            };
            currentPassword: string | null;
            newPassword: string | null;
        }) => {
            const result = await onPersonalSubmitAction(initialState, request);
            if (!result.success) {
                throw new Error(JSON.stringify(result.errors));
            }
            return result;
        },
        onSuccess: async () => {
            // Clear form states
            setPreviewUrl(null);
            setSelectedImage(null);
            setAvatarFile(null);
            
            // Invalidate and refetch queries
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['session'] }),
                queryClient.invalidateQueries({ queryKey: ['presignedGet'] }),
                refresh()

            ]);
            toast.success("Profile updated successfully");
        },
        onError: (error) => {
            try {
                const errors = JSON.parse(error.message);
                // Don't show toast for validation errors
                if (!errors.submit) {
                    return;
                }
                toast.error(errors.submit || "Failed to update profile");
            } catch {
                toast.error("An unexpected error occurred");
            }
        }
    });

    // Function to get field error
    const getFieldError = (fieldName: string): string | undefined => {
        if (!error?.message) return undefined;
        try {
            const errors = JSON.parse(error.message);
            return errors[fieldName];
        } catch {
            return undefined;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.currentTarget)

            // Create an object to store only changed fields
            const updatedFields: Partial<typeof user> = {
                id: user.id // ID is always required
            }

            // Check and add only changed fields
            const firstName = formData.get('firstName') as string
            if (firstName?.trim() && firstName !== user.firstName) {
                updatedFields.firstName = firstName
            }

            const lastName = formData.get('lastName') as string
            if (lastName?.trim() && lastName !== user.lastName) {
                updatedFields.lastName = lastName
            }

            const phone = formData.get('phone') as string
            if (phone?.trim() && phone !== user.phone) {
                // Validate phone number
                if (phone.length < 10) {
                    toast.error("Phone number must be at least 10 digits")
                    return
                }
                updatedFields.phone = phone
            }

            const gender = formData.get('gender') as string
            if (gender && gender !== user.gender) {
                // Validate gender
                if (!['male', 'female', 'other'].includes(gender)) {
                    toast.error("Invalid gender value")
                    return
                }
                updatedFields.gender = gender
            }

            const dateOfBirth = formData.get('dateOfBirth') as string
            if (dateOfBirth && dateOfBirth !== user.dateOfBirth) {
                // Validate date format
                const date = new Date(dateOfBirth)
                if (isNaN(date.getTime())) {
                    toast.error("Invalid date format")
                    return
                }
                updatedFields.dateOfBirth = date.toISOString()
            }
            // Handle avatar upload if exists
            if (avatarFile) {
                try {
                    const { url, fileId } = await uploadToImageKit(avatarFile, "avatars")
                    updatedFields.profilePictureUrl = url
                } catch (error) {
                    console.error("Error uploading avatar:", error)
                    toast.error("Failed to upload profile picture")
                    return
                }
            }

            // Only include required fields and changed fields
            const userData = {
                ...user,
                ...updatedFields,
                updatedAt: new Date().toISOString()
            }

            // Only include password fields if they are provided
            const currentPassword = formData.get('currentPassword') as string
            const newPassword = formData.get('newPassword') as string
            const updateRequest = {
                id: user.id,
                user: userData,
                currentPassword: currentPassword || null,
                newPassword: newPassword || null
            }

            // Submit the form data only if there are changes
            if (Object.keys(updatedFields).length > 1) { // > 1 because id is always included
                await mutate(updateRequest)
                
            } else {
                toast.info("No changes to save")
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        }
    }

    if (isPending) {
        return (
            <TabsContent value="personal" className="space-y-6">
                <div className="flex items-center justify-center h-32">
                    <p>Loading...</p>
                </div>
            </TabsContent>
        )
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const imageUrl = URL.createObjectURL(file)
        setSelectedImage(imageUrl)
        setIsCropperOpen(true)
    }

    const handleSaveAvatar = (file: File) => {
        setAvatarFile(file)
        const previewUrl = URL.createObjectURL(file)
        setPreviewUrl(previewUrl)
        setSelectedImage(null)
        setIsCropperOpen(false)
    }

    return (
        <TabsContent value="personal" className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Update your profile picture</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <Image
                                src={previewUrl || user.profilePictureUrl || generateAvatar(user?.firstName || "")}
                                alt="Profile picture"
                                width={96}
                                height={96}
                                priority
                                className="object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Upload a new profile picture. JPG, PNG or GIF. Maximum file size 2MB.
                        </p>
                        <div className="flex gap-2">
                            <Label htmlFor="picture" className="border btn-secondary p-3 rounded-md cursor-pointer">
                                Upload
                            </Label>
                            <Input onChange={handleImageUpload} id="picture" type="file" className="hidden" accept="image/*" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit}>
                <input type="hidden" name="userId" value={user?.id} />
                <input type="hidden" name="email" value={user?.email} />
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    defaultValue={user?.firstName}
                                    aria-describedby="firstName-error"
                                    className={getFieldError('firstName') ? "border-destructive" : ""}
                                />
                                {getFieldError('firstName') && (
                                    <p className="text-sm text-destructive" id="firstName-error">
                                        {getFieldError('firstName')}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    defaultValue={user?.lastName}
                                    aria-describedby="lastName-error"
                                    className={getFieldError('lastName') ? "border-destructive" : ""}
                                />
                                {getFieldError('lastName') && (
                                    <p className="text-sm text-destructive" id="lastName-error">
                                        {getFieldError('lastName')}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={user?.email}
                                    disabled={true}
                                    aria-describedby="email-error"
                                />
                            </div>
                            {getFieldError('email') && (
                                <p className="text-sm text-destructive" id="email-error">
                                    {getFieldError('email')}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                defaultValue={user?.phone}
                                aria-describedby="phone-error"
                                className={getFieldError('phone') ? "border-destructive" : ""}
                            />
                            {getFieldError('phone') && (
                                <p className="text-sm text-destructive" id="phone-error">
                                    {getFieldError('phone')}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Gender</Label>
                            <RadioGroup 
                                defaultValue={user?.gender} 
                                name="gender" 
                                className="flex gap-6"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female">Female</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="other" id="other" />
                                    <Label htmlFor="other">Other</Label>
                                </div>
                            </RadioGroup>
                            {getFieldError('gender') && (
                                <p className="text-sm text-destructive" id="gender-error">
                                    {getFieldError('gender')}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                                id="dob"
                                name="dateOfBirth"
                                type="date"
                                max={new Date(new Date().setFullYear(new Date().getFullYear() - 12)).toISOString().split('T')[0]}
                                defaultValue={user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ""}
                                aria-describedby="dob-error"
                                className={getFieldError('dateOfBirth') ? "border-destructive" : ""}
                            />
                            {getFieldError('dateOfBirth') && (
                                <p className="text-sm text-destructive" id="dob-error">
                                    {getFieldError('dateOfBirth')}
                                </p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
            <AvatarCropperModal
                image={selectedImage}
                isOpen={isCropperOpen}
                onClose={() => setIsCropperOpen(false)}
                onSave={handleSaveAvatar}
            />
        </TabsContent>

    )
}