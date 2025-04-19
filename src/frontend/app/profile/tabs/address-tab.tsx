"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Edit, MapPin, Plus, Trash2 } from "lucide-react";
import { useState, useCallback, memo } from "react";
import { Address, ExtendedAddress, User } from "@/protos/nexura";
import { Country, Province, District, Ward } from "@/protos/nexura";
// import { addAddress, deleteAddress, getCountries, getDistrictsByProvince, getProvincesByCountry, getWardsByDistrict, updateAddress } from "@/actions/address";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getAddresses } from "@/actions/user";
import { Skeleton } from "@/components/ui/skeleton";

import { set, z } from "zod"
import { DefaultResponse } from "@/lib/types";
import { AddressSkeleton } from "../skeleton";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, CustomInput, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Label, Switch, DialogFooter } from "@/components/ui/custom-dialog";
import { useUserHooks } from "@/hooks/use-user"

type SelectedAddress = {
    country: Country | null;
    province: Province | null;
    district: District | null;
    ward: Ward | null;
}

interface FormErrors {
    name?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
}

// Zod schemas
const nameSchema = z.string()
    .min(1, "Address name is required")
    .max(50, "Address name must be less than 50 characters")
    .regex(/^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/, "Only letters, numbers, spaces, hyphens and underscores are allowed")

