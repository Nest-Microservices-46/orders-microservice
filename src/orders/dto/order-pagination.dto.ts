import { PaginationDto } from "src/common/dto/pagination.dto";
import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus } from "@prisma/client";

export class OrderPaginationDto extends PaginationDto {

    @IsOptional()
    @IsEnum(OrderStatus, { message: 'Invalid status' })
    status: OrderStatus;
}