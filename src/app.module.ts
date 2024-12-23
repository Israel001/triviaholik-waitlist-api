import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RequestLoggerMiddleware } from "./middleware/request-logger-middleware";
import { ServeStaticModule } from "@nestjs/serve-static";
import path from "path";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AddCorrelationIdInterceptor } from "./lib/add-correlation-id-interceptor";
import { TimeoutInterceptor } from "./lib/timeout.interceptor";
import { AppService } from "./app.service";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "..", "public"),
      serveRoot: "/public",
    }),
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: AddCorrelationIdInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
