import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { Item } from '../../../../domain/item';
import { ItemEntity } from '../entities/item.entity';

export class ItemMapper {
  static toDomain(raw: ItemEntity): Item {
    const domainEntity = new Item();
    domainEntity.id = raw.id;
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }
    domainEntity.type = raw.type;
    domainEntity.title = raw.title;
    domainEntity.description = raw.description;
    domainEntity.category = raw.category;
    domainEntity.images = raw.images;
    domainEntity.foundLostDate = raw.foundLostDate;
    domainEntity.isClaimed = raw.isClaimed;
    domainEntity.claimedAt = raw.claimedAt;
    domainEntity.priority = raw.priority;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Item): ItemEntity {
    const persistenceEntity = new ItemEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (domainEntity.user) {
      const user = new UserEntity();
      user.id = domainEntity.user.id as string;
      persistenceEntity.user = user;
    }
    persistenceEntity.type = domainEntity.type;
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.category = domainEntity.category;
    persistenceEntity.images = domainEntity.images;
    persistenceEntity.foundLostDate = domainEntity.foundLostDate;
    persistenceEntity.isClaimed = domainEntity.isClaimed;
    persistenceEntity.claimedAt = domainEntity.claimedAt;
    persistenceEntity.priority = domainEntity.priority;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
