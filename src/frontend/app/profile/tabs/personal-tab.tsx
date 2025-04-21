'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { generateAvatar } from "@/lib/utils";
import { toast } from "sonner";
import { onPersonalSubmitAction, FormState } from "../personalSubmit";
import { useState } from "react";
import { AvatarCropperModal } from "@/components/ui/avatar-cropper-modal";
import { User } from "@/protos/nexura";
import { PersonalSkeleton } from "../skeleton";
import { uploadToImageKit } from "@/lib/imagekit";

interface PersonalTabProps {
    user: User | null
}

interface FormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    gender: string
    dateOfBirth: string
}

interface ImageState {
    selectedImage: string | null
    avatarFile: File | null
    previewUrl: string | null
    isCropperOpen: boolean
}

const initialFormState: FormState = {
    message: "",
    success: false
}

const initialImageState: ImageState = {
    selectedImage: null,
    avatarFile: null,
    previewUrl: null,
    isCropperOpen: false
}

export default function PersonalTab({ user }: PersonalTabProps) {
    if (!user) {
        return <PersonalSkeleton />;
    }

    const queryClient = useQueryClient();
    const [imageState, setImageState] = useState<ImageState>(initialImageState);
    const [formData, setFormData] = useState<FormData>({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ""
    });

    const { mutate, isPending, error } = useMutation({
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
                email: string;
                updatedAt: string;
            };
            currentPassword: string | null;
            newPassword: string | null;
        }) => {
            const result = await onPersonalSubmitAction(initialFormState, request);
            if (!result.success) {
                throw new Error(JSON.stringify(result.errors));
            }
            return result;
        },
        onSuccess: () => {
            setImageState(initialImageState);
            queryClient.invalidateQueries({ queryKey: ['userSession'] });
            toast.success("Profile updated successfully");
        },
        onError: (error: Error) => {
            try {
                const errors = JSON.parse(error.message);
                if (!errors.submit) return;
                toast.error(errors.submit || "Failed to update profile");
            } catch (parseError) {
                console.error(parseError);
                toast.error("An unexpected error occurred");
            }
        }
    });

    const getFieldError = (fieldName: string): string | undefined => {
        if (!error?.message) return undefined;
        try {
            const errors = JSON.parse(error.message);
            return errors[fieldName];
        } catch {
            return undefined;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenderChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            gender: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedFields: Partial<typeof user> = { id: user.id };

        // Validate and add changed fields
        if (formData.firstName.trim() && formData.firstName !== user.firstName) {
            updatedFields.firstName = formData.firstName;
        }

        if (formData.lastName.trim() && formData.lastName !== user.lastName) {
            updatedFields.lastName = formData.lastName;
        }

        if (formData.phone.trim() && formData.phone !== user.phone) {
            if (formData.phone.length < 10) {
                toast.error("Phone number must be at least 10 digits");
                return;
            }
            updatedFields.phone = formData.phone;
        }

        if (formData.gender && formData.gender !== user.gender) {
            if (!['male', 'female', 'other'].includes(formData.gender)) {
                toast.error("Invalid gender value");
                return;
            }
            updatedFields.gender = formData.gender;
        }

        if (formData.dateOfBirth && formData.dateOfBirth !== user.dateOfBirth) {
            const date = new Date(formData.dateOfBirth);
            if (isNaN(date.getTime())) {
                toast.error("Invalid date format");
                return;
            }
            updatedFields.dateOfBirth = date.toISOString();
        }

        // Handle avatar upload
        if (imageState.avatarFile) {
            try {
                const { url } = await uploadToImageKit(imageState.avatarFile, "avatars");
                updatedFields.profilePictureUrl = url;
            } catch (error) {
                console.error("Error uploading avatar:", error);
                toast.error("Failed to upload profile picture");
                return;
            }
        }

        const userData = {
            ...user,
            ...updatedFields,
            updatedAt: new Date().toISOString()
        };

        if (Object.keys(updatedFields).length > 1) {
            await mutate({
                id: user.id,
                user: userData,
                currentPassword: null,
                newPassword: null
            });
        } else {
            toast.info("No changes to save");
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setImageState(prev => ({
            ...prev,
            selectedImage: imageUrl,
            isCropperOpen: true
        }));
    };

    const handleSaveAvatar = (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        setImageState({
            selectedImage: null,
            avatarFile: file,
            previewUrl,
            isCropperOpen: false
        });
    };

    if (isPending) {
        return (
            <TabsContent value="personal" className="space-y-6">
                <div className="flex items-center justify-center h-32">
                    <p>Loading...</p>
                </div>
            </TabsContent>
        );
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
                                src={imageState.previewUrl || user.profilePictureUrl || generateAvatar(user.firstName || "")}
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
                            <Input 
                                onChange={handleImageUpload} 
                                id="picture" 
                                type="file" 
                                className="hidden" 
                                accept="image/*" 
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit}>
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
                                    value={formData.firstName}
                                    onChange={handleChange}
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
                                    value={formData.lastName}
                                    onChange={handleChange}
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
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                disabled
                                aria-describedby="email-error"
                            />
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
                                value={formData.phone}
                                onChange={handleChange}
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
                                value={formData.gender}
                                onValueChange={handleGenderChange}
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
                                max={new Date(new Date().setFullYear(new Date().getFullYear() - 12))
                                    .toISOString()
                                    .split('T')[0]}
                                value={formData.dateOfBirth}
                                onChange={handleChange}
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
                image={imageState.selectedImage}
                isOpen={imageState.isCropperOpen}
                onClose={() => setImageState(prev => ({ ...prev, isCropperOpen: false }))}
                onSave={handleSaveAvatar}
            />
        </TabsContent>
    );
}