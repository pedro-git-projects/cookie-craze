import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { StoreService } from './store.service';
import { ItemDto } from './dto/item.dto';

@Controller('store')
@UseGuards(JwtGuard)
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post('item')
  createOne(@Body() dto: ItemDto) {
    return this.storeService.createItem(dto);
  }

  @Get('items')
  getAll() {
    return this.storeService.getAllItems();
  }
}
