import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ItemEntity } from '../entities/item.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Item } from '../../../../domain/item';
import { ItemRepository } from '../../item.repository';
import { ItemMapper } from '../mappers/item.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ItemRelationalRepository implements ItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  async create(data: Item): Promise<Item> {
    const persistenceModel = ItemMapper.toPersistence(data);
    const newEntity = await this.itemRepository.save(
      this.itemRepository.create(persistenceModel),
    );
    return ItemMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Item[]> {
    const entities = await this.itemRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ItemMapper.toDomain(entity));
  }

  async findById(id: Item['id']): Promise<NullableType<Item>> {
    const entity = await this.itemRepository.findOne({
      where: { id },
    });

    return entity ? ItemMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Item['id'][]): Promise<Item[]> {
    const entities = await this.itemRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ItemMapper.toDomain(entity));
  }

  async update(id: Item['id'], payload: Partial<Item>): Promise<Item> {
    const entity = await this.itemRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.itemRepository.save(
      this.itemRepository.create(
        ItemMapper.toPersistence({
          ...ItemMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ItemMapper.toDomain(updatedEntity);
  }

  async remove(id: Item['id']): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
