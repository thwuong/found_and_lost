import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @ApiProperty({
    type: String,
  })
  userId: string;

  @ApiProperty({
    type: String,
    enum: ['FOUND', 'LOST'],
  })
  @IsNotEmpty()
  type: 'FOUND' | 'LOST';

  @ApiProperty({
    type: String,
    maxLength: 255,
    example: 'Title',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    maxLength: 1000,
    example: 'Description',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    example: 'Category',
  })
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    type: [String],
    example: ['base64-encoded-image1', 'base64-encoded-image2'],
  })
  @IsNotEmpty()
  images: string[];

  @ApiProperty({
    type: Date,
    default: new Date(),
  })
  @IsNotEmpty()
  foundLostDate: Date;
}
