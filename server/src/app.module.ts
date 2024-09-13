import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
