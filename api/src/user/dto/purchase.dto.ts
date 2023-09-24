import { IsInt } from 'class-validator';

export class PurchaseDto {
  @IsInt()
  itemId: number;
}
