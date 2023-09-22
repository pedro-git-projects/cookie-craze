import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { DbService } from "src/db/db.service";

@Injectable()
export class UserService{
    constructor(private db: DbService){}
    async updateUserScore(userId: number, score: number): Promise<User> {
        const updatedUser = await this.db.user.update({
            where: {id: userId},
            data: {score}
        })
        return updatedUser
    }
}
