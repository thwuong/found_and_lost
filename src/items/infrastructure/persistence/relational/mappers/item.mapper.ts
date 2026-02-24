import { Item } from '../../../../domain/item';
import { ItemEntity } from '../entities/item.entity';

export class ItemMapper {
  static toDomain(raw: ItemEntity): Item {
    const domainEntity = new Item();
    domainEntity.id = raw.id;
    domainEntity.userId = raw.user.id;
    domainEntity.type = raw.type;
    domainEntity.title = raw.title;
    domainEntity.description = raw.description;
    domainEntity.category = raw.category;
    domainEntity.images = raw.images;
    domainEntity.foundLostDate = raw.foundLostDate;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Item): ItemEntity {
    const persistenceEntity = new ItemEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.type = domainEntity.type;
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.category = domainEntity.category;
    persistenceEntity.images = domainEntity.images;
    persistenceEntity.foundLostDate = domainEntity.foundLostDate;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
