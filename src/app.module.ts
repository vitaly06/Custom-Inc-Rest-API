import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, AuthModule, CategoryModule, ProductModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
