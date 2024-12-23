"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cors_configuration_1 = require("./config/cors-configuration");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
require("dotenv").config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: cors_configuration_1.corsConfiguration,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.enableShutdownHooks();
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Triviaholic Waitlist API")
        .setDescription("API documentation for triviaholic waitlist")
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("api-docs/", app, document);
    await app.listen(process.env.PORT || 8080, () => {
        new common_1.Logger().log(`API is started on PORT ${process.env.PORT || 8080}...`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map