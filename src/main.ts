import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局使用中间件
  // app.use(logger)

  // 全局使用过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());

  // 全局管道
  // app.useGlobalPipes(new ValidationPipe());

  // 设置 swagger 文档相关配置，引入 swagger 需要安装依赖包：
  // swagger-ui-express 、 @nestjs/swagger 、class-validator
  const swaggerOptions = new DocumentBuilder()
    .setTitle("Boris's project api document for backend-nestjs ")
    .setDescription('引入 swagger 用于自动生成 api 文档，将就着用吧')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3000);
}
bootstrap();
