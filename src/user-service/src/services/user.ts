
import { GetUser } from './user-get';
import { LoginUser } from './user-login';
import { RegisterUser } from './user-register';
import { DeleteUser } from './user-delete';
import { UpdateUser } from './user-update';
import { UntypedServiceImplementation } from '@grpc/grpc-js';


export const userService: UntypedServiceImplementation = {
    getUser: GetUser,
    updateUser: UpdateUser,
    deleteUser: DeleteUser,
    registerUser: RegisterUser,
    loginUser: LoginUser,
}
