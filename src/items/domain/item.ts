import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/domain/user';

export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: () => User,
  })
  user: User;

  @ApiProperty({
    type: String,
    enum: ['FOUND', 'LOST'],
  })
  type: 'FOUND' | 'LOST';

  @ApiProperty({
    type: String,
    maxLength: 255,
    example: 'Title',
  })
  title: string;

  @ApiProperty({
    type: String,
    maxLength: 1000,
    example: 'Description',
  })
  description: string;

  @ApiProperty({
    type: String,
    example: 'Category',
  })
  category: string;

  @ApiProperty({
    type: [String],
    example: ['base64-encoded-image1', 'base64-encoded-image2'],
  })
  images: string[];

  @ApiProperty({
    type: Date,
    default: new Date(),
  })
  foundLostDate: Date;

  @ApiProperty({
    type: Date,
    default: new Date(),
  })
  claimedAt: Date | null;

  @ApiProperty({
    type: Boolean,
    default: false,
  })
  isClaimed: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}
