import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { StatusDto } from 'src/common/dto/status.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {

  constructor(private readonly prisma: PrismaService) { }

  create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: createOrderDto
    });
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {

    const totalPages = await this.prisma.order.count({
      where: {
        status: orderPaginationDto.status,
      }
    });

    const currentPage = orderPaginationDto.page || 1;
    const perPage = orderPaginationDto.limit || 10;


    return {
      data: await this.prisma.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          status: orderPaginationDto.status,
        }
      }),
      meta: {
        page: currentPage,
        limit: perPage,
        totalPages: Math.ceil(totalPages / perPage),
      }
    }
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      throw new RpcException({ status: HttpStatus.NOT_FOUND, message: 'Order not found' });
    }

    return order;
  }

  async changeStatus(id: string, status: OrderStatus) {
    console.log(id, status);
    const newOrderStatus = status;
    const order = await this.findOne(id);

    if (!order) {
      throw new RpcException({ status: HttpStatus.NOT_FOUND, message: 'Order not found' });
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: newOrderStatus }
    });
  }
}
