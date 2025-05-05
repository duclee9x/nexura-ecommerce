import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { z } from "zod";
import { useState, useCallback } from "react";
import { UpdateUserRequest, User, UpdateUserResponse } from "@nexura/grpc_gateway/protos";
import { SecuritySkeleton } from "../skeleton";
import { UseMutationResult } from "@tanstack/react-query";

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

type PasswordForm = z.infer<typeof passwordSchema>;

// Main component
export default function SecurityTab({ user, useUpdateUser }: { user: User, useUpdateUser: UseMutationResult<UpdateUserResponse, Error, UpdateUserRequest> }) {
    const { mutateAsync: updateUser } = useUpdateUser
    const [formState, setFormState] = useState<PasswordForm>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState<Partial<PasswordForm>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = useCallback(() => {
        try {
            passwordSchema.parse(formState);
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const formattedErrors: Partial<PasswordForm> = {};
                err.errors.forEach((error) => {
                    if (error.path[0]) {
                        formattedErrors[error.path[0] as keyof PasswordForm] = error.message;
                    }
                });
                setErrors(formattedErrors);
            }
            return false;
        }
    }, [formState]);

    const handleInputChange = useCallback((field: keyof PasswordForm, value: string) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleUpdatePassword = useCallback(async () => {
        if (!validateForm() || !user) return;
        setIsLoading(true);
        try {
            updateUser({
                user: user,
                currentPassword: formState.currentPassword,
                newPassword: formState.newPassword
            });

            toast.success("Password updated successfully");
            setFormState({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }, [formState, user, validateForm, updateUser]);

    if (!user) {
        return <SecuritySkeleton />;
    }

    return (
        <TabsContent value="security" className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            value={formState.currentPassword}
                            onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                            className={errors.currentPassword ? "border-destructive" : ""}
                        />
                        {errors.currentPassword && (
                            <p className="text-sm text-destructive">{errors.currentPassword}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            value={formState.newPassword}
                            onChange={(e) => handleInputChange("newPassword", e.target.value)}
                            className={errors.newPassword ? "border-destructive" : ""}
                        />
                        {errors.newPassword && (
                            <p className="text-sm text-destructive">{errors.newPassword}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={formState.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className={errors.confirmPassword ? "border-destructive" : ""}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleUpdatePassword}
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Enable Two-Factor Authentication</h3>
                            <p className="text-sm text-muted-foreground">
                                Protect your account with two-factor authentication
                            </p>
                        </div>
                        <Switch disabled={true} />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
}