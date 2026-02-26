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
  Request,
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
  @UseGuards(AuthGuard('jwt'))
  create(@Request() request, @Body() createItemDto: CreateItemDto) {
    this.logger.log(`Creating item for user: ${request.user.id}`);
    this.logger.debug(`CreateItemDto: ${JSON.stringify(createItemDto)}`);
    return this.itemsService.create(createItemDto, request.user.id);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Item),
  })
  async findAll(
    @Request() request,
    @Query() query: FindAllItemsDto,
  ): Promise<InfinityPaginationResponseDto<Item>> {
    this.logger.log(`Finding all items for user: ${request.user.id}`);
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
