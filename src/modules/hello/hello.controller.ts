import {
  Controller,
  Get,
  Query,
  Headers,
  Patch,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { HelloService } from './hello.service';
import { UserRole } from './classes/hello';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('hello')
@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  // 查询
  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'role', enum: UserRole })
  @ApiResponse({
    status: 200,
    description: 'get work hard ...',
  })
  fetch(@Query() { id }, @Headers('token') token): string {
    console.log(token);
    return this.helloService.fetch(id);
  }

  // 创建
  @Post()
  @ApiBody({ description: '填写更新内容' })
  save(@Body() { message }): string {
    return this.helloService.save(message);
  }

  // 更新
  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ description: '请输入message' })
  update(@Param() { id }, @Body() { message }): string {
    return this.helloService.update(id, message);
  }

  // 删除
  @Delete()
  remove(@Query() { id }): string {
    return this.helloService.remove(id);
  }
}
