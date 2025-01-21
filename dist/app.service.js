"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const phone_1 = __importDefault(require("phone"));
let AppService = class AppService {
    dataFilePath = path_1.default.join(__dirname, "..", "public", "users.json");
    async createUser(user) {
        let users = await this.readUsers();
        const existingUserIndex = users.findIndex((u) => u.phone === user.phone || u.email === user.email);
        if (existingUserIndex !== -1) {
            throw new common_1.ConflictException(`User with same email or phone number already exists`);
        }
        else {
            const { isValid, phoneNumber } = (0, phone_1.default)(user.phone, { country: "NG" });
            if (!isValid)
                throw new common_1.BadRequestException("Phone number must be a valid nigeria phone number");
            const existingUserIndex = users.findIndex((u) => u.phone === user.phone || u.email === user.email);
            if (existingUserIndex !== -1) {
                throw new common_1.ConflictException(`User with same email or phone number already exists`);
            }
            user.phone = phoneNumber;
            users.push(user);
        }
        await this.writeUsers(users);
    }
    async readUsers() {
        try {
            const fileContent = await fs_1.promises.readFile(this.dataFilePath, "utf8");
            return JSON.parse(fileContent);
        }
        catch (error) {
            if (error.code === "ENOENT") {
                return [];
            }
            throw error;
        }
    }
    async writeUsers(users) {
        await fs_1.promises.writeFile(this.dataFilePath, JSON.stringify(users, null, 2), "utf8");
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map