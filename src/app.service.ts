import { ConflictException, Injectable } from "@nestjs/common";
import path from "path";
import { UserDTO } from "./app.dto";
import { promises as fs } from "fs";

@Injectable()
export class AppService {
  private readonly dataFilePath = path.join(
    __dirname,
    "..",
    "public",
    "users.json",
  );

  async createUser(user: UserDTO) {
    let users = await this.readUsers();
    const existingUserIndex = users.findIndex(
      (u) => u.phone === user.phone || u.email === user.email,
    );
    if (existingUserIndex !== -1) {
      throw new ConflictException(
        `User with same email or phone number already exists`,
      );
    } else {
      users.push(user);
    }
    await this.writeUsers(users);
  }

  private async readUsers(): Promise<UserDTO[]> {
    try {
      const fileContent = await fs.readFile(this.dataFilePath, "utf8");
      return JSON.parse(fileContent);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  private async writeUsers(users: UserDTO[]) {
    await fs.writeFile(
      this.dataFilePath,
      JSON.stringify(users, null, 2),
      "utf8",
    );
  }
}
