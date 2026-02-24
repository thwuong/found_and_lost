import { Module } from '@nestjs/common';
import { ItemRepository } from '../item.repository';
import { ItemRelationalRepository } from './repositories/item.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  providers: [
    {
      provide: ItemRepository,
      useClass: ItemRelationalRepository,
    },
  ],
  exports: [ItemRepository],
})
export class RelationalItemPersistenceModule {}
