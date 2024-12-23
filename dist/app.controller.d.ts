import { UserDTO } from "./app.dto";
import { AppService } from "./app.service";
export declare class AppController {
    private readonly service;
    constructor(service: AppService);
    getHello(): string;
    createUser(user: UserDTO): Promise<{
        message: string;
    }>;
}
