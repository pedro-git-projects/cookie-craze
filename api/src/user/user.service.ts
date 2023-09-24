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
}
