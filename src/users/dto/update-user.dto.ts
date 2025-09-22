import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";
// makes all properties optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}
// can also add additional properties or override existing ones if needed
// gets same validation as CreateUserDto but all properties are optional