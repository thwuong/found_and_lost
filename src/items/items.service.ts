import {
  // common
  Injectable,
  Logger,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Item } from './domain/item';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemRepository } from './infrastructure/persistence/item.repository';

@Injectable()
export class ItemsService {
  constructor(
    // Dependencies here
    private readonly itemRepository: ItemRepository,
  ) {}

  async create(createItemDto: CreateItemDto) {
    Logger.log(createItemDto);
    // Do not remove comment below.
    // <creating-property />

    return this.itemRepository.create({
      userId: createItemDto.userId,
      type: createItemDto.type,
      title: createItemDto.title,
      description: createItemDto.description,
      category: createItemDto.category,
      images: createItemDto.images,
      foundLostDate: createItemDto.foundLostDate,
      isClaimed: false,
      claimedAt: null,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.itemRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Item['id']) {
    return this.itemRepository.findById(id);
  }

  findByIds(ids: Item['id'][]) {
    return this.itemRepository.findByIds(ids);
  }

  async update(
    id: Item['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateItemDto: UpdateItemDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.itemRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Item['id']) {
    return this.itemRepository.remove(id);
  }
}
