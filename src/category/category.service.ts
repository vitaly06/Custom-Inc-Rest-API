import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService){}

    async addCategory(data: {categoryName: string; options?: any}): Promise<Category>{
        return this.prisma.category.create({
            data: {
                categoryName: data.categoryName,
                options: data.options || {}
            }
        })
    }

    async findAll(): Promise<Category[]>{
        return this.prisma.category.findMany()
    }

    async findById(id: number): Promise<Category>{
        return this.prisma.category.findUnique({
            where: {id: Number(id)}
        })
    }

    async update(id: number, data: {categoryName?: string; options?: any}): Promise<Category>{
        return this.prisma.category.update({
            where: {id: Number(id)},
            data
        })
    }

    async remove(id: number){
        return this.prisma.category.delete({
            where: {id: Number(id)}
        })
    }

    async getCategoryAttributes(id: number): Promise<any> {
        const category = await this.prisma.category.findUnique({
          where: { id },
          select: { options: true },
        });
        return category?.options || {};
    }
}
