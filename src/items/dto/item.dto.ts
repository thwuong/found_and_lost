import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
