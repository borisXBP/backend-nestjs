import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export class Hello {
  @ApiProperty({ example: 'bee', description: 'This me' })
  name: string;

  @ApiProperty({ example: 1, description: 'This is age' })
  age: number;

  @ApiProperty({ example: 'Maine Coon', description: 'The breed of the bee' })
  breed: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;
}
