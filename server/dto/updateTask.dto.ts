import { IsEnum } from "class-validator";
import { Status } from "../generated/prisma";

export class UpdateTaskDto{
    @IsEnum(Status)
    status!: Status;
}