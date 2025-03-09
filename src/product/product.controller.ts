import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("addProduct")
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4() + extname(file.originalname);
        cb(null, uniqueSuffix);
      },
    }),
  }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: { name: string; description?: string; price: number; categoryId: number; attributes?: any }
  ): Promise<Product> {
    const imageUrl = file ? `uploads/${file.filename}` : null;
    return this.productService.addProduct({ ...data, imageUrl });
  }

  @Get("all")
  async allProduct(): Promise<Product[]>{
    return this.productService.findAll()
  }

  @Get(":id")
  async findById(@Param("id") id: number): Promise<Product>{
    return this.productService.findById(id)
  }

  @Put(":id")
  async updateProduct(@Param("id") id: number,
  @Body() data: {name?: string; price?: number; categoryId?: number; imageUrl?: string}): Promise<Product>{
    return this.productService.update(id, data)
  }

  @Delete(":id")
  async removeProduct(@Param("id") id: number){
    return this.productService.remove(id)
  }
}
