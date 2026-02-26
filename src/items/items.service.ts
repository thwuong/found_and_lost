import {
  // common
  Injectable,
  Logger,
} from '@nestjs/common';
import { User } from '../users/domain/user';
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

  async create(createItemDto: CreateItemDto, userId: string) {
    Logger.log(createItemDto);
    // Do not remove comment below.
    // <creating-property />

    const item = new Item();
    const user = new User();
    user.id = userId;

    item.user = user;
    item.type = createItemDto.type;
    item.title = createItemDto.title;
    item.description = createItemDto.description;
    item.category = createItemDto.category;
    item.images = createItemDto.images;
    item.foundLostDate = createItemDto.foundLostDate;
    item.isClaimed = false;
    item.claimedAt = null;
    item.priority = createItemDto.priority;

    return this.itemRepository.create(item);
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
