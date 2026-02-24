import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { Item } from './domain/item';
import { CreateItemDto } from './dto/create-item.dto';
import { FindAllItemsDto } from './dto/find-all-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';

@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'items',
  version: '1',
})
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Item,
  })
  create(
    @CurrentUser() user: JwtPayloadType,
    @Body() createItemDto: CreateItemDto,
  ) {
    const userIdString = user.id.toString();
    // ✅ Sử dụng logger instance với nhiều level
    console.log('ItemsController initialized');

    this.logger.log(`Creating item for user: ${userIdString}`);
    this.logger.debug(`CreateItemDto: ${JSON.stringify(createItemDto)}`);
    return this.itemsService.create({
      ...createItemDto,
      userId: userIdString,
    });
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Item),
  })
  async findAll(
    @CurrentUser() user: JwtPayloadType,
    @Query() query: FindAllItemsDto,
  ): Promise<InfinityPaginationResponseDto<Item>> {
    const userIdString = user.id.toString();
    this.logger.log(`Finding all items for user: ${userIdString}`);
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.itemsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Item,
  })
  findById(@Param('id') id: string) {
    return this.itemsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Item,
  })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
