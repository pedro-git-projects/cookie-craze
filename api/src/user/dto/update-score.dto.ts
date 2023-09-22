import { IsInt, Min } from "class-validator";

export class UpdateScoreDto {
    @IsInt()
    @Min(0)
    score: number;
}
