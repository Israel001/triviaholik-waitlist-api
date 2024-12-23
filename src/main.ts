import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { corsConfiguration } from "./config/cors-configuration";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
require("dotenv").config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: corsConfiguration,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableShutdownHooks();

  const options = new DocumentBuilder()
    .setTitle("Triviaholic Waitlist API")
    .setDescription("API documentation for triviaholic waitlist")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs/", app, document);

  await app.listen(process.env.PORT || 8080, () => {
    new Logger().log(`API is started on PORT ${process.env.PORT || 8080}...`);
  });
}
bootstrap();
