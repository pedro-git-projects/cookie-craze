import { Controller, Get,  UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  @Get('self')
  getMe(@GetUser() user: User) {
    const {id, createdat, updatedAt, ...rest} = user
    return rest;
  }
}
