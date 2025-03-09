import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService){}

    async addProduct(data: {name: string; price: number; categoryId: number; imageUrl: string; attributes?: any}): Promise<Product>{
        return this.prisma.product.create({
            data
        })
    }

    async findAll(): Promise<Product[]>{
        return this.prisma.product.findMany({
            include: {category: true}
        })
    }

    async findById(id: number): Promise<Product>{
        return this.prisma.product.findUnique({
            where: {id: Number(id)},
            include: {category: true}
        })
    }

    async update(id: number, data: {name?: string; price?: number; categoryId?: number; imageUrl?: string}): Promise<Product>{
        return this.prisma.product.update({
            where: {id: Number(id)},
            data
        })
    }

    async remove(id: number){
        return this.prisma.product.delete({
            where: {id: Number(id)}
        })
    }
}
