import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './modules/hello/hello.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ExceptionService } from './modules/exception/exception.service';
import { ExceptionModule } from './modules/exception/exception.module';

@Module({
  imports: [HelloModule, ExceptionModule],
  controllers: [AppController],
  providers: [AppService, ExceptionService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 为 hello 路由添加中间件
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'hello', method: RequestMethod.POST })
      .forRoutes('hello');
  }
}
