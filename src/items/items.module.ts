import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { RelationalItemPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalItemPersistenceModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService, RelationalItemPersistenceModule],
})
export class ItemsModule {}
