import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

// DTO: Data Transfer Object
// used to define the shape of data for creating a user
// typically used in request bodies
// can also be used for validation and transformation
// using class-validator decorators for validation

// by default all properties are required in DTO
export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['admin', 'user', 'superadmin'], { message: 'role must be either admin, user, or superadmin' })
  role: 'admin' | 'user' | 'superadmin';
}