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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const request_logger_middleware_1 = require("./middleware/request-logger-middleware");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = __importDefault(require("path"));
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const add_correlation_id_interceptor_1 = require("./lib/add-correlation-id-interceptor");
const timeout_interceptor_1 = require("./lib/timeout.interceptor");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(request_logger_middleware_1.RequestLoggerMiddleware).forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.default.join(__dirname, "..", "public"),
                serveRoot: "/public",
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            { provide: core_1.APP_INTERCEPTOR, useClass: add_correlation_id_interceptor_1.AddCorrelationIdInterceptor },
            { provide: core_1.APP_INTERCEPTOR, useClass: timeout_interceptor_1.TimeoutInterceptor },
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map