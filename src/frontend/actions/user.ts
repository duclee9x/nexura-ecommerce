// 'use server'

// import { ExtendedAddress, User } from "@nexura/grpc_gateway/protos"
// import { getUserGateway, getAddressesGateway, updateUserGateway, registerUserGateway } from "@nexura/grpc_gateway/gateway"

// import { DefaultResponse } from "@/lib/types"

// export async function getUser(userId: string): Promise<User | DefaultResponse> {
//     if (!userId) {
//         return {success: false, message: "User ID is required"}
//     }
//     const {success, message, user} = await getUserGateway({ userId })
//     if (!user) {
//         return {success, message}
//     }
//     if (user?.profilePictureUrl) {
//         const presignedUrl = await fetch(`/api/presignedPut?name=${user.id}&bucket=avatar`)
//         const presignedUrlData = await presignedUrl.json()
//         user.profilePictureUrl = presignedUrlData.urls[0] // Get first URL from the array
//     }
//     return user
// }

// export async function getAddresses(userId: string | undefined): Promise<ExtendedAddress[] | DefaultResponse> {
//     if (!userId) {
//         return {success: false, message: "User ID is required"}
//     }
//     const result = await getAddressesGateway({ userId })
//     return result
// }

// export async function updateUser(userId: string, user: User, currentPassword: string, newPassword: string): Promise<User | DefaultResponse> {
//     const result = await updateUserGateway({ userId, user, currentPassword, newPassword })
//     return result
// }

// export async function registerUser(registerUserRequest: RegisterUserRequest): Promise<User | DefaultResponse> {
//     const result = await registerUserGateway(registerUserRequest)
//     return result
// }
