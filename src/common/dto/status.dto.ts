import { OrderStatus } from "@prisma/client";
import { IsEnum } from "class-validator";

export class StatusDto {
    @IsEnum(OrderStatus, { message: 'Invalid status' })
    status: OrderStatus;
}