import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Item } from '../../domain/item';

export abstract class ItemRepository {
  abstract create(
    data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Item>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Item[]>;

  abstract findById(id: Item['id']): Promise<NullableType<Item>>;

  abstract findByIds(ids: Item['id'][]): Promise<Item[]>;

  abstract update(
    id: Item['id'],
    payload: DeepPartial<Item>,
  ): Promise<Item | null>;

  abstract remove(id: Item['id']): Promise<void>;
}