const streetSchema = z.string()
    .min(1, "Street address is required")
    .max(100, "Street address must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_,./àáảãạăắằẳẵặâấầẩẫậçđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]+$/u, "Invalid street address format")

const citySchema = z.string()
    .min(1, "City is required")
    .max(50, "City must be less than 50 characters")
    .regex(/^[a-zA-Z\s\-àáảãạăắằẳẵặâấầẩẫậçđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]+$/u, "Only letters, spaces and hyphens are allowed")

const stateSchema = z.string()
    .min(1, "State is required")
    .max(50, "State must be less than 50 characters")
    .regex(/^[a-zA-Z\s\-àáảãạăắằẳẵặâấầẩẫậçđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]+$/u, "Only letters, spaces and hyphens are allowed")

const zipSchema = z.string()
    .min(1, "ZIP code is required")
    .max(10, "ZIP code must be less than 10 characters")
    .regex(/^[0-9\-]*$/, "Only numbers and hyphens are allowed")

type AddressResponse = DefaultResponse & {
    addresses: ExtendedAddress[];
}

type CountryResponse = DefaultResponse & {
    countries: Country[];
}

type ProvinceResponse = DefaultResponse & {
    provinces: Province[];
}

type DistrictResponse = DefaultResponse & {
    districts: District[];
}

type GetWardsResponse = DefaultResponse & {
    wards: Array<{
        id: string;
        name: string;
        nameEn: string;
        fullName: string;
        fullNameEn: string;
        districtId: string;
        administrativeUnitId: string;
    }>;
}

interface AddressTabProps {
    user: User | null;
    type: "profile" | "checkout";
    setAddress: (address: ExtendedAddress) => void;
    currentAddress?: ExtendedAddress | null;
}

// Main component
export default function AddressTab({ 
    user, 
    type, 
    setAddress,
    currentAddress 
}: AddressTabProps) {
    if (!user) {
        return <AddressSkeleton />;
    }
    const { getAddresses, getCountries, getProvinces, getDistricts, getWards, addAddress, updateAddress, deleteAddress  } = useUserHooks()
    const { data: addressResponse, isLoading: isAddressesLoading } = getAddresses(user.id);
    const [isAddressLoading, setIsAddressLoading] = useState(false);
    const [addressDialogOpen, setAddressDialogOpen] = useState<"add" | "edit" | null>(null);
    const [editingAddress, setEditingAddress] = useState<Address>({
        id: "",
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        countryId: "",
        isDefault: false,
        vnProvinceId: "",
        vnDistrictId: "",
        vnWardId: "",
        createdAt: "",
        updatedAt: "",
    });

    const [selectedAddress, setSelectedAddress] = useState<SelectedAddress>({
        country: null,
        province: null,
        district: null,
        ward: null,
    });

    const { data: countryResponse, isLoading: isCountryLoading } = getCountries();
    const countries = countryResponse?.countries || [];

    const { data: provinceResponse, isLoading: isProvinceLoading } = getProvinces(selectedAddress.country?.id || "");
    const provinces = provinceResponse?.provinces || [];

    const { data: districtResponse, isLoading: isDistrictLoading } = getDistricts(selectedAddress.province?.id || "");
    const districts = districtResponse?.districts || [];

    const { data: wardResponse, isLoading: isWardLoading } = getWards(selectedAddress.district?.id || "");
    const wards = wardResponse?.wards || [];

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<ExtendedAddress | null>(null);
    const [addressType, setAddressType] = useState<"VietNam" | "Global">("VietNam");
    const [formErrors, setFormErrors] = useState<FormErrors>({});

  
    const handleEditAddress = useCallback((address: ExtendedAddress) => {
        const country = countries.find((c: Country) => c.id.toString() === address.countryId);
        const province = provinces.find((p: Province) => p.id.toString() === address.vnProvinceId);
        const district = districts.find((d: District) => d.id.toString() === address.vnDistrictId);
        const ward = wards.find((w: Ward) => w.id.toString() === address.vnWardId);

        setSelectedAddress({
            country: country || null,
            province: province || null,
            district: district || null,
            ward: ward || null,
        });
        setEditingAddress(address);
        setAddressDialogOpen("edit");
    }, [countries, provinces, districts, wards]);

    const validateForm = useCallback(() => {
        const errors: FormErrors = {}

        try {
            nameSchema.parse(editingAddress.name)
        } catch (err) {
            if (err instanceof z.ZodError) {
                errors.name = err.errors[0].message
            }
        }

        try {
            streetSchema.parse(editingAddress.street)
        } catch (err) {
            if (err instanceof z.ZodError) {
                errors.street = err.errors[0].message
            }
        }

        if (selectedAddress.country?.name !== "Vietnam") {
            try {
                citySchema.parse(editingAddress.city)
            } catch (err) {
                if (err instanceof z.ZodError) {
                    errors.city = err.errors[0].message
                }
            }

            try {
                stateSchema.parse(editingAddress.state)
            } catch (err) {
                if (err instanceof z.ZodError) {
                    errors.state = err.errors[0].message
                }
            }

            try {
                zipSchema.parse(editingAddress.zip)
            } catch (err) {
                if (err instanceof z.ZodError) {
                    errors.zip = err.errors[0].message
                }
            }
        } else {
            if (!selectedAddress.province) {
                errors.state = "Province is required"
            }
            if (!selectedAddress.district) {
                errors.city = "District is required"
            }
            if (!selectedAddress.ward) {
                errors.zip = "Ward is required"
            }
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }, [editingAddress, selectedAddress])

    const handleAddAddress = useCallback(async () => {
        if (!validateForm()) return
        setIsAddressLoading(true)
        try {
            const updatedAddress: Address = {
                ...editingAddress,
                countryId: selectedAddress.country?.id.toString() || "",
                vnProvinceId: selectedAddress.province?.id.toString() || "",
                vnDistrictId: selectedAddress.district?.id.toString() || "",
                vnWardId: selectedAddress.ward?.id.toString() || "",
            }
            await addAddress.mutateAsync({ address: updatedAddress as ExtendedAddress, userId: user.id })
            setAddressDialogOpen(null)
            setFormErrors({})
            setSelectedAddress((prev) => ({
                ...prev,
                province: null,
                district: null,
                ward: null,
            }))
            setEditingAddress({
                id: "",
                name: "",
                street: "",
                city: "",
                state: "",
                zip: "",
                countryId: "",
                isDefault: false,
                vnProvinceId: "",
                vnDistrictId: "",
                vnWardId: "",
                createdAt: "",
                updatedAt: "",
            })
        } catch (error) {
            console.error("Error adding address:", error)
        } finally {
            setIsAddressLoading(false)
        }
    }, [editingAddress, selectedAddress, user.id, addAddress, validateForm])

    const handleUpdateAddress = useCallback(async () => {
        if (!validateForm()) return
        setIsAddressLoading(true)
        try {
            const updatedAddress: Address = {
                ...editingAddress,
                countryId: selectedAddress.country?.id.toString() || "",
                vnProvinceId: selectedAddress.province?.id.toString() || "",
                vnDistrictId: selectedAddress.district?.id.toString() || "",
                vnWardId: selectedAddress.ward?.id.toString() || "",
            }
            await updateAddress.mutateAsync({ address: updatedAddress as ExtendedAddress, userId: user.id })
            setAddressDialogOpen(null)
            setFormErrors({})
            setEditingAddress({
                id: "",
                name: "",
                street: "",
                city: "",
                state: "",
                zip: "",
                countryId: "",
                isDefault: false,
                vnProvinceId: "",
                vnDistrictId: "",
                vnWardId: "",
                createdAt: "",
                updatedAt: "",
            })
            setSelectedAddress((prev) => ({
                ...prev,
                province: null,
                district: null,
                ward: null,
            }))
        } catch (error) {
            console.error("Error updating address:", error)
        } finally {
            setIsAddressLoading(false)
        }
    }, [editingAddress, selectedAddress, user.id, updateAddress, validateForm])

    const handleDeleteConfirm = useCallback(async () => {
        if (!addressToDelete) return
        setIsDeleteDialogOpen(false)
        setIsAddressLoading(true)
        try {
            await deleteAddress.mutateAsync({ 
                addressId: addressToDelete.id, 
                userId: user.id 
            })
            setAddressToDelete(null)
        } catch (error) {
            console.error("Error deleting address:", error)
        } finally {
            setIsAddressLoading(false)
        }
    }, [addressToDelete, user.id, deleteAddress])

    const handleSetDefaultAddress = useCallback(async (id: string) => {
        if (!addressResponse) {
            console.error("Error: No address data available")
            return
        }
        setIsAddressLoading(true)
        const addressToSetDefault = addressResponse.addresses.find((addr: ExtendedAddress) => addr.id === id)
        if (!addressToSetDefault) {
            console.error("Error: Address not found")
            return
        }

        const updatedAddress = {
            ...addressToSetDefault,
            isDefault: true,
        }

        try {
            await updateAddress.mutateAsync({ 
                address: updatedAddress, 
                userId: user.id 
            })
        } catch (error) {
            console.error("Error setting default address:", error)
        } finally {
            setIsAddressLoading(false)
        }
    }, [addressResponse, user.id, updateAddress])

    const handleCancelDialog = useCallback(() => {
        if (addressDialogOpen === "edit") {
            setSelectedAddress((prev) => ({
                ...prev,
                province: null,
                district: null,
                ward: null,
            }))
            setEditingAddress((prev) => ({
                ...prev,
                id: "",
                name: "",
                street: "",
                city: "",
                state: "",
                zip: "",
                countryId: "",
                isDefault: false,
                vnProvinceId: "",
                vnDistrictId: "",
                vnWardId: "",
                createdAt: "",
                updatedAt: "",
            }))
        }
        setAddressDialogOpen(null);
    }, [addressDialogOpen])

    const handleDeleteClick = useCallback((address: ExtendedAddress) => {
        setAddressToDelete(address)
        setIsDeleteDialogOpen(true)
    }, [])

    return (
        <TabsContent value="addresses" className="space-y-6">
            {isAddressLoading ? <AddressSkeleton /> :
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                        <CardTitle>{type === "profile" ? "Delivery Addresses" : "Select Delivery Address"}</CardTitle>
                        <CardDescription>{type === "profile" ? "Manage your delivery addresses" : "Select a delivery address"}</CardDescription>
                    </div>
                    <DialogTrigger onClick={() => setAddressDialogOpen("add")}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Address
                        </Button>
                    </DialogTrigger>
                    <Dialog open={addressDialogOpen != null} onOpenChange={(open) => {
                        open ? setAddressDialogOpen("add") : handleCancelDialog()
                    }}>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>{addressDialogOpen === "add" ? "Add New Address" : "Edit Address"}</DialogTitle>
                                <DialogDescription>
                                    {addressDialogOpen === "add" ? "Enter your delivery address details" : "Update your delivery address details"}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <CustomInput
                                    label="Address Name"
                                    id="address-name"
                                    value={editingAddress.name}
                                    onChange={(e) =>
                                        setEditingAddress({ ...editingAddress, name: e.target.value })
                                    }
                                    placeholder="Home, Work, etc."
                                    schema={nameSchema}
                                    required
                                    error={formErrors.name}
                                />
                                <CustomInput
                                    label="Street Address"
                                    id="street"
                                    value={editingAddress.street}
                                    onChange={(e) =>
                                        setEditingAddress({ ...editingAddress, street: e.target.value })
                                    }
                                    placeholder="123 Main St"
                                    schema={streetSchema}
                                    required
                                    error={formErrors.street}
                                />

                                {/* Country Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Select
                                        value={selectedAddress.country?.id.toString() || ""}
                                        onValueChange={(value) => setSelectedAddress((prev) => ({ ...prev, country: countries.find((country: Country) => country.id.toString() === value) || null }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((country: Country) => (
                                                <SelectItem key={country.id} value={country.id.toString()}>
                                                    {country.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Conditional rendering based on country */}
                                {selectedAddress.country?.name === "Vietnam" ? (
                                    <>
                                        {/* Province Selection */}
                                        <div className="space-y-2">
                                            <Label htmlFor="province">Province</Label>
                                            <Select
                                                value={selectedAddress.province?.id.toString() || ""}
                                                onValueChange={(value) => setSelectedAddress((prev) => ({ ...prev, province: provinces.find((province: Province) => province.id.toString() === value) || null }))}
                                                disabled={!selectedAddress.country || provinces.length === 0}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select province" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {provinces.map((province: Province) => (
                                                        <SelectItem key={province.id} value={province.id.toString()}>
                                                            {province.fullName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* District Selection */}
                                        <div className="space-y-2">
                                            <Label htmlFor="district">District</Label>
                                            <Select
                                                value={selectedAddress.district?.id.toString() || ""}
                                                onValueChange={(value) => setSelectedAddress((prev) => ({ ...prev, district: districts.find((district: District) => district.id.toString() === value) || null }))}
                                                disabled={!selectedAddress.province || districts.length === 0}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select district" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {districts.map((district: District) => (
                                                        <SelectItem key={district.id} value={district.id.toString()}>
                                                            {district.fullName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Ward Selection */}
                                        <div className="space-y-2">
                                            <Label htmlFor="ward">Ward</Label>
                                            <Select
                                                value={selectedAddress.ward?.id.toString() || ""}
                                                onValueChange={(value) => {
                                                    const selectedWard = wards.find((ward: Ward) => ward.id.toString() === value);
                                                    setSelectedAddress((prev) => ({
                                                        ...prev,
                                                        ward: selectedWard || null,
                                                    }));
                                                }}
                                                disabled={!selectedAddress.district || wards.length === 0}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select ward" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {wards.map((ward: Ward) => (
                                                        <SelectItem key={ward.id} value={ward.id.toString()}>
                                                            {ward.fullName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <CustomInput
                                            label="City"
                                            id="city"
                                            value={editingAddress.city}
                                            onChange={(e) =>
                                                setEditingAddress({ ...editingAddress, city: e.target.value })
                                            }
                                            placeholder="City"
                                            schema={citySchema}
                                            required
                                            error={formErrors.city}
                                        />
                                        <CustomInput
                                            label="State"
                                            id="state"
                                            value={editingAddress.state}
                                            onChange={(e) =>
                                                setEditingAddress({ ...editingAddress, state: e.target.value })
                                            }
                                            placeholder="State"
                                            schema={stateSchema}
                                            required
                                            error={formErrors.state}
                                        />
                                        <CustomInput
                                            label="ZIP Code"
                                            id="zip"
                                            value={editingAddress.zip}
                                            onChange={(e) =>
                                                setEditingAddress({ ...editingAddress, zip: e.target.value })
                                            }
                                            placeholder="ZIP Code"
                                            schema={zipSchema}
                                            required
                                            error={formErrors.zip}
                                        />
                                    </div>
                                )}

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={editingAddress.isDefault}
                                        onCheckedChange={(checked) =>
                                            setEditingAddress({ ...editingAddress, isDefault: checked })
                                        }
                                    />
                                    <Label htmlFor="default-address">Set as default address</Label>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={handleCancelDialog}>
                                    Cancel
                                </Button>
                                <Button onClick={addressDialogOpen === "add" ? handleAddAddress : handleUpdateAddress}>
                                    {addressDialogOpen === "add" ? "Add Address" : "Update Address"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!addressResponse || addressResponse.addresses.length === 0 ? (
                        <div className="text-center py-8">
                            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No addresses yet</h3>
                            <p className="text-muted-foreground mb-4">Add your first delivery address to get started</p>
                        </div>
                    ) : (
                        addressResponse.addresses.map((addr: ExtendedAddress) => (
                            <div
                                key={addr.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                    type === "checkout" && currentAddress?.id === addr.id 
                                        ? "border-primary bg-primary/5" 
                                        : addr.isDefault 
                                            ? "border-primary" 
                                            : "border-border hover:border-primary/50"
                                }`}
                                onClick={() => {
                                    if (type === "checkout") {
                                        setAddress(addr);
                                    }
                                }}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium">{addr.name}</h3>
                                        {addr.isDefault && (
                                            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">Default</span>
                                        )}
                                    </div>
                                    {type === "profile" && (
                                        <div className="flex gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditAddress(addr);
                                                }}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-destructive"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(addr);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    {`${addr.street}, 
                                    ${addr.city ? `${addr.city}, ${addr.state} ${addr.zip}, ${addr.countryName}`
                                        : `${addr.vnWardName}, ${addr.vnDistrictName}, ${addr.vnProvinceName}`}`}
                                </p>
                                {type === "profile" && !addr.isDefault && (
                                    <Button
                                        variant="link"
                                        className="p-0 h-auto mt-2 text-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSetDefaultAddress(addr.id);
                                        }}
                                    >
                                        Set as default
                                    </Button>
                                )}
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
            }
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Address</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this address? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {addressToDelete && (
                            <div className="text-sm text-muted-foreground">
                                <p className="font-medium">{addressToDelete.name}</p>
                                <p>{addressToDelete.street}</p>
                                {addressToDelete.city ? (
                                    <p>{`${addressToDelete.city}, ${addressToDelete.state} ${addressToDelete.zip}`}</p>
                                ) : (
                                    <p>
                                        {addressToDelete.vnWardName},
                                        {addressToDelete.vnDistrictName},
                                        {addressToDelete.vnProvinceName}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </TabsContent>
    )
}


