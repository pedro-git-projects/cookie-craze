import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';

@Module({
  controllers: [StoreController],
  providers: [DbService, StoreService],
})
export class StoreModule {}
