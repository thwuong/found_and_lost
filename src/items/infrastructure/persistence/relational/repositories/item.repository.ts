import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Item } from '../../../../domain/item';
import { ItemRepository } from '../../item.repository';
import { ItemEntity } from '../entities/item.entity';
import { ItemMapper } from '../mappers/item.mapper';

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
    const loadedEntity = await this.itemRepository.findOne({
      where: { id: newEntity.id },
    });
    return ItemMapper.toDomain(loadedEntity!);
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

    const loadedEntity = await this.itemRepository.findOne({
      where: { id: updatedEntity.id },
    });

    return ItemMapper.toDomain(loadedEntity!);
  }

  async remove(id: Item['id']): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
