import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { LeaderboardEntry } from './entity/leaderboard-entry.entity';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async updateUserScore(userId: number, score: number): Promise<User> {
    const updatedUser = await this.db.user.update({
      where: { id: userId },
      data: { score },
    });
    return updatedUser;
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const leaderboard = await this.db.user.findMany({
      where: {},
      select: {
        username: true,
        score: true,
      },
      orderBy: {
        score: 'desc',
      },
    });

    return leaderboard;
  }

  async deleteUser(userId: number): Promise<User> {
    const userToDelete = await this.db.user.findUnique({
      where: { id: userId },
    });

    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const deletedUser = await this.db.user.delete({
      where: { id: userId },
    });

    return deletedUser;
  }

  async purchaseItem(userId: number, itemId: number): Promise<User> {
    const user = await this.db.user.findUnique({ where: { id: userId } });
    const item = await this.db.item.findUnique({ where: { id: itemId } });
    const assignedBy = 'admin';

    if (!user || !item) {
      throw new Error('User or item not found');
    }

    const existingPurchase = await this.db.itemUser.findFirst({
      where: {
        userId,
        itemId,
      },
    });

    if (existingPurchase) {
      throw new Error('User has already purchased this item');
    }

    const userScore = user.score;
    const itemPrice = item.price;

    if (userScore >= itemPrice) {
      const newUserScore = userScore - itemPrice;
      await this.db.user.update({
        where: { id: userId },
        data: { score: newUserScore },
      });

      await this.db.itemUser.create({
        data: {
          userId,
          itemId,
          assignedBy,
        },
      });

      // Return the updated user data.
      return user;
    } else {
      throw new Error('Insufficient score to purchase this item');
    }
  }

  async getUserItems(userId: number) {
    return this.db.itemUser.findMany({
      where: {
        userId,
      },
      include: {
        item: true,
      },
    });
  }

  async getUserItemWithGreatestScoreModifier(userId: number) {
    const userItems = await this.db.itemUser.findMany({
      where: {
        userId,
      },
      include: {
        item: true,
      },
    });

    if (userItems.length === 0) {
      return null; // User has no purchased items
    }

    let greatestItem = userItems[0];
    for (const userItem of userItems) {
      if (userItem.item.scoreModifier > greatestItem.item.scoreModifier) {
        greatestItem = userItem;
      }
    }
    return greatestItem;
  }

  async getUserWithItemIds(
    userId: number,
  ): Promise<{ user: User; itemIds: number[] }> {
    const user = await this.db.user.findUnique({ where: { id: userId } });
    const itemUsers = await this.db.itemUser.findMany({
      where: {
        userId,
      },
    });

    const itemIds = itemUsers.map((itemUser) => itemUser.itemId);

    return {
      user,
      itemIds,
    };
  }
}
