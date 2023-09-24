import {
  Body,
  Controller,
  Get,
  UseGuards,
  Patch,
  Delete,
  Param,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateScoreDto } from './dto/update-score.dto';
import { UserService } from './user.service';
import { LeaderboardEntry } from './entity/leaderboard-entry.entity';
import { PurchaseDto } from './dto/purchase.dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('self')
  getMe(@GetUser() user: User) {
    const { id, createdAt, updatedAt, ...rest } = user;
    return rest;
  }

  @Patch('score')
  async updateScore(
    @GetUser() user: User,
    @Body() updateScoreDto: UpdateScoreDto,
  ): Promise<User> {
    const updatedUser = await this.userService.updateUserScore(
      user.id,
      updateScoreDto.score,
    );
    return updatedUser;
  }

  @Get('leaderboard')
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const leaderboard = await this.userService.getLeaderboard();
    return leaderboard;
  }

  @Delete('self')
  async deleteUser(@GetUser() userToDelete: User): Promise<User> {
    const deletedUser = await this.userService.deleteUser(userToDelete.id);
    return deletedUser;
  }

  @Post('purchase')
  async purchaseItem(@GetUser() user: User ,@Body() purchaseDto: PurchaseDto): Promise<void> {
    const { itemId } = purchaseDto;
    await this.userService.purchaseItem(user.id, itemId);
  }

  @Get('items')
  async getUserItems(@GetUser() user: User) {
      return this.userService.getUserItems(user.id);
  }

   @Get('items/greatest')
  async getUserGreatestItem(@GetUser() user: User) {
      return this.userService.getUserItemWithGreatestScoreModifier(user.id);
  }
}
