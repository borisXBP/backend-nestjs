import { IsInt, IsString } from 'class-validator';

export class CreateBeeDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
