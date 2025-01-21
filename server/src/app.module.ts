import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DiscordModule } from './discord/discord.module';
import { NettoolsModule } from './nettools/nettools.module';
import { DownloadModule } from './download/download.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, DiscordModule, NettoolsModule, DownloadModule, MailModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
