import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DiscordModule } from './discord/discord.module';
import { NettoolsModule } from './nettools/nettools.module';
import { DownloadModule } from './download/download.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, DiscordModule, NettoolsModule, DownloadModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
