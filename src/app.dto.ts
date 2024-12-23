import { IsString } from "class-validator";

export class UserDTO {
  @IsString()
  fullname: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;
}
