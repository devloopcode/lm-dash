import { IsString } from "class-validator";

export class ActivityDto {
    @IsString()
    type: string;

    @IsString()
    content: string;
}