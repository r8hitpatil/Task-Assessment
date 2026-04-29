import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength } from 'class-validator';
import { Priority,Status } from '../generated/prisma';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    @MinLength(3)
    title!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(Priority)
    @IsNotEmpty({ message: 'Priority is required' })
    priority!: Priority;

    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @IsOptional()
    dueDate?: Date;
}