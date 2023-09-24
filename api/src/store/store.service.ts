import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { ItemDto } from './dto/item.dto';

@Injectable()
export class StoreService {
  constructor(private db: DbService) {}

  async createItem(itemData: ItemDto): Promise<Item> {
    const newItem = await this.db.item.create({
      data: itemData,
    });
    return newItem;
  }

  async getAllItems(): Promise<Item[]> {
    const allItems = await this.db.item.findMany();
    return allItems;
  }
}
