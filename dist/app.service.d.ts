import { UserDTO } from "./app.dto";
export declare class AppService {
    private readonly dataFilePath;
    getTotalUsers(): Promise<number>;
    createUser(user: UserDTO): Promise<void>;
    private readUsers;
    private writeUsers;
}
