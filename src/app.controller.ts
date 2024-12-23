import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserDTO } from "./app.dto";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  getHello(): string {
    return "Welcome to Triviaholic Waitlist API!!!";
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    await this.service.createUser(user);
    return { message: "User data saved successfully" };
  }
}
