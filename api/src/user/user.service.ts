import { Injectable } from '@nestjs/common';
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
        email: true,
        score: true,
      },
      orderBy: {
        score: 'desc',
      },
    });

    return leaderboard;
  }
}
