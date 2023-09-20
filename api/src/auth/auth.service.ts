import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private db: DbService) {}

  async signup(dto: AuthDto): Promise<User | never> {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.db.user.create({
        data: {
          email: dto.email,
          hash: hash,
          score: 0,
        },
      });

      delete user.hash;
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
      throw err;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('incorrect credentials');
    }

    const pswdMatches = await argon.verify(user.hash, dto.password);

    if (!pswdMatches) {
      throw new ForbiddenException('incorrect credentials');
    }

    delete user.hash;
    return user;
  }
}
