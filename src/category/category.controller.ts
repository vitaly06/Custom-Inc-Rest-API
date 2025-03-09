import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("addCategory")
  async addCategory(@Body() data: {categoryName: string; options?: any}): Promise<Category>{
    return this.categoryService.addCategory(data)
  }

  @Get("all")
  async findAll(): Promise<Category[]>{
    return this.categoryService.findAll()
  }

  @Get(":id")
  async findById(@Param("id") id: number): Promise<Category>{
    return this.categoryService.findById(id)
  }
  
  @Put(":id")
  async updateCategory(@Param("id") id: number, @Body() data: {categoryName?: string; options?: any}): Promise<Category>{
    return this.categoryService.update(id, data)
  }

  @Delete(":id")
  async remove(@Param("id") id: number){
    return this.categoryService.remove(id)
  }

  @Get(':id/attributes')
  async getCategoryAttributes(@Param('id') id: number): Promise<any> {
    return this.categoryService.getCategoryAttributes(id);
  }
}
