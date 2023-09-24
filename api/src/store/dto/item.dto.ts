import { IsNotEmpty, IsNumber } from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  scoreModifier: number;
}
